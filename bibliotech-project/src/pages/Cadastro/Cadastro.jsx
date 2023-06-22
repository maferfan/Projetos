import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import faceIcon from "../../assets/icons/face.svg";
import githubIcon from "../../assets/icons/github.svg";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginFacebook, loginGithub, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css"
import { useState } from "react";

export function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGoogle() {
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginFacebook() {
    loginFacebook()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        const messageError = (erro.code === "auth/account-exists-with-different-credential" ? "Este email está vinculado a uma conta" : `Um erro aconteceu. Código: ${erro.code}`)
        toast.error(messageError, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGithub() {
    loginGithub()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        const messageError = (erro.code === "auth/account-exists-with-different-credential" ? "Este email está vinculado a uma conta" : `Um erro aconteceu. Código: ${erro.code}`)
        toast.error(messageError, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      });
  }

  const [showpassword, setShowPassword] = useState(false)

  return (
    <Container fluid className="cadastro" style={{ minHeight: "100vh" }}>
      <div className="bg-dark caixa">
        <p className="text-center">
          <img src={logoIcon} width="256" alt="Logo" />
        </p>
        <h4>Bem-vindo(a) de volta!</h4>
        <p className="text-muted">
          Já tem conta? <Link to="/login">Entre</Link>
        </p>
        <p>
          Teste seus conhecimentos <i class="bi bi-arrow-right"></i> <Link to="/quiz">Quiz</Link>
        </p>
        <hr />
        <div className="mb-4">
          <Button className="mb-3 ms-2 button" variant="" onClick={onLoginFacebook}>
            <img className="icon" src={faceIcon} width="32" alt="face icon" />
          </Button>
          <Button className="mb-3 ms-2 button" variant="" onClick={onLoginGoogle}>
            <img className="icon" src={googleIcon} width="32" alt="Google icon" />
          </Button>
          <Button className="mb-3 ms-2 button" variant="" onClick={onLoginGithub}>
            <img className="icon" src={githubIcon} width="32" alt="GitHub icon" />
          </Button>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Seu email"
              className={errors.email ? "is-invalid" : ""}
              {...register("email", { required: "Email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 position-relative" controlId="senha">
            <Form.Label>Senha</Form.Label>
            <div className="d-flex" style={{ gap: 20 }}>
              <Form.Control
                type={showpassword ? "text" : "password"}
                className={errors.senha ? "is-invalid" : ""}
                placeholder="Sua senha"
                {...register("senha", { required: "Senha é obrigatória" })}
              />
              <Button
                variant=""
                onClick={() => setShowPassword(!showpassword)}
                className="show-password-btn"
              >
                <i class={showpassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
              </Button>
            </div>
            <Form.Text className="invalid-feedback">
              {errors.senha?.message}
            </Form.Text>
          </Form.Group>
          <div className="btn-cadastrar">
            <Button type="submit" variant="light text-dark">
              Entrar
            </Button>
          </div>
        </Form>
      </div>
    </Container>

  );
}
