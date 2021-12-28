

import dayjs from 'dayjs'
import React from 'react'



export const Tabla = ({datos=[], fecha}) => {

    fecha = dayjs(fecha).format('DD-MM-YYYY');

    
    
    return (
        <>
            
            <h2>Registros fecha: {fecha}</h2>
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            
                        
                        </tr>
                    </thead>
                    <tbody>

                    <tr>
                        
                    </tr>

                    {
                        datos.map(({tipo, cantidad, fecha, hora, id}, i)=> (
                            <tr key={i}>
                                <th>{i+1}</th>
                                <td>{tipo}</td>
                                <td>{cantidad}</td>
                                <td>{fecha}</td>
                                <td>{hora}</td>
                                
                            </tr>
                        ))

                        
                        
                    }
                         
                        
                    </tbody>
                </table>
        </>
    )
}
