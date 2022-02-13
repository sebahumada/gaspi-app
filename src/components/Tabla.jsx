

import dayjs from 'dayjs'
import { useStoreActions } from 'easy-peasy';


import { sumBy } from 'lodash';
import React from 'react'
import { useNavigate } from 'react-router-dom';



export const Tabla = ({datos=[], fecha, handleDelete}) => {


    const navigate = useNavigate();
    const setId = useStoreActions((actions) => actions.setId);

    const handleEditar = (id)=>{
        
        setId(id);
        navigate('../editar', { replace: true });

    }

    fecha = dayjs(fecha).format('DD-MM-YYYY');
    
    const cantidad = sumBy(datos,'cantidad');
    const colorEdit={        
        color:'#1266f1'
    }

    const colorDel={
        color:'#f93154'
    }
    
    return (
        <>

            
            <h2>Registros fecha <span className="badge bg-primary">{fecha}</span></h2>
            <h3>Total <span className="badge bg-success">{cantidad} ml</span></h3>
            <div className='table-responsive'>

            
                <table className="table table-ligth table-striped text-center table-hover">
                        <thead className='table-primary'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Hora</th>
                                <th scope="col"><i className="fas fa-edit"></i></th>
                                <th scope="col"><i className="fas fa-trash-alt"></i></th>
                                
                                
                            
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
                                        
                                            <i onClick={()=>handleEditar(id)} className="fas fa-edit" style={colorEdit}></i>                                    
                                        
                                    </td>
                                    <td>
                                        <i onClick={()=>handleDelete(id)}  className="fas fa-trash-alt" style={colorDel}></i>
                                        
                                    </td>
                                    
                                </tr>
                            ))

                            
                            
                        }
                            
                        </tbody>
                    </table>
                </div>
           
        </>
    )
}
