import React, { useEffect, useState } from 'react'
import { db } from '../database/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import { sumBy, orderBy } from 'lodash';
import Grafico  from './Grafico';
import { Volver } from './Volver';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../database/firebase-config';

export const Estadisticas = () => {

    const navigate = useNavigate();

    onAuthStateChanged(auth, user => {

        if(!user){
            navigate('../login', { replace: true });
        }
    
    });

    const groupBy = (arr, criteria)=> {
        const newObj = arr.reduce(function (acc, currentValue) {
          if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
          }
          acc[currentValue[criteria]].push(currentValue);
          return acc;
        }, {});
        return newObj;
      }


    const [leche, setLeche] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {


        const getLeche = async()=>{
                setCargando(true);
                let fechas = [];
                for(let i=1;i<=7;i++){
                    let aux = i *-1;
                    fechas.push(dayjs().add(aux,'day').format('YYYY-MM-DD'))
                }
                
                const lecheCollectionRef = collection(db,'gaspiLeche');
                
                const q = query(lecheCollectionRef, where('fecha','in',fechas));
                
                const data = await getDocs(q);

                const resultadoAux = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));
                const resultado = resultadoAux.map( (d)=> ({ fecha: d.fecha, cantidad: d.cantidad}));


                
                
                if(resultado && resultado.length>0){
                   
                    
                    const arrPorFecha = groupBy(resultado,'fecha');
                    
                    

                    const arrFinal = []

                    for(const property in arrPorFecha){

                        const arr = arrPorFecha[property];
                        const obj = {
                            fecha: property,
                            cantidad: sumBy(arr,'cantidad')
                        }
                        arrFinal.push(obj);

                        
                    }
                    let arrAux = orderBy (arrFinal,['fecha'],['asc']);
                    
                    setLeche(arrAux);

                    
                } else {
                    console.log('hola')
                    setLeche([]);
                }
                
                setCargando(false);
        };
        

        getLeche();

    }, []);


    
    

        

    return (
        <>
        
        <Volver />
            
            <hr />

            <div className='card border-dark mb-3 animate__animated animate__fadeIn'>

                <div class="card-header">
                    <h4>Gráficos leche últimos 7 días</h4>
                </div>

                <div class="card-body">
                {
                    (leche && leche.length>0)?

                    (
                        <Grafico leche={leche} />

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

        </>
        
        
        
    )
}
