import React from 'react'
import { NavLink } from 'react-router-dom'

export const Botonera = () => {

    const clase = 'btn btn-info me-1 btn-sm';  
    


    return (
        <>
            <NavLink  to="/" className={clase}><i className="fas fa-home"></i></NavLink>
            <NavLink  to="/ingresar" className={clase}><i className="fas fa-pen"></i> Ingresa</NavLink>
            <NavLink to="/listado" className={clase}><i className="fas fa-list-ol"></i> Listado</NavLink>
            <NavLink to="/estadisticas" className={clase}><i className="fas fa-chart-area"></i> Gráfico</NavLink>
        </>
    )
}
