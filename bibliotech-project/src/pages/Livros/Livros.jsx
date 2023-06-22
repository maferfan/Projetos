import { useContext, useEffect, useState } from "react";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { CardsView } from "../../components/CardsView/CardsView";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Listview } from "../../components/Listview/Listview";



const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export function Livros() {
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  const [livros, setLivros] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    getLivros().then((resultados) => {
      setLivros(resultados);
    });
  }

  function onDeleteLivro(id, titulo) {
    const deletar = window.confirm(
      `Tem certeza que deseja excluir o livro ${titulo}?`
    );
    if (deletar) {
      deleteLivro(id).then(() => {
        toast.success(`${titulo} apagado com sucesso!`, {
          duration: 2000,
          position: "bottom-right",
        });
        initializeTable();
      });
    }
  }

  const [view, setView] = useState(true);

  function alternar() {
    setView(!view);
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [livroSelecionado, setLivroSelecionado] = useState(null);

  return (
    <div className={temaEscuro ? "bg-light text-dark" : "bg-dark text-light"} style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Container fluid className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center" style={{ gap: 1500 }}>
          <h1 style={{ fontSize: 100 }}><i class="bi bi-book"></i></h1>
          <div>
          <Button as={Link} to="/livros/adicionar" variant="success">
            <i class="bi bi-plus"></i> <i class="bi bi-book"></i>
          </Button>
          <Button className={temaEscuro ? 'dark' : 'light'} onClick={alternar} variant={temaEscuro ? 'light' : 'dark'}>
            <i class={view ? "bi bi-list-columns-reverse" : "bi bi-grid-3x3-gap"}></i>
          </Button>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center flex-column"
          style={{ gap: 25 }}
        >
          <hr />
          <div>
            {livros === null ? <Loader /> : (
              view ? (
                <Listview
                  setLivros={setLivros}
                  tema={temaEscuro}
                  dados={livros}
                  onDeleteLivro={onDeleteLivro}
                  setLivroSelecionado={setLivroSelecionado}
                  handleShow={handleShow}
                />
              ) : (
                <CardsView
                setLivros={setLivros}
                  tema={temaEscuro}
                  dados={livros}
                  onDeleteLivro={onDeleteLivro}
                  setLivroSelecionado={setLivroSelecionado}
                  handleShow={handleShow}
                />
              ))}
          </div>
        </div>
        <br />
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{livroSelecionado?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Autor: {livroSelecionado?.autor}</p>
          <p>Categoria: {livroSelecionado?.categoria}</p>
          <p>ISBN: {livroSelecionado?.isbn}</p>
          <img
            style={{ width: "300px" }}
            src={livroSelecionado?.urlCapa}
            alt={livroSelecionado?.titulo}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={handleClose}
            as={Link}
            to={`/livros/editar/${livroSelecionado?.id}`}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
