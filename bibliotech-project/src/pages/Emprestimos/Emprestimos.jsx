import { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmprestimos } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";
import { Dropdown } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState(null);
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  useEffect(() => {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca);
    });
  }, []);

  



  return (
    <div className={temaEscuro ? "bg-light text-dark" : "bg-dark text-light"} style={{ minHeight: "100vh" }}>
      <Container fluid>
        <div className="d-flex justify-content-around align-items-center">
          <h1 style={{ fontSize: 100 }}><i class="bi bi-book"></i></h1>
          <Button as={Link} to="/emprestimos/adicionar" variant="success">
            <i class="bi bi-plus"></i> <i class="bi bi-book"></i>
          </Button>
        </div>
        {emprestimos === null ? (
          <Loader />
        ) : (
          <Table className={temaEscuro ? "bg-light text-dark" : "bg-dark text-light"} style={{ minHeight: "100vh" }}  >
            <thead>
              <tr>
                <th>Leitor</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Livro</th>
                <th>Status</th>
                <th>Empréstimo</th>
                <th>Devolução</th>
                <th>Atraso</th>
                <th>Multa (R$) </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => {

                const dataEmprestimo = emprestimo.dataEmprestimo.toDate().toLocaleDateString("pt-br"); // data do empréstimo
                const dataDevolucao = new Date(emprestimo.dataEmprestimo.toDate().getTime() + (30 * 60 * 1000)).toLocaleDateString("pt-br") // prazo da devolução
                const dataAtual = new Date(); // data atual
                const dataDevolucaoObj = emprestimo.dataEmprestimo.toDate().getTime() + (30 * 60 * 1000); // esse trecho de código define a data de devolução do empréstimo como sendo 30 minutos após a data de empréstimo.

                const status = dataAtual.getTime() > dataDevolucaoObj ? (emprestimo.status === "Devolvido" ? "Devolvido" : "Atrasado") : emprestimo.status
                
              

                const atrasoEmMinutos = Math.max(Math.ceil((dataAtual.getTime() - dataDevolucaoObj) / (1000 * 60)), 0); // calcula a diferença da data atual e do prazo em minutos.

                const atrasoEmDias = Math.floor((dataAtual.getTime() - dataDevolucaoObj) / (1000 * 60 * 60 * 24)); // calcula a diferença da data atual e do prazo em dias
                const horasAtraso = Math.floor(atrasoEmMinutos / 60);
                const minutosAtraso = atrasoEmMinutos;

                const dias = atrasoEmDias >= 0 && atrasoEmDias
                const horas = horasAtraso < 24 ? horasAtraso : horasAtraso % 24
                const minutos = minutosAtraso < 60 ? minutosAtraso : minutosAtraso % 60

                const diasLabel = atrasoEmDias > 1 ? "dias" : "dia";
                const horasLabel = horasAtraso > 1 ? "horas" : "hora";
                const minutosLabel = minutosAtraso > 1 ? "minutos" : "minuto";

                const atraso = emprestimo.status === "Devolvido"
                  ? "-"
                  : atrasoEmMinutos > 30
                    ? `${dias} ${diasLabel} ${horas} ${horasLabel} e ${minutos} ${minutosLabel}`
                    : atrasoEmMinutos === 0
                      ? "-"
                      : `${minutos} ${minutosLabel}`;

                let ultimoValorMulta = emprestimo.multa || 0; // pega o valor atual da multa ou 0 se não houver

                const multa = emprestimo.status === "Devolvido" ?
                (atrasoEmMinutos > 0 ? ((atrasoEmMinutos / 30) * 0.5).toFixed(2) : 'Não aplicável')
                : (atrasoEmMinutos > 0 ? ((atrasoEmMinutos / 30) * 0.5).toFixed(2) : '-')

                

                return (
                  <tr key={emprestimo.id}>
                    <td>{emprestimo.leitor}</td>
                    <td>{emprestimo.email}</td>
                    <td>{emprestimo.telefone}</td>
                    <td>{emprestimo.livro.titulo}</td>
                    <td>
                      <Badge
                        bg={
                          status === "Pendente"
                            ? "warning"
                            : status === "Devolvido"
                              ? "success"
                              : status === "Atrasado" && "danger"
                        }
                      >
                        {status}
                      </Badge>
                    </td>
                    <td>{dataEmprestimo}</td>
                    <td>{dataDevolucao}</td>
                    <td>{atraso}</td>
                    <td style={{ color: emprestimo.status === 'Devolvido' ? (multa !== '-' && parseFloat(multa) > 0 ? 'red' : 'green') : temaEscuro ? "#000000" : "#ffffff" }}>{multa}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Dropdown
                          onSelect={(status, event) => {
                            const emprestimoIndex = emprestimos.findIndex(
                              (e) => e.id === emprestimo.id
                            );
                            const updatedEmprestimos = [...emprestimos];
                            updatedEmprestimos[emprestimoIndex] = {
                              ...updatedEmprestimos[emprestimoIndex],
                              status,
                            };
                            setEmprestimos(updatedEmprestimos);
                          }}
                        >
                          <Dropdown.Toggle
                            variant={
                              emprestimo.status === "Pendente"
                                ? "warning"
                                : emprestimo.status === "Devolvido"
                                  ? "success"
                                  : "danger"
                            }
                          >
                            {emprestimo.status}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="Pendente">
                              Pendente
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Devolvido">
                              Devolvido
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button
                          as={Link}
                          to={`/emprestimos/editar/${emprestimo.id}`}
                          variant="warning"
                          size="sm"
                          className="ms-2"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}