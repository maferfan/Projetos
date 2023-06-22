import React, { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Listview(props) {
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
    <Table
      className={temaEscuro ? "bg-light text-dark" : "bg-dark text-light"}
      variant={props.tema}
    >
      <div className="listview">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>ISBN</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.dados.map((livro) => (
            <tr key={livro.id}>
              <td className="titulo-listview">{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.categoria}</td>
              <td>{livro.isbn}</td>
              <td>
                <img src={livro.urlCapa} alt={livro.titulo} />
              </td>
              <td>
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
                  <i className="bi bi-three-dots"></i>
                </Button>
                <Button
                  variant={livro.liked ? "danger" : "secondary"}
                  size="sm"
                  className="ms-2"
                  onClick={() => toggleLike(livro.id)}
                >
                  <i className={`bi bi-heart${livro.liked ? "-fill" : ""}`}></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </Table>
  );
}
