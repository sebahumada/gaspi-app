

import dayjs from 'dayjs'
import { sumBy } from 'lodash';
import React from 'react'



export const Tabla = ({datos=[], fecha}) => {

    fecha = dayjs(fecha).format('DD-MM-YYYY');
    
    const cantidad = sumBy(datos,'cantidad');
    
    
    return (
        <>

            
            <h2>Registros fecha <span className="badge bg-primary">{fecha}</span></h2>
            <h3>Total <span className="badge bg-success">{cantidad} ml</span></h3>
            <table className="table table-info table-striped text-center">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Hora</th>
                            
                        
                        </tr>
                    </thead>
                    <tbody>

                    <tr>
                        
                    </tr>

                    {
                        
                        datos.map(({tipo, cantidad, fecha,hora, id}, i)=> (
                            <tr key={id}>
                                <th>{i+1}</th>
                                <td>{tipo}</td>
                                <td>{cantidad} ml</td>                                
                                <td>{hora}</td>
                                
                            </tr>
                        ))

                        
                        
                    }
                        
                    </tbody>
                </table>
           
        </>
    )
}
