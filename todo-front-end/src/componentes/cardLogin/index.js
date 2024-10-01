import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

export default function CardLogin(){
    return(
        <div className="card-login">
            <div className="card-login-titulo">
                <h2>Login</h2>
            </div>

            <form action="" method="" className="card-login-form">
                <div className="card-login-form-campo">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required/>
                </div>
                
                <div className="card-login-form-campo">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required/>
                </div>

                <div className="card-login-form-btns">
                    <Link to="/registro" className="btn-cinza">Criar conta</Link>
                    <button type="submit" className="btn-azul">Entrar</button>
                </div>

            </form>
            <a href="" className="card-login-frgt">Esqueci a senha</a>
        </div>
    )
}