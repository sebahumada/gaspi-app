import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../database/firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import { sumBy, orderBy } from 'lodash';
import Grafico  from './Grafico.jsx';
import { onAuthStateChanged } from 'firebase/auth';


export const Estadisticas = () => {

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


    
    const navigate = useNavigate();

        const handleVolver = ()=>{
            navigate('../', { replace: true });
        }

    

    return (
        <>
        
            <button className='btn btn-warning mt-1 me-1 btn-sm' onClick={handleVolver}>Volver</button>
            <button className='btn btn-danger mt-1 me-1 btn-sm' onClick={handleSalir}>Salir</button>
            <hr />
            <h4>Gráficos leche últimos 7 días</h4>

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

        </>
        
        
        
    )
}
