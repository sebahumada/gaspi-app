

import dayjs from 'dayjs'
import { sumBy } from 'lodash';
import React from 'react'
import { Link } from 'react-router-dom';



export const Tabla = ({datos=[], fecha, handleDelete}) => {

    fecha = dayjs(fecha).format('DD-MM-YYYY');
    
    const cantidad = sumBy(datos,'cantidad');
    const colorEdit={
        color:'##1266f1'
    }

    const colorDel={
        color:'#f93154'
    }
    
    return (
        <>

            
            <h2>Registros fecha <span className="badge bg-primary">{fecha}</span></h2>
            <h3>Total <span className="badge bg-success">{cantidad} ml</span></h3>
            <table className="table table-light table-striped text-center">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Opt</th>
                            
                            
                        
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
                                <td>
                                    <Link to={`/editar/${id}`}>
                                        <i className="fas fa-edit me-3" style={colorEdit}></i>                                    
                                    </Link>
                                    <i onClick={()=>handleDelete(id)}  className="fas fa-trash-alt" style={colorDel}></i>
                                    
                                </td>
                                
                            </tr>
                        ))

                        
                        
                    }
                        
                    </tbody>
                </table>
           
        </>
    )
}
