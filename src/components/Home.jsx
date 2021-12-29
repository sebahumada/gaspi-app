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
                    console.log('useEffect - getLeche()');
                    const data = await getDocs(q);

                    const resultado = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

                    if(resultado && resultado.length>0){
                        console.log(resultado);
                        const orden = orderBy(resultado,['fecha','hora'],['desc','desc']);      
                        console.log(orden);              
                        setLeche(orden[0]);
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


            <button className='btn btn-success me-3' onClick={handleIngresar}>Ingresar Registro</button>
            
            <button className='btn btn-primary me-3' onClick={handleListado}>Listado</button>
            <button className='btn btn-danger me-3' onClick={handleSalir}>Salir</button>
            
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
                    <div><h2 className='text-danger'>No hay registros</h2></div>
                )
        
            }
            
        </div>
    )
}
