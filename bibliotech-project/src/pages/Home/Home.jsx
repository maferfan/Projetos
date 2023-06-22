import { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getEmprestimo, getEmprestimos } from "../../firebase/emprestimos";
import { getLivros } from "../../firebase/livros";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Home.scss";

export const Home = () => {
  const [livros, setLivros] = useState(0);
  const [emprestimos, setEmprestimos] = useState(0);
  const [livrosPendentes, setLivrosPendentes] = useState(0);
  const [livrosEntregues, setLivrosEntregues] = useState(0);
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  useEffect(() => {
    getLivros().then((busca) => {
      setLivros(busca.length);
    });
    getEmprestimo().then((emprestimos) => {
    const numEmprestimos = emprestimos ? emprestimos.filter((livro) => livro).length : 0;
        setEmprestimos(numEmprestimos);
    })
  }, []);

  
  useEffect(() => {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca.length);
    });
    getEmprestimos().then((emprestimos) => {
        const pendentes = emprestimos.filter((e) => e.status === 'Pendente').length;
        const entregues = emprestimos.filter((e) => e.status === 'Entregue').length;
        setLivrosPendentes(pendentes);
        setLivrosEntregues(entregues);
      });
  }, []);

  return (
    <div className={temaEscuro? "bg-light text-light" : "bg-dark text-dark"} style={{minHeight:"100vh"}}>
      <Container >
        <div className="d-flex justify-content-center aligns-items-center">
            <Card  bg="success" text="light" className="card-home mt-5 me-2" style={{ width: '14rem' }}>
              <Card.Header >Livros cadastrados</Card.Header>
              <Card.Body >{livros}</Card.Body>
            </Card>
            <Card bg="success" text="light" className="card-home mt-5 me-2" style={{ width: '14rem' }}>
              <Card.Header>Total de empréstimos</Card.Header>
              <Card.Body>{emprestimos}</Card.Body>
            </Card>
            <Card bg="success" text="light" className="card-home mt-5" style={{ width: '14rem' }}>
              <Card.Header>Status Empréstimos</Card.Header>
              <Card.Body>
                Pendentes: {livrosPendentes}<br />
                Entregues: {livrosEntregues}
              </Card.Body>
            </Card>
        </div>
      </Container>
      <div className="bg-image" style={{ opacity: "0.6" }}>
        {/* Aqui você pode colocar a imagem de fundo */}
      </div>
    </div>
  );
}
