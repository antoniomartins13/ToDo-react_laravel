import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css"

export default function CardRegistro({titulo, login, registro, alteracao, user, setFormContaVisivel}){
    const textoBtnCinza = login?"Registrar":alteracao?"Cancelar":"Já tenho conta";
    const rotaBtnCinza = login?"/registro":"/login"
    const textoBtnAzul = login?"Entrar":alteracao?"Alterar":"Registrar";
    
    const [nome, setNome] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [senha, setSenha] = useState("");
    
    const [erro, setErro] = useState("");
    const [success, setSuccess] = useState("");
    
    const estiloTextoMensagemStatus = {color: success?"#008000":"#FF0000"}

    const navigate = useNavigate();

    const auxiliaInput = (setFuncao) => (evento) =>{
        setFuncao(evento.target.value);
   };

    const auxSubmit = async (e) => {
        e.preventDefault();

        if (login){
            try{
                const response = await axios.post("http://localhost:8989/login", {
                    email: email,
                    password: senha
                });

                const idUser = response.data.user.id;
                localStorage.setItem("id_user", idUser);
                const token = response.data.token;
                localStorage.setItem("authToken",token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                navigate("/tarefas");
            } catch {
                setErro("Falha ao fazer login, verifique email e senha.")
            }
        } else if(registro){
            try{
                await axios.post("http://localhost:8989/users", {
                    name: nome,
                    email: email,
                    password: senha
                });

                navigate("/login");
            } catch {
                setErro("Falha ao criar conta.");
            }
        } else if(alteracao){
            try{
                const idUser = user.identify
                await axios.patch(`http://localhost:8989/users/${idUser}`, {
                    name: nome,
                    email: email,
                    password: senha
                })

                setSuccess("Alteração feita com sucesso.");
                navigate(0);
            } catch {
                setErro("Erro ao alterar dados da conta.");
            }
        }
    }

   useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
        document.body.classList.remove("no-scroll");
    };
}, []);

    return(
        <div className="card-registro">
            <div className="card-registro-titulo">
                <h2>{titulo}</h2>
            </div>

            <form onSubmit={auxSubmit} className="card-registro-form">
                {!login && <div className="card-registro-form-campo">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" placeholder="Digite seu nome" value={nome} onChange={auxiliaInput(setNome)} required={!login}/>
                </div>}

                <div className="card-registro-form-campo">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu e-mail" value={email} onChange={auxiliaInput(setEmail)} required/>
                </div>
                
                <div className="card-registro-form-campo">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha" value={senha} onChange={auxiliaInput(setSenha)} required/>
                </div>

                {erro && <p style={estiloTextoMensagemStatus}>{erro}</p>}
                {success && <p style={estiloTextoMensagemStatus}>{success}</p>}

                <div className="card-registro-form-btns">
                    {!alteracao && 
                    <Link to={rotaBtnCinza} className="btn-cinza">{textoBtnCinza}</Link>}
                    {alteracao && 
                    <button className="btn-cinza" onClick={()=>setFormContaVisivel(false)}>{textoBtnCinza}</button>}
                    <button type="submit" className="btn-azul">{textoBtnAzul}</button>
                </div>

            </form>
        </div>
    )
}