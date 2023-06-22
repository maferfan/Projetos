import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Home } from "./pages/Home/Home";
import { Livros } from "./pages/Livros/Livros";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { AuthContext } from "./contexts/AuthContext";
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { EditarEmprestimo } from "./pages/EditarEmprestimo/EditarEmprestimo";
import { ChatRoom } from "./pages/Chat/Chat";
import { PaginaVendas } from "./pages/PaginaVendas/PaginaVendas";
import { CardsView } from "./components/CardsView/CardsView";
import { ThemeContext } from "./contexts/ThemeContext";
import { Perfil } from "./pages/perfil/Perfil";
import "./pages/Home/Home.scss"; 
import { Quiz } from "./pages/Quiz/Quiz";


export function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [estaLogado, setEstaLogado] = useState(false);
  const [carregar, setCarregar] = useState(true);
  const [temaEscuro, setTemaEscuro] = useState(true);

  useEffect(() => {
    // Monitorar/detectar o usuário conectado
    // Fica sabendo quando loga/desloga
    onAuthStateChanged(auth, (user) => {
      // user é nulo = deslogado
      // user tem objeto = logado
      setUsuarioLogado(user);
      setEstaLogado(!!user);
      setCarregar(false)
    });

    // Esse efeito irá rodar apenas uma vez
    // Quando o App for renderizado/inicializado
  }, []);

  useEffect(() => {
    const tema = localStorage.getItem('temaEscuro');
    if (tema === 'true') {
      setTemaEscuro(true);
    } else {
      setTemaEscuro(false);
    }
  }, []);

  if (carregar){
    return null
  }

  function alternar() {
    if (temaEscuro === true) {
      setTemaEscuro(false);
      localStorage.setItem('temaEscuro', false);
    } else {
      setTemaEscuro(true);
      localStorage.setItem('temaEscuro', true);
    }
  }

  return (
    <>
    <ThemeContext.Provider value={{temaEscuro: temaEscuro, alternar: alternar}} style={{ backgroundColor: temaEscuro ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)" }}>
      <AuthContext.Provider value={usuarioLogado}>
      <div className={temaEscuro? "bg-light text-dark" : "bg-dark text-light"} >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="/" element={<Home />} />
              <Route path="/livros" element={<Livros />}>
                <Route path="/livros/cardsview" element={<CardsView />}/>
              </Route>
              <Route path="/livros/adicionar" element={<AdicionarLivro />} />
              <Route path="/livros/editar/:id" element={<EditarLivro />} />
              <Route path="/emprestimos" element={<Emprestimos />} />
              <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} />
              <Route path="/emprestimos/editar/:id" element={<EditarEmprestimo />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/chat" element={<ChatRoom/>} />
              <Route path="/loja" element={<PaginaVendas/>} />
            </Route>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={!estaLogado ? <Cadastro/> : <Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </div>
      </AuthContext.Provider>
      </ThemeContext.Provider>
      <Toaster />
    </>
  );
}
