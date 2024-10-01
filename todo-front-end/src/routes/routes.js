import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaLogin from "../paginas/paginalogin";
import PaginaRegistro from "../paginas/paginaRegistro";
import PaginaErro from "../paginas/paginaErroDeRota";
import PaginaToDo from "../paginas/paginaToDo";
import PrivateRoute from "./privateRoute";
import axios from "axios";

export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PaginaLogin/>}/>
                <Route path="/registro" element={<PaginaRegistro/>}/>
                <Route path="/tarefas" element={
                    <PrivateRoute>
                        <PaginaToDo/>
                    </PrivateRoute>
                }/>

                <Route path="*" element={<PaginaErro/>}/>
            </Routes>
        </BrowserRouter>
    )
}