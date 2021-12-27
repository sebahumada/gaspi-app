
import React, { useEffect, useState } from 'react';
import { collection,  getDocs } from 'firebase/firestore';
import { orderBy } from 'lodash';
import { db } from './../database/firebase-config';

import { Tabla } from './Tabla';
import { useNavigate } from 'react-router-dom';

export const Listado = () => {

        const [leche, setLeche] = useState([]);

        
        const lecheCollectionRef = collection(db,'gaspiLeche');

        useEffect(() => {


                const getLeche = async()=>{
                console.log('useEffect - getLeche()');
                const data = await getDocs(lecheCollectionRef);

                const resultado = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

                if(resultado && resultado.length>0){
                const orden = orderBy(resultado,['fecha'],['desc']);

                    setLeche(orden);
                

                }
            };

            getLeche();

        }, []);

        const navigate = useNavigate();

        const handleVolver = ()=>{
            navigate('../', { replace: true });
        }



    return (
        <div>
            <button className='btn btn-danger mb-4' onClick={handleVolver}>Volver</button>
            
            {

                (leche && leche.length>0)?
                    (
                        <Tabla datos={leche} />
                    ):
                    (
                        <h2 className='text-danger'>No hay registros</h2>
                    )

            }
        </div>
    )
}
