import React from 'react'
import dayjs from 'dayjs';

import { collection, addDoc } from 'firebase/firestore';

import { useForm } from './../hooks/useForm';
import { auth, db } from './../database/firebase-config';
import { useNavigate } from 'react-router-dom';
import  Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import { Volver } from './Volver.jsx';

export const Ingresar = () => {



  onAuthStateChanged(auth, user => {

    if(!user){
        navigate('../login', { replace: true });
    }

});



    const lecheCollectionRef = collection(db,'gaspiLeche');

    const[formValues, handleInputChange] = useForm({
        cantidad:60,
        fecha:dayjs().format('YYYY-MM-DD'),
        hora:dayjs().format('HH:mm'),
        tipo:'Relleno',
        nocturno: false
      });


      const {fecha, cantidad, hora, tipo, nocturno} = formValues;

      const hoy=dayjs().format('YYYY-MM-DD');
      const semana=dayjs().add(-7,'day').format('YYYY-MM-DD')


     

      const handleIngresar = async(e)=>{
      

        try {
            
            e.preventDefault();
        
            const nuevoRegistro = {
              cantidad: Number(cantidad),
              fecha,
              hora,      
              tipo,
              nocturno               
          };
        
            await addDoc(lecheCollectionRef, nuevoRegistro );

            Swal.fire({
                title: 'Registro ingresado correctamente!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
                denyButtonText: `Cancelar`,
              }).then((result) => {
                
                if (result.isConfirmed) {
                    navigate('../listado', { replace: true });
                } 
              });
        } catch (error) {
            
            Swal.fire(
                'Oh oh!',
                'Hubo un error. Intente más tarde',
                'error'
              );
        }



        
    
      }

      const navigate = useNavigate();
      
        

    return (
        <div>
            
          <Volver />
            

            <hr />
            <div className='card border-dark mb-3 animate__animated animate__fadeIn'>
            <div className="card-header"><h4>Ingresar leche</h4></div>
            
            <div className="card-body">
                      <form onSubmit={handleIngresar}>

                      <div className="form-floating mb-3">
                          <select name="tipo" value={tipo} id="flTipo" onChange={handleInputChange} className="form-select">
                              <option value="Relleno">Relleno</option>
                              <option value="Materna">Materna</option>
                          </select>
                          <label htmlFor="flTipo">Ingresa Tipo</label>
                      </div>
                        
                      <div className="form-floating mb-3">
                        <input type="number" name="cantidad" id="flCantidad" value={cantidad} min={0} max={999} className="form-control" onChange={handleInputChange}></input>
                        <label htmlFor="flCantidad">Ingresa Cantidad (ml)</label>            
                      </div>

                      <div className="form-floating mb-3">
                        <input type="date" name="fecha" id="flFecha" value={fecha} min={semana} max={hoy} className="form-control" onChange={handleInputChange}></input>
                        <label htmlFor="flFecha">Ingresa Fecha</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input type="time" name="hora" id="flHora" value={hora} className="form-control" onChange={handleInputChange}></input>
                        <label htmlFor="flHora">Ingresa Hora</label>
                      </div>

                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={nocturno} name="nocturno" onChange={handleInputChange} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Leche nocturna</label>
                      </div>

                        <button type="submit" className="btn btn-primary mt-2">Ingresar Leche</button>
                    </form>



              </div>
            </div>
        
    </div>
    )
}
