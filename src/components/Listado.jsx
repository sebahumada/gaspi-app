
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { orderBy } from 'lodash';
import { db } from './../database/firebase-config';
import { useForm } from './../hooks/useForm';
import { Tabla } from './Tabla';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const Listado = () => {

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
            <button className='btn btn-danger mb-4' onClick={handleVolver}>Volver</button>
            
            <h4>Fecha</h4>
            <input type="date" name="fechaQ" value={fechaQ} className="form-control mb-4" onChange={handleInputChange}></input>


            {

                (leche && leche.length>0)?
                    (
                        <Tabla datos={leche} fecha={fechaQ}/>
                    ):
                    (
                        <h2 className='text-danger'>No hay registros</h2>
                    )

            }
        </div>
    )
}
