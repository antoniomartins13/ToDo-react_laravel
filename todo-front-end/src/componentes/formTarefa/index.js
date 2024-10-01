import React, { useState, useEffect} from "react";
import "./style.css";
import axios from "axios";

export default function FormTarefa({tarefa, setFormVisivel, tituloForm, editar, tarefaAdicionada}){

    const [tituloTarefa, setTituloTarefa] = useState(tarefa.title || "");
    const [descricaoTarefa, setDescricaoTarefa] = useState(tarefa.description || "");
    const [tarefaCompleta, setTarefaCompleta] = useState(tarefa.completed || "");
    const [dataConclusao, setDataConclusao] = useState(tarefa.completed_at || "");
    const [erro, setErro] = useState("");

    const auxiliaInput = (setFuncao) => (evento) =>{
         setFuncao(evento.target.value);
    };

    const auxSubmit = async (evento) => {
        evento.preventDefault();
        const userId = localStorage.getItem("id_user")
        const tarefaData = {
            title: tituloTarefa,
            description: descricaoTarefa,
            completed: tarefaCompleta?true:false,
            completed_at: tarefaCompleta ? dataConclusao : null,
            user_id: userId,
        };

        if(editar){
            try {
                await axios.patch(`http://localhost:8989/users/${userId}/tasks/${tarefa.id}`, tarefaData);
                
                tarefaAdicionada();
                
                setFormVisivel(false);

            } catch  (error){
                setErro("Erro ao adicionar a tarefa. Tente novamente.");
                console.error(error);
            }
        }else{
            try {

                const response = await axios.post(`http://localhost:8989/users/${userId}/tasks`, tarefaData);

                if (response.status === 201) {
                    tarefaAdicionada();
                    setFormVisivel(false);
                }

            } catch (error) {
                setErro("Erro ao adicionar a tarefa. Tente novamente.");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    return(
        <div className="secao-form-tarefa" onClick={()=>{setFormVisivel(false)}}>
            <div className="form-tarefa-card" onClick={(evento)=>{evento.stopPropagation()}} >
                <h2 className="form-tarefa-titulo">{tituloForm}</h2>
                <form onSubmit={auxSubmit}>
                    <div className="form-tarefa-campo">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" id="titulo" name="titulo" placeholder="Digite o titulo" value={tituloTarefa} onChange={auxiliaInput(setTituloTarefa)} required/>
                    </div>

                    <div className="form-tarefa-campo">
                        <label htmlFor="descricao">Descricao</label>
                        <input type="text" id="descricao" name="descricao" placeholder="Digite o descricao" value={descricaoTarefa} onChange={auxiliaInput(setDescricaoTarefa)} required/>
                    </div>

                    <div className="form-tarefa-campo">
                        <label htmlFor="completa">Completa</label>
                        <input type="checkbox" id="completa" name="completa" checked={tarefaCompleta} onChange={()=> setTarefaCompleta(!tarefaCompleta)}/>
                    </div>

                    {tarefaCompleta && 
                    <div className="form-tarefa-campo">
                        <label htmlFor="data">Data de conclusao</label>
                        <input type="date" id="data" name="data" value={dataConclusao} onChange={auxiliaInput(setDataConclusao)} required={tarefaCompleta} />
                    </div>}
                    {erro && <p>{erro}</p>}
                    <div className="card-form-tarefa-btns">
                        <button onClick={()=>{setFormVisivel(false)}} className="btn-cinza" >Cancelar</button>
                        <button type="submit" className="btn-azul">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}