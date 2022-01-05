
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { orderBy } from 'lodash';
import { auth, db } from './../database/firebase-config';
import { useForm } from './../hooks/useForm';
import { Tabla } from './Tabla';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { onAuthStateChanged } from 'firebase/auth';

export const Listado = () => {



    onAuthStateChanged(auth, user => {

        if(!user){
            navigate('../login', { replace: true });
        }

    });

    const handleSalir = async ()=>{
        await auth.signOut();

        console.log('saliendo...');
        localStorage.clear();
        onAuthStateChanged(auth, user => console.log('usuario? ',user));


    }

        const [leche, setLeche] = useState([]);
        
        const [cargando, setCargando] = useState(false);
        

        const[formValues, handleInputChange] = useForm({
            
            fechaQ:dayjs().format('YYYY-MM-DD')
          });
        

          const {fechaQ} = formValues;
        
          const hoy = dayjs().format('YYYY-MM-DD');

        useEffect(() => {


            const getLeche = async()=>{

                    
                    setCargando(true);
                    const lecheCollectionRef = collection(db,'gaspiLeche');
                    
                    const q = query(lecheCollectionRef, where('fecha','==',fechaQ));
                    
                    const data = await getDocs(q);

                    const resultado = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

                    if(resultado && resultado.length>0){
                        const orden = orderBy(resultado,['hora'],['desc']);  

                        setLeche(orden);
                        
                    } else {
                        setLeche([]);
                    }
                    setCargando(false);

            };
            

            getLeche();

        }, [fechaQ]);

        const navigate = useNavigate();

        const handleVolver = ()=>{
            navigate('../', { replace: true });
        }



    return (
        <div>
            <button className='btn btn-warning mt-1 me-1 btn-sm' onClick={handleVolver}>Volver</button>

            <button className='btn btn-danger mt-1 me-1 btn-sm' onClick={handleSalir}>Salir</button>
            

            <hr />
            




            <h4>Fecha</h4>
            <input type="date" name="fechaQ" value={fechaQ} max={hoy} className="form-control mb-4" onChange={handleInputChange}></input>


            {

                (leche && leche.length>0)?
                    (
                        <Tabla datos={leche} fecha={fechaQ}/>
                    ):
                    (cargando)?
                    (
                        <div className="spinner-border mt-4" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ):
                    (
                        <><h4>No hay registros</h4></>
                    )

            }
        </div>
    )
}
