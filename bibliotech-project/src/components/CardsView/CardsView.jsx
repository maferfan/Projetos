import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./CardsView.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { height } from "@mui/system";

export function CardsView(props) {
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  const toggleLike = (livroId) => {
    const livroIndex = props.dados.findIndex((livro) => livro.id === livroId);
    const livro = { ...props.dados[livroIndex] };
    livro.liked = !livro.liked;
    const updatedLivros = [...props.dados];
    updatedLivros[livroIndex] = livro;
    props.setLivros(updatedLivros);
  };

  return (
    <Container fluid>
      <Row xs={1} md={2} lg={3} style={{ margin: "0 -10px 20px" }}>
        {props.dados.map((livro) => (
          <Col key={livro.id} className="mb-4 mx-auto">
            <Card
              style={{ maxWidth: "380px" }}
              bg={props.tema}
              text={props.tema === "light" ? "dark" : "white"}
              className={
                temaEscuro
                  ? "bg-light text-dark card-livros"
                  : "bg-dark text-light card-livros"
              }
            >
              <Card.Body className="card-body-cardsview">
                <Card.Title
                  className={
                    temaEscuro ? "bg-light text-dark" : "bg-dark text-light "
                  }
                >
                  {livro.titulo}
                </Card.Title>
                <Card.Text>{livro.autor}</Card.Text>
                <Card.Text>{livro.categoria}</Card.Text>
                <Card.Text>{livro.isbn}</Card.Text>
                <img
                  className="img-cardsview"
                  src={livro.urlCapa}
                  alt={livro.titulo}
                />
                <div className="d-flex mt-3 justify-content-end">
                  <Button
                    as={Link}
                    to={`/livros/editar/${livro.id}`}
                    variant="warning"
                    size="sm"
                    className="me-2"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => props.onDeleteLivro(livro.id, livro.titulo)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => {
                      props.setLivroSelecionado(livro);
                      props.handleShow();
                    }}
                  >
                    <i class="bi bi-three-dots"></i>
                  </Button>
                  <Button
                    variant={livro.liked ? "danger" : "secondary"}
                    size="sm"
                    className="ms-2"
                    onClick={() => toggleLike(livro.id)}
                  >
                    <i
                      className={`bi bi-heart${livro.liked ? "-fill" : ""}`}
                    ></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
