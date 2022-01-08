import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query, orderBy as ordby } from 'firebase/firestore';
import { auth, db } from './../database/firebase-config';
import { orderBy  } from 'lodash';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { onAuthStateChanged } from 'firebase/auth';
import { Menu } from './Menu.jsx';
import { useCuentaAtras } from './../hooks/useCuentaAtras';




export const Home = () => {


        
        const navigate = useNavigate();

        const [leche, setLeche] = useState({});      
        

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
        
        const {fecha, hora, cantidad, tipo, nocturno} = leche;              
        
        const minutosProxima = !nocturno? 140: 180;

        
        
        const fechaProxima = dayjs(`${fecha} ${hora}`).add(minutosProxima,'minutes').format('DD-MM-YYYY HH:mm');
        const {mensaje, minutos}=useCuentaAtras(fechaProxima);
        const fechaFormat = dayjs(`${fecha}`).format('DD-MM-YYYY');

        

        
        

    return (
        <div>
        
            <Menu />            
            
            <hr />
            <h4>Resumen</h4>

            
            { 
                (leche.fecha)? 
                (
                    <>
                        <div className='card-group animate__animated animate__slideInLeft'>
                            <div className="card text-white bg-danger mt-4">
                            <div className="card-header fw-bold">Próxima Leche</div>
                            <div className="card-body">
                                
                                {
                                    (minutos>=0)?
                                    (
                                        <h4 className='card-title'>{mensaje}</h4>
                                    ):(
                                        <h2 className='card-title'>{mensaje}</h2>
                                    )
                                }
                                <h5 className="card-title mt-3">{fechaProxima}</h5>
                                
                            </div>
                            </div>

                            <div className="card text-white bg-primary mt-4">
                            <div className="card-header fw-bold">Última Leche</div>
                            <div className="card-body">
                                
                                <p className="card-text">Fecha: {fechaFormat}</p>
                                <p className="card-text">Hora: {hora}</p>
                                <p className="card-text">Cantidad: {cantidad} ml</p>
                                <p className="card-text">Tipo: {tipo}</p>
                                <p className="card-text">Próxima leche nocturna?: {nocturno?'Si':'No'}</p>
                                
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
