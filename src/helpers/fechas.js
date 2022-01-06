import dayjs from "dayjs";

export const getDiferenciaFecha = (fechaProxima)=>{


    try {
        const fechaSplit = fechaProxima.split(' ');
        const [dia, hora] = fechaSplit;
        const separaDia = dia.split('-');
        const[dd,mm,aa] = separaDia;
        const separaHora = hora.split(':');
        const [hh, mi] = separaHora;
        const fechaProximaDate = new Date(aa,mm-1,dd,hh,mi,0,0);
        const fechaProx = dayjs(fechaProximaDate);
                        
        const ahora = dayjs();

        const diferencia = fechaProx.diff(ahora,'minutes');

        return diferencia;
    } catch (error) {
        return 150;
    }       

}

export const convertMinsToHrsMins = (mins) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);

    let mensajeSalidaH = '';
    let mensajeSalidaM = '';

    if(h===0){
        mensajeSalidaH = ''
    } else if(h===1){
        mensajeSalidaH = `${h} hora y `
    } else {
        mensajeSalidaH = `${h} horas y`
    }

    if(m===0){
        mensajeSalidaM = '0 minutos'
    } else if(m===1){
        mensajeSalidaM = `$1 minuto`
    } else {
        mensajeSalidaM = `${m} minutos`
    }

    return `${mensajeSalidaH} ${mensajeSalidaM}`;
  }