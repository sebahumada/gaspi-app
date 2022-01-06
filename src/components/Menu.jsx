import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Menu = () => {

    const navigate = useNavigate();

    const handleIngresar = ()=>{
        navigate('../ingresar', { replace: true });
    }

    const handleListado = ()=>{
        navigate('../listado', { replace: true });
    }
    const handleEstadisticas = ()=>{
        navigate('../estadisticas', { replace: true });
    }

    return (
        <>
            <button className='btn btn-success mt-1 me-1 btn-sm' onClick={handleIngresar}>Ingresar Registro</button>
            
            <button className='btn btn-primary mt-1 me-1 btn-sm' onClick={handleListado}>Listado</button>
            <button className='btn btn-info mt-1 me-1 btn-sm' onClick={handleEstadisticas}>Estadísticas</button>
        </>
    )
}
