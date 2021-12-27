import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from './../database/firebase-config';
import { orderBy  } from 'lodash';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const Home = () => {

    const [leche, setLeche] = useState({});


        const lecheCollectionRef = collection(db,'gaspiLeche');        
        const q = query(lecheCollectionRef, limit(10));

        useEffect(() => {


                const getLeche = async()=>{
                console.log('useEffect - getLeche()');
                const data = await getDocs(q);

                const resultado = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

                if(resultado && resultado.length>0){
                    
                    const orden = orderBy(resultado,['fecha','hora'],['desc','desc']);                    
                    setLeche(orden[0]);
                }
            };

            getLeche();

        }, []);

        const {fecha, hora, cantidad, tipo} = leche;
        
        const navigate = useNavigate();

        const handleIngresar = ()=>{
            navigate('../ingresar', { replace: true });
        }

        const handleListado = ()=>{
            navigate('../listado', { replace: true });
        }


        const fechaProxima = dayjs(`${fecha} ${hora}`).add(150,'minutes').format('DD-MM-YYYY HH:mm');
        
        
        


    return (
        <div>

            <button className='btn btn-success me-3' onClick={handleIngresar}>Ingresar Registro</button>
            <button className='btn btn-primary' onClick={handleListado}>Listado</button>
            
            { 
                (leche.fecha)? 
                (
                    <>
                            <div className="card text-white bg-danger mt-4">
                            <div className="card-header">Próxima Leche</div>
                            <div className="card-body">
                                
                               
                                <h5 className="card-title">{fechaProxima}</h5>
                                
                            </div>
                            </div>

                            <div className="card text-white bg-primary mt-4">
                            <div className="card-header">Última Leche</div>
                            <div className="card-body">
                                
                                <p className="card-text">Fecha: {fecha}</p>
                                <p className="card-text">Hora: {hora}</p>
                                <p className="card-text">Cantidad: {cantidad}</p>
                                <p className="card-text">Tipo: {tipo}</p>
                                
                            </div>
                            </div>


                        


                    </>
                    
                ):
                (
                    <div><h2 className='text-danger'>No hay registros</h2></div>
                )
        
            }
            
        </div>
    )
}
