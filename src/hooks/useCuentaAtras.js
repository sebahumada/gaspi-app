import { useEffect, useState } from 'react'
import { convertMinsToHrsMins, getDiferenciaFecha, getDiferenciaFechaSec } from './../helpers/fechas';
import beepSound from '../assets/beep.mp3';

export const useCuentaAtras = (fechaProxima) => {

    
    const [cuentaAtras, setCuentaAtras] = useState( getDiferenciaFecha(fechaProxima) );

    const [segundosFaltantes, setsegundosFaltantes] = useState(getDiferenciaFechaSec(fechaProxima))


    useEffect(() => {
        const id = setInterval( () => {
                const diferencia = getDiferenciaFecha(fechaProxima);
                const segundos = getDiferenciaFechaSec(fechaProxima);
                
                
                setCuentaAtras(diferencia);
                setsegundosFaltantes(segundos);

                if(segundos === 0) {
                    handlePlay();
                }

                

        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [fechaProxima])

    
    const handlePlay = ()=>{
        const beep = new Audio(beepSound);
        alert('Dar leche!');        
        if(beep.paused){
            beep.play();
        } else {
            beep.currentTime = 0;
        }
        

        
    }



    return {
        mensaje: cuentaAtras>=0?`En ${convertMinsToHrsMins(cuentaAtras, segundosFaltantes)}`:
                        cuentaAtras?
                        `Atrasado por ${convertMinsToHrsMins(cuentaAtras*-1, segundosFaltantes)}`:
                        `Espere...`,
        minutos:cuentaAtras && !isNaN(cuentaAtras)?cuentaAtras:0
    };
}
