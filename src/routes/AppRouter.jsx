import React, { useState } from 'react';
import {  Routes, Route  } from "react-router-dom";
import { Estadisticas } from '../components/Estadisticas';
import { Listado } from '../components/Listado';
import { Login } from '../components/Login';
import { Home } from './../components/Home';
import { Ingresar } from './../components/Ingresar';
import { auth } from './../database/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useDateTime } from './../hooks/useDateTime';

export const AppRouter = () => {

    const [isLogged, setisLogged] = useState(true);

    onAuthStateChanged(auth, user => {

        if(!user){
            setisLogged(false);
        } else{
            setisLogged(true);
        }
    
    });

    const {fecha} = useDateTime();

    const handleSalir = async ()=>{
        await auth.signOut();

        console.log('saliendo...');
        localStorage.clear();
        onAuthStateChanged(auth, user => console.log('usuario? ',user));

    }
    return (
        <div>
            <div className='clearfix'>
                <span className='h1 float-start'>Gaspi APP</span>
                
                {
                    (isLogged)?
                    (
                        <button type='button' className='btn btn-danger btn-sm float-end' onClick={handleSalir}>Salir</button>

                    ):
                    (
                        <></>
                    )
                }
            </div>
            <h6>{fecha}</h6>

            
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
