import React from 'react'
import { NavLink } from 'react-router-dom'

export const Botonera = () => {

    const clase = 'btn btn-info m-1 btn-sm';  
    


    return (
        <>
            <NavLink  to="/" className={clase}>Home</NavLink>
            <NavLink  to="/ingresar" className={clase}>Ingresar</NavLink>
            <NavLink to="/listado" className={clase}>Listado</NavLink>
            <NavLink to="/estadisticas" className={clase}>Gráfico</NavLink>
        </>
    )
}
