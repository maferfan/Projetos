import "./Menu.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export function Menu() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;
  const alternar = resultado.alternar;

  const navigate = useNavigate();

  function onLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }
  return (
  
    <Navbar className={temaEscuro? "bg-success text-dark" : "bg-dark text-light"} expand="lg">
    <Navbar.Brand>
    <Button className={temaEscuro? "bg-success text-dark" : "bg-dark text-light"} style={{border:"none"}} variant="success" onClick={handleShow}>
          <Link to="/">
          <img style={{border:"none"}} src={logoIcon} width="32" alt="Logo" />
          </Link>
          Menu
    </Button>
        </Navbar.Brand>
        <MaterialUISwitch checked={temaEscuro} onChange={alternar} />
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header className={temaEscuro? "bg-success text-dark" : "bg-dark text-light"} closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={temaEscuro? "bg-success text-dark" : "bg-dark text-light"} >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoIcon} width="32" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/livros">
              Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">
              Emprestimos
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              Perfil
            </Nav.Link>
            <Nav.Link as={Link} to="/chat">
              Chat
            </Nav.Link>
            <Nav.Link as={Link} to="/loja">
              Loja
            </Nav.Link>
            <Nav.Link as={Link} to="/quiz">
              Quiz
            </Nav.Link>
            <Nav.Link onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </Nav.Link>
          </Nav>
      </Container>
      </Offcanvas.Body>
    </Offcanvas>
    </Navbar>  
    );
  }