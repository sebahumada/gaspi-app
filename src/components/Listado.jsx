
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
        

        

        const[formValues, handleInputChange] = useForm({
            
            fechaQ:dayjs().format('YYYY-MM-DD')
          });
        

          const {fechaQ} = formValues;
        

        useEffect(() => {


                const lecheCollectionRef = collection(db,'gaspiLeche');
                console.log(fechaQ)
                const q = query(lecheCollectionRef, where('fecha','==',fechaQ));
                const getLeche = async()=>{
                console.log('useEffect - getLeche()');
                const data = await getDocs(q);

                const resultado = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

                if(resultado && resultado.length>0){
                    const orden = orderBy(resultado,['hora'],['desc']);  

                    setLeche(orden);
                

                }
            };

            getLeche();

        }, [fechaQ]);

        const navigate = useNavigate();

        const handleVolver = ()=>{
            navigate('../', { replace: true });
        }



    return (
        <div>
            <button className='btn btn-warning mb-4 me-3' onClick={handleVolver}>Volver</button>

            <button className='btn btn-danger mb-4 me-3' onClick={handleSalir}>Salir</button>
            
            <h4>Fecha</h4>
            <input type="date" name="fechaQ" value={fechaQ} className="form-control mb-4" onChange={handleInputChange}></input>


            {

                (leche && leche.length>0)?
                    (
                        <Tabla datos={leche} fecha={fechaQ}/>
                    ):
                    (
                        <div className="spinner-border mt-4" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )

            }
        </div>
    )
}
