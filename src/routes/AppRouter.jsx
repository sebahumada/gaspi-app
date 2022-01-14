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
import bebe from '../assets/baby.png';
import { Botonera } from '../components/Botonera.jsx';


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

    const letra={
        fontFamily:'system-ui,Roboto,Arial,sans-serif'
    }
    
    const imgBebe = {
        maxWidth:'20%'
    }

    const sticky = {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: '#ffffff',
        borderColor: '#ffffff'
    }
    return (
        <>
        <div className='bg-white'>
            <div className='clearfix' style={sticky}>
                <img src={bebe} alt="bebe" className='img-responsive float-start' style={imgBebe}/>
                <span className='h1 float-center' style={letra}>Lechit.app</span>
                
                {
                    (isLogged)?
                    (
                        <>
                            <button type='button' className='btn btn-dark btn-sm float-end' onClick={handleSalir}>Salir</button>
                            
                        
                        </>
                        

                    ):
                    (
                        <></>
                    )
                }
            <h5><span className="badge bg-danger float-start" >{fecha}</span></h5>
            </div>

            
            <br />
            <Botonera />
            <br/>
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/listado" element={<Listado />} />      
                    <Route path="/ingresar" element={<Ingresar />} />
                    <Route path="/estadisticas" element={<Estadisticas />} />
                </Routes>


            </div>
        </>
    )
}
