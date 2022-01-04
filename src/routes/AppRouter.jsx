import React from 'react';
import {  Routes, Route  } from "react-router-dom";
import { Estadisticas } from '../components/Estadisticas.jsx';
import { Listado } from '../components/Listado.jsx';
import { Login } from '../components/Login.jsx';
import { Home } from './../components/Home';
import { Ingresar } from './../components/Ingresar';

export const AppRouter = () => {
    return (
        <div>
            <h1>Gaspi APP</h1>
            <br />
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/listado" element={<Listado />} />      
                    <Route path="/ingresar" element={<Ingresar />} />
                    <Route path="/estadisticas" element={<Estadisticas />} />
                </Routes>


        </div>
    )
}
