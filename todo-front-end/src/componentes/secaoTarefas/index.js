import React, { useEffect, useState } from "react";
import "./style.css";
import CardTarefa from "../cardTarefa";
import FormTarefa from "../formTarefa";
import axios from "axios";

export default function SecaoTarefas({user}){

    const [adcTarefa, setAdcTarefa] = useState(false);
    const [tarefas, setTarefas] = useState();
    const [erro, setErro] = useState("");
    
    const tarefaAdicionada = ()=>{
        getTarefas();
    }

    const getTarefas = async ()=>{
        try{
            const userId = localStorage.getItem("id_user");
            const tarefas = await axios.get(`http://localhost:8989/users/${userId}/tasks`);
            setTarefas(tarefas.data)
        } catch {
            setErro("Erro ao carregar as tarefas")
        }
    }

    useEffect(()=>{
        getTarefas()
    },[user])


    return (
        <div className="secao-tarefas">
            <div className="secao-tarefas-top">
               <h2 className="secao-tarefas-titulo">To <span>Do</span> List</h2>
               <button onClick={()=>setAdcTarefa(!adcTarefa)}>Adicionar tarefa</button>
               {adcTarefa && 
               <FormTarefa setFormVisivel={setAdcTarefa} tarefa={{}} tituloForm={"Adicionar Tarefa"} tarefaAdicionada={tarefaAdicionada}/>}
            </div>
            {tarefas && <div className="secao-tarefas-cards">
                {tarefas && tarefas.filter((tarefa)=> tarefa.completed === 0).map((tarefa)=><CardTarefa key={tarefa.id} tarefa={tarefa} tarefaAdicionada={tarefaAdicionada}/>)}
            </div>}
            <div className="secao-tarefas-top">
               <h2 className="secao-tarefas-titulo">Tarefas <span>Completas</span></h2>
            </div>
            {tarefas && <div className="secao-tarefas-cards">
                {tarefas && tarefas.filter((tarefa)=> tarefa.completed === 1).map((tarefa)=><CardTarefa key={tarefa.id} tarefa={tarefa} tarefaAdicionada={tarefaAdicionada}/>)}
            </div>}
        </div>
    ) 
}