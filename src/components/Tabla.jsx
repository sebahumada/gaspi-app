

import dayjs from 'dayjs'
import { sumBy } from 'lodash';
import React from 'react'



export const Tabla = ({datos=[], fecha}) => {

    fecha = dayjs(fecha).format('DD-MM-YYYY');
    
    const cantidad = sumBy(datos,'cantidad');
    
    
    return (
        <>



            
            {/* Button trigger modal */}

            {/* <button type="button" className="btn btn-primary mb-4 me-3"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button> */}

            {/* Modal  */}
            {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div> */}
            
            
            <h2>Registros fecha <span className="badge bg-primary">{fecha}</span></h2>
            <h3>Total <span className="badge bg-success">{cantidad} ml</span></h3>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Cantidad</th>
                            {/* <th scope="col">Fecha</th> */}
                            <th scope="col">Hora</th>
                            
                        
                        </tr>
                    </thead>
                    <tbody>

                    <tr>
                        
                    </tr>

                    {
                        // datos.map(({tipo, cantidad, fecha,hora, id}, i)=> (
                        datos.map(({tipo, cantidad, fecha,hora, id}, i)=> (
                            <tr key={id}>
                                <th>{i+1}</th>
                                <td>{tipo}</td>
                                <td>{cantidad} ml</td>
                                {/* <td>{ dayjs(fecha).format('DD-MM-YYYY') }</td> */}
                                <td>{hora}</td>
                                
                            </tr>
                        ))

                        
                        
                    }
                        
                    </tbody>
                </table>
        </>
    )
}
