import { useEffect, useState } from 'react'
import { convertMinsToHrsMins, getDiferenciaFecha } from './../helpers/fechas';

export const useCuentaAtras = (fechaProxima) => {

    
    const [cuentaAtras, setCuentaAtras] = useState( getDiferenciaFecha(fechaProxima) );


    useEffect(() => {
        const id = setInterval( () => {
                const diferencia = getDiferenciaFecha(fechaProxima);

                setCuentaAtras(diferencia);


        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [fechaProxima])






    return {
        minutos: cuentaAtras>=0?`En ${convertMinsToHrsMins(cuentaAtras)}`:`Atrasado por ${convertMinsToHrsMins(cuentaAtras*-1)}`
    };
}
