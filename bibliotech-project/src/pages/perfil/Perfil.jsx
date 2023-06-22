import "./Perfil.css"
import { useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { deletUsuario, updateUsuario } from "../../firebase/auth";
import { toast } from "react-hot-toast";

export function Perfil (){
    const usuarioLogado = useContext(AuthContext);  
    const {register, handleSubmit, reset, formState:{errors}} = useForm()
    
    useEffect(() => {
        reset(usuarioLogado)
    },[reset,usuarioLogado])

 function onSubmit(data) {
    updateUsuario(usuarioLogado, data).then(() => {
        toast.success("Perfil editado com sucesso!")
    })
 }

 function onDeletUser(){
    deletUsuario(usuarioLogado).then(()=>{
        toast("Perfil exclui com sucesso!")
    })
 }


    return(
      <div style={{minHeight:"100vh"}}>
        <div className="perfil" >
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" size="lg" className={errors.displayName && "is-invalid"} {...register("displayName", { required: "Nome é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.displayName?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" size="lg" className={errors.email && "is-invalid"} {...register("email", { required: "Email é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="text" size="lg" placeholder="*****" className={errors.senha && "is-invalid"} {...register("senha", { minLength: { value: 8, message: "Mínimo de 8 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.senha?.message}
            </Form.Text>
          </Form.Group>

          <Button type="submit" variant="success" className="me-2">Alterar</Button>
          <Button onClick={onDeletUser} type="submit" variant="success" className="me-2">Excluir</Button>
            </Form>
        </div>
        </div>
    )
}