import React from "react";
import "./style.css";

export default function PaginaErro(){
    return (
        <div className="pagina-erro">
            <p>Página não encontrada, ERRO 404</p>
            <a href="/login">Login</a>
        </div>
    ) 
}