import { useEffect, useState } from 'react';
import dayjs from "dayjs";



export const useDateTime = () => {

    
    const [dateTime, setDatetime] = useState(dayjs());
    

    useEffect(() => {
        const id = setInterval(() => setDatetime(dayjs()), 1000);
        return () => {
            clearInterval(id);
            
        }
    }, []);


    return {
        fecha: `${dateTime.format('DD-MM-YYYY HH:mm:ss')}`                

    };


}