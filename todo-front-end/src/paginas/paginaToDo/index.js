import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

import NavBar from "../../componentes/navBar";
import SecaoTarefas from "../../componentes/secaoTarefas";
import { Navigate } from "react-router-dom";

export default function PaginaToDo(){
    const userId = localStorage.getItem("id_user");
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const getData = async ()=>{
        try{
            const response = await axios.get(`http://localhost:8989/users/${userId}`);
            setUser(response.data.data);
            setLoading(false);

        } catch {
            setErro("Erro ao carregar usuário.");
            setLoading(false);
            return <Navigate to="/login" />;
        }
    }

    

    useEffect(() => {
        if (userId) {
            getData();
        } else {
            setErro("Usuário não encontrado. Redirecionando para o login.");
            return <Navigate to="/login" />;
        }
    }, [userId]);

    return (
        <div className="pagina-todo">
            {user && 
                <NavBar user={user}/>}
            {user &&
                <SecaoTarefas user={user}/>}
        </div>
    ) 
}