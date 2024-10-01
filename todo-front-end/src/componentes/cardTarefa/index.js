import React, { useState } from "react";
import "./style.css";

import FormTarefa from "../formTarefa";

export default function CardTarefa({tarefa}){
    const simboloBotao = tarefa.completo?"V":" ";
    const estiloBotao = {
        backgroundColor: tarefa.completo?"#008000":"",
        color: tarefa.completo?"#ffffff":"#FFFF00",
        border: tarefa.completo?"none":""
    }

    const [formVisivel, setFormVisivel] = useState(false);

    return (
        <>
        <div className="card-tarefa">
            <div className="checkbox">
                <button style={estiloBotao}>{simboloBotao}</button>
                <p className="dataConclusao">{tarefa.completo && tarefa.dataConclusao}</p>
            </div>
            <div className="card-tarefa-container">
                <h3 className="card-tarefa-titulo">{tarefa.titulo}</h3>
                <p className="card-tarefa-descricao">{tarefa.descricao}</p>

                <div className="card-tarefa-botoes">
                    <button className="card-tarefa-editar btn-cinza" onClick={()=>{setFormVisivel(!formVisivel)}}>Editar</button>
                    <button className="card-tarefa-excluir btn-azul">Excluir</button>
                </div>
            </div>
        </div>
        {formVisivel && <FormTarefa tarefa={tarefa} setFormVisivel={setFormVisivel} tituloForm="Editar"/>}
        </>
    ) 
}