import React, {useState} from "react";
import "./style.css";
import CardRegistro from "../cardRegistro";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavBar({user}){
    const [formContaVisivel, setFormContaVisivel] = useState(false);
    const navigate = useNavigate()

    const formataNome = (nomeP)=>{
        const nomes = nomeP.toLowerCase().split(" ")
        const primeiroNome = nomes[0];
        return primeiroNome;
    }

    const fazerLogout = async () => {
        try {
            await axios.post('http://localhost:8989/logout');
        } catch (error) {
            console.error("Erro ao fazer logout do backend:", error);
        }
        
        localStorage.removeItem("authToken");
        localStorage.removeItem("id_user");
        navigate("/login");
    };
    

    return (
        <>
        <div className="navbar">
            <div className="navbar-container">
                <p>Olá {formataNome(user.name)}!</p>
                <div className="navbar-btns">
                    <button onClick={()=>setFormContaVisivel(!formContaVisivel)}>Conta</button>
                    <button onClick={()=>fazerLogout()}>Sair</button>
                </div>
            </div>
        </div>
        { formContaVisivel && 
        <div className="modal-form-user">
            <CardRegistro titulo={"Alterar informações"} alteracao={true} user={user} setFormContaVisivel={setFormContaVisivel}/>
        </div>}
        </>
    ) 
}