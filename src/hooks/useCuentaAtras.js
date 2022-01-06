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
        mensaje: cuentaAtras>=0?`En ${convertMinsToHrsMins(cuentaAtras)}`:
                        cuentaAtras?
                        `Atrasado por ${convertMinsToHrsMins(cuentaAtras*-1)}`:
                        `Espere...`,
        minutos:cuentaAtras && !isNaN(cuentaAtras)?cuentaAtras:0
    };
}
