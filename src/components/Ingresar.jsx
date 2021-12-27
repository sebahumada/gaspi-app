import React from 'react'
import dayjs from 'dayjs';

import { collection, addDoc } from 'firebase/firestore';

import { useForm } from './../hooks/useForm';
import { db } from './../database/firebase-config';
import { useNavigate } from 'react-router-dom';
import  Swal from 'sweetalert2';

export const Ingresar = () => {

    const lecheCollectionRef = collection(db,'gaspiLeche');

    const[formValues, handleInputChange] = useForm({
        cantidad:60,
        fecha:dayjs().format('YYYY-MM-DD'),
        hora:dayjs().format('HH:mm'),
        tipo:'Relleno'
      });


      const {fecha, cantidad, hora, tipo} = formValues;


      const handleIngresar = async(e)=>{


        try {
            
            e.preventDefault();
        
            const nuevoRegistro = {
              cantidad,
              fecha:`${fecha} ${hora}`,      
              tipo               
          };
        
            await addDoc(lecheCollectionRef, nuevoRegistro );

            Swal.fire({
                title: 'Documento Ingresado',
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

        const handleVolver = ()=>{
            navigate('../', { replace: true });
        }

    return (
        <div>
            <button className='btn btn-danger mb-4' onClick={handleVolver}>Volver</button>
          <form onSubmit={handleIngresar} className="form-control">
            <p className="form-label">Ingresa Tipo</p>
                <select name="tipo" value={tipo} onChange={handleInputChange} className="form-select">
                    <option value="Relleno">Relleno</option>
                    <option value="Materna">Materna</option>
                </select>
            <p className="form-label">Ingresa Cantidad (ml)</p>
            <input type="number" name="cantidad" value={cantidad} min={0} max={999} className="form-control" onChange={handleInputChange}></input>
            <p className="form-label">Ingresa Fecha</p>
            <input type="date" name="fecha" value={fecha} className="form-control" onChange={handleInputChange}></input>
            <p className="form-label">Ingresa Hora</p>
            <input type="time" name="hora" value={hora} className="form-control" onChange={handleInputChange}></input>
            <button type="submit" className="btn btn-primary mt-2">Ingresar</button>
        </form>

        
    </div>
    )
}
