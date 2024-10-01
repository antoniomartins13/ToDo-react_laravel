import React from "react";
import CardRegistro from "../../componentes/cardRegistro";

export default function PaginaRegistro(){
    return (
        <div className="pagina-Registro">
            <CardRegistro titulo={"Registro"} registro={true} user={{}}/>
        </div>
    ) 
}