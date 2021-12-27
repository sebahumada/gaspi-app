
import { updateDoc, doc } from 'firebase/firestore';
import React from 'react'
import { db } from './../database/firebase-config';
import Swal from 'sweetalert2';

export const Tabla = ({datos}=[]) => {


    
    
    return (
        <>
            

            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Fecha</th>
                            {/* <th scope="col">Hora</th> */}
                            
                        
                        </tr>
                    </thead>
                    <tbody>

                    <tr>
                        
                    </tr>

                    {
                        datos.map(({tipo, cantidad, fecha, id}, i)=> (
                            <tr key={i}>
                                <th>{i+1}</th>
                                <td>{tipo}</td>
                                <td>{cantidad}</td>
                                <td>{fecha}</td>
                                {/* <td>{hora}</td> */}
                                
                            </tr>
                        ))

                        
                        
                    }
                         
                        
                    </tbody>
                </table>
        </>
    )
}
