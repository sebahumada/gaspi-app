import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query, orderBy as ordby } from 'firebase/firestore';
import { auth, db } from './../database/firebase-config';
import { orderBy  } from 'lodash';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { onAuthStateChanged } from 'firebase/auth';


export const Home = () => {

        const [leche, setLeche] = useState({});        
        
        //const q1 = query(lecheCollectionRef,   ordby('fecha','desc') ,limit(10));
        //const q = query(q1,   ordby('hora','desc') ,limit(1));


        onAuthStateChanged(auth, user => {

            if(!user){
                navigate('../login', { replace: true });
            }

        });

        

        useEffect(() => {


                const getLeche = async()=>{
                    const lecheCollectionRef = collection(db,'gaspiLeche');        
                    const q = query(lecheCollectionRef,  ordby('fecha','desc'), ordby('hora','desc') ,limit(1));
                    
                    const data = await getDocs(q);

                    const resultado = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

                    if(resultado && resultado.length>0){
                        
                        const orden = orderBy(resultado,['fecha','hora'],['desc','desc']);      
                               
                        setLeche(orden[0]);
                    } else {
                        setLeche({})
                    }
                
            };

            getLeche();

        }, []);

        const {fecha, hora, cantidad, tipo} = leche;
        //const fechaFormat = dayjs(fecha).format('DD-MM-YYYY');
        
        const navigate = useNavigate();

        const handleIngresar = ()=>{
            navigate('../ingresar', { replace: true });
        }

        const handleListado = ()=>{
            navigate('../listado', { replace: true });
        }
        const handleEstadisticas = ()=>{
            navigate('../estadisticas', { replace: true });
        }

        const fechaProxima = dayjs(`${fecha} ${hora}`).add(150,'minutes').format('DD-MM-YYYY HH:mm');
        const fechaFormat = dayjs(`${fecha}`).format('DD-MM-YYYY');

        const handleSalir = async ()=>{
            await auth.signOut();

            console.log('saliendo...');
            localStorage.clear();
            onAuthStateChanged(auth, user => console.log('usuario? ',user));


        }
        
        


    return (
        <div>
        
            

            <button className='btn btn-success mt-1 me-1' onClick={handleIngresar}>Ingresar Registro</button>
            
            <button className='btn btn-primary mt-1 me-1' onClick={handleListado}>Listado</button>
            <button className='btn btn-warning mt-1 me-1' onClick={handleEstadisticas}>Estadísticas</button>
            <button className='btn btn-danger mt-1 me-1' onClick={handleSalir}>Salir</button>
            <hr />
            <h4>Resumen</h4>
            { 
                (leche.fecha)? 
                (
                    <>
                        <div className='card-group'>
                            <div className="card text-white bg-danger mt-4 ">
                            <div className="card-header fw-bold">Próxima Leche</div>
                            <div className="card-body">
                                
                               
                                <h5 className="card-title">{fechaProxima}</h5>
                                
                            </div>
                            </div>

                            <div className="card text-white bg-primary mt-4">
                            <div className="card-header fw-bold">Última Leche</div>
                            <div className="card-body">
                                
                                <p className="card-text">Fecha: {fechaFormat}</p>
                                <p className="card-text">Hora: {hora}</p>
                                <p className="card-text">Cantidad: {cantidad} ml</p>
                                <p className="card-text">Tipo: {tipo}</p>
                                
                            </div>
                            </div>
                        </div>

                        


                    </>
                    
                ):
                (
                    // <div><h2 className='text-danger'>No hay registros</h2></div>
                    <div className="spinner-border mt-4" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )
        
            }
            
        </div>
    )
}
