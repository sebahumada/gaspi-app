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
import { Editar } from '../components/Editar.jsx';


export const AppRouter = () => {

    const [isLogged, setisLogged] = useState(false);

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
        setisLogged(false);
        console.log('saliendo...');
        localStorage.clear();
        //onAuthStateChanged(auth, user => console.log('usuario? ',user));

    }

    const letra={
        fontFamily:'system-ui,Roboto,Arial,sans-serif'
    }
    
    const imgBebe = {
        maxWidth:'20%'
    }

    const colorLogo={
        color: '#61DAFB'
    }

    const colorHearth={
        color: '#f93154'
    }

    const sticky = {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: '#ffffff',
        borderColor: '#ffffff'
    }

    const divLogo={
        display: 'inline-block',
        backgroundColor:'#20232A',
        color: '#61DAFB'
    }
    return (
        <>
            <div className='bg-white'>
                <div style={sticky} className='border-bottom mb-1'>

                <div className='clearfix mt-2 mb-3' >
                    <img src={bebe} alt="bebe" className='img-responsive float-start' style={imgBebe}/>
                    <span className='h1 float-center' style={letra}>Lechit.app</span>
                    
                    {
                        (isLogged)?
                        (
                            <>
                                <button type='button' className='btn btn-dark btn-sm float-end' onClick={handleSalir}><i className="fas fa-sign-out-alt"></i></button>
                                
                            
                            </>
                            
                            
                            ):
                            (
                                <></>
                                )
                            }

                    <h5>
                        <span className="badge bg-danger float-start" >{fecha}</span>
                    </h5>

                

                </div>

                {
                    (isLogged)?<Botonera />:<></>
                }
                <br /><br />
                </div>
                
                <div className='mt-1'>
                    
                    <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/listado" element={<Listado />} />      
                            <Route path="/ingresar" element={<Ingresar />} />
                            <Route path="/editar/:id" element={<Editar />} />
                            <Route path="/estadisticas" element={<Estadisticas />} />
                    </Routes>

                </div>
                

                
                <div className="d-flex justify-content-center mb-2">
                <div className="p-1" style={divLogo}>
                Powered by
                <i class="fab fa-react px-2" style={colorLogo}></i>React
                </div>

                </div>

            </div>
        </>
    )
}
