import { useEffect, useState } from 'react';



export const useDateTime = () => {

    
    const [dateTime, setDatetime] = useState(new Date());
    

    useEffect(() => {
        const id = setInterval(() => setDatetime(new Date()), 1000);
        return () => {
            clearInterval(id);
            
        }
    }, []);


    return {
        fecha: `${dateTime.toLocaleDateString()} - ${dateTime.toLocaleTimeString()}`                

    };


}