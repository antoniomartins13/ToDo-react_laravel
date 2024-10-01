import React from "react";
import CardRegistro from "../../componentes/cardRegistro";

export default function PaginaLogin(){
    return (
        <div className="pagina-login">
            <CardRegistro titulo={"Login"} login={true} user={{}}/>
        </div>
    ) 
}