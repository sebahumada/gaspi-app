import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query, orderBy as ordby } from 'firebase/firestore';
import { auth, db } from './../database/firebase-config';
import { orderBy  } from 'lodash';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { onAuthStateChanged } from 'firebase/auth';
import { useCuentaAtras } from './../hooks/useCuentaAtras';




export const Home = () => {


        
        const navigate = useNavigate();

        const [leche, setLeche] = useState({});      
        const [cargar, setCargar] = useState(true)
        const [actualizadoA, setActualizadoA] = useState(dayjs().format('DD-MM-YYYY HH:mm:ss'))

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

            if(cargar){
                
                getLeche();
                setCargar(false);

            }
            

        }, [cargar]);
        
        const {fecha, hora, cantidad, tipo, nocturno} = leche;              
        
        const minutosProxima = 180;//!nocturno? 140: 180;

        
        
        const fechaProxima = dayjs(`${fecha} ${hora}`).add(minutosProxima,'minutes').format('DD-MM-YYYY HH:mm');
        const {mensaje, minutos}=useCuentaAtras(fechaProxima);
        const fechaFormat = dayjs(`${fecha}`).format('DD-MM-YYYY');

        
        const handleActualizar = ()=>{
            setCargar(true);
            setActualizadoA(dayjs().format('DD-MM-YYYY HH:mm:ss'));
        }
        
        

    return (
        <div>
        
            
            
            <hr />
            {/* <h4>Resumen:</h4>
            <h6>Actualizado a: <span className="badge bg-secondary">{actualizadoA}</span></h6> */}
            
            { 
                (fecha && mensaje!=='Espere...' && cargar===false)? 
                (
                    <>
                    <div className="card border-dark mb-3 animate__animated animate__fadeIn">
                    <div className="card-header"><h4>Resumen</h4> <h6 className='card-title float-start'>Actualizado: <span className="badge rounded-pill bg-dark text-light">{actualizadoA}</span></h6></div>
                    <div className="card-body">
                    <div className='clearfix'>
                        
                        
                        {
                            (minutos<20)?

                            (
                                <button className='btn btn-light btn-sm' onClick={handleActualizar}>Recargar</button>
                            ):(
                                <></>
                                )
                        }
                    </div>                        
                        
                    <div className='card-group'>
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
