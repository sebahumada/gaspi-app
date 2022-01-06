import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Volver = () => {

    const navigate = useNavigate();

        const handleVolver = ()=>{
            navigate('../', { replace: true });
        }

    return (
        <>
            <button className='btn btn-warning mt-1 me-1 btn-sm' onClick={handleVolver}>Volver</button>
        </>
    )
}
