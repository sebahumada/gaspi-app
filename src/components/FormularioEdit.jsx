import dayjs from 'dayjs';
import { useForm } from '../hooks/useForm';
import  Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../database/firebase-config.js';

export const FormularioEdit = ({texto,id,fech, cant, hor, tip}) => {

    const hoy=dayjs().format('YYYY-MM-DD');
    const semana=dayjs().add(-7,'day').format('YYYY-MM-DD');
    const navigate = useNavigate();

    const[formValues, handleInputChange] = useForm({
        fecha: fech, 
        cantidad: cant, 
        hora: hor, 
        tipo: tip
    });

    const {fecha, cantidad, hora, tipo} = formValues;

    const handleEditar = async(e)=>{
        
        e.preventDefault();
        try {

          const docRef = doc(db,'gaspiLeche',id);
          await updateDoc(docRef,{
            fecha, 
            cantidad, 
            hora, 
            tipo});

            Swal.fire({
              title: 'Registro editado correctamente!',
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

  return (
    <div>  

         


            <div className='card border-dark mb-3 animate__animated animate__fadeIn'>
            <div className="card-header"><h4>Editar leche</h4></div>
            
            <div className="card-body">
                      <form onSubmit={handleEditar}>

                      <div className="form-floating mb-3">
                          <select name="tipo" value={tipo} id="flTipo" onChange={handleInputChange} className="form-select">
                              <option value="Relleno">Relleno</option>
                              <option value="Materna">Materna</option>
                          </select>
                          <label htmlFor="flTipo">Editar Tipo</label>
                      </div>
                        
                      <div className="form-floating mb-3">
                        <input type="number" name="cantidad" id="flCantidad" value={cantidad} min={0} max={999} className="form-control" onChange={handleInputChange}></input>
                        <label htmlFor="flCantidad">Editar Cantidad (ml)</label>            
                      </div>

                      <div className="form-floating mb-3">
                        <input type="date" name="fecha" id="flFecha" value={fecha} min={semana} max={hoy} className="form-control" onChange={handleInputChange}></input>
                        <label htmlFor="flFecha">Editar Fecha</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input type="time" name="hora" id="flHora" value={hora} className="form-control" onChange={handleInputChange}></input>
                        <label htmlFor="flHora">Editar Hora</label>
                      </div>                      

                        <button type="submit" className="btn btn-primary mt-2 "><i className="fas fa-save"></i> Editar</button>
                    </form>



              </div>
            </div>
            
        
    </div>
  )
}
