import React, { useState } from "react";
import "./style.css";
import FormTarefa from "../formTarefa";
import axios from "axios";

export default function CardTarefa({tarefa, tarefaAdicionada}){
    const simboloBotao = tarefa.completed?"V":" ";
    const estiloBotao = {
        backgroundColor: tarefa.completed?"#008000":"",
        color: tarefa.completed?"#ffffff":"#FFFF00",
        border: tarefa.completed?"none":""
    }
    const [formVisivel, setFormVisivel] = useState(false);
    const tarefaCompleta = tarefa.completed;
    const tarefaCompletaData = tarefa.completed_at;
    const [erro, setErro] = useState("");

    const deleteTarefa = async () =>{
        const userId = localStorage.getItem("id_user");
        try{
            await axios.delete(`http://localhost:8989/users/${userId}/tasks/${tarefa.id}`);
            tarefaAdicionada();
        } catch(error) {
            setErro("Erro ao excluir tarefa. Tente novamente.");
            console.error(error);
        }
    }

    const pegaDataAtual = () => new Date().toISOString().split("T")[0]
    const completaTarefa = async ()=>{
        const userId = localStorage.getItem("id_user");
        try{
            const tarefaData = {
                title: tarefa.title,
                description: tarefa.description,
                completed: !tarefaCompleta,
                completed_at: !tarefaCompleta && !tarefa.completed_at?pegaDataAtual(): tarefaCompletaData,
                user_id: userId,
            };
            await axios.patch(`http://localhost:8989/users/${userId}/tasks/${tarefa.id}`, tarefaData);
            tarefaAdicionada();
        } catch(error) {
            setErro("Erro ao completar tarefa. Tente novamente.");
            console.error(error);
        }
    }

    return (
        <>
        <div className="card-tarefa">
            <div className="checkbox">
                <button style={estiloBotao} onClick={()=>{completaTarefa()}}>{simboloBotao}</button>
                {tarefa.completed === 1 && <p className="dataConclusao">{tarefa.completed_at}</p>}
            </div>
            <div className="card-tarefa-container">
                <h3 className="card-tarefa-titulo">{tarefa.title}</h3>
                <p className="card-tarefa-descricao">{tarefa.description}</p>

                <div className="card-tarefa-botoes">
                    <button className="card-tarefa-editar btn-cinza" onClick={()=>{setFormVisivel(!formVisivel)}}>Editar</button>
                    <button className="card-tarefa-excluir btn-azul" onClick={()=>{deleteTarefa()}}>Excluir</button>
                </div>
            </div>
        </div>
        {formVisivel && <FormTarefa tarefa={tarefa} setFormVisivel={setFormVisivel} tituloForm="Editar" editar={true} tarefaAdicionada={tarefaAdicionada}/>}
        </>
    ) 
}