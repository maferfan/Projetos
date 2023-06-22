import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import { getLivros } from "../../firebase/livros";
import "./PaginaVendas.css";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

export const PaginaVendas = () => {
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;
  const [livros, setLivros] = useState(null);

  useEffect(() => {
    getLivros().then((busca) => {
      setLivros(busca);
    });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  return (
    <div className={temaEscuro? "bg-light text-dark" : "bg-dark text-light"} style={{ minHeight: "100vh" }}>
    <div className="loja">
      <div className="Carosel">
        <Carousel cols={4} rows={1}>
          {livros &&
            livros.map((livro) => (
              <Carousel.Item key={livro.id}>
                <div className="itens">
                  <div className="titulo">
                    <strong>{livro.titulo}</strong>
                    <br />
                  </div>
                  <img
                    src={livro.urlCapa}
                    alt={livro.titulo}
                    onClick={() => {
                      setLivroSelecionado(livro);
                      handleShow(true);
                    }}
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{livroSelecionado?.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Autor: {livroSelecionado?.autor}</p>
            <p>Categoria: {livroSelecionado?.categoria}</p>
            <p>ISBN: {livroSelecionado?.isbn}</p>
            <img
              style={{ width: "200px", alignItems: "center" }}
              src={livroSelecionado?.urlCapa}
              alt={livroSelecionado?.titulo}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              as={Link}
              to={`#`}
              variant="warning"
              size="lg"
              className="me-2"
            >
              <i class="bi bi-cart-plus-fill"> Adicionar ao Carrinho</i>
            </Button>
            <Button
              as={Link}
              to={`#`}
              variant="success"
              size="lg"
              className="me-2"
            >
              <i class="bi bi-bag-fill"> Comprar Agora</i>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className={temaEscuro? "bg-light text-dark cards" : "bg-dark text-light cards"} style={{ minHeight: "100vh" }}>
        <Row xs={3} md={4} className="g-4">
          {livros &&
            livros.map((livro) => (
              <Col key={livro.id}>
                <Card style={{ width: "14vw", height: "62vh", transition:"0.7s", transform:"scale(1.05)" }}>
                  <Card.Img variant="top" src={livro.urlCapa} />
                  <Card.Body>
                    <Card.Title className={temaEscuro? "bg-white text-dark" : "bg-white text-dark "}>{livro.titulo}</Card.Title>
                    <Card.Text >
                      <Button
                        style={{width:"82px, "}}
                        className="me-2"
                        as={Link}
                        to={`#`}
                        variant="warning"
                        size="sm "
                      >
                        <i class="bi bi-cart-plus-fill"></i>
                      </Button>
                      <Button
                      style={{width:"82px"}}
                        className="me-2"
                        as={Link}
                        to={`#`}
                        variant="success"
                        size="sm"
                      >
                        <i class="bi bi-bag-fill"></i>
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
    </div>
  );
};
