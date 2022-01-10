
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { orderBy } from 'lodash';
import { auth, db } from './../database/firebase-config';
import { useForm } from './../hooks/useForm';
import { Tabla } from './Tabla';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { onAuthStateChanged } from 'firebase/auth';
import { Volver } from './Volver.jsx';

export const Listado = () => {



    onAuthStateChanged(auth, user => {

        if(!user){
            navigate('../login', { replace: true });
        }

    });

    
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
                        const orden = orderBy(resultado,['hora'],['asc']);  

                        setLeche(orden);
                        
                    } else {
                        setLeche([]);
                    }
                    setCargando(false);

            };
            

            getLeche();

        }, [fechaQ]);

        const navigate = useNavigate();

        



    return (
        <div>
            <Volver />            
            

            <hr />
            


            <div className='card border-dark mb-3 animate__animated animate__fadeIn'>
            <div class="card-header">
                <h4>Fecha</h4>
                
            </div>
            <div class="card-body">
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
            </div>

        </div>
    )
}
