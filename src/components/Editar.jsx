
import React from 'react'
import { doc, getDoc } from 'firebase/firestore';


import { auth, db } from '../database/firebase-config';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect,useState } from 'react';
import { FormularioEdit } from './FormularioEdit.jsx';
import { useStoreState } from 'easy-peasy';



export const Editar = () => {

  

  const id = useStoreState((state) => state.idDoc);

  onAuthStateChanged(auth, user => {

    if(!user){
        navigate('../login', { replace: true });
    }

});

  const [leche, setLeche] = useState();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    
    const getLeche = async()=>{
      
      const docRef = doc(db,'gaspiLeche',id);
      const dataResp=await getDoc(docRef);
      setLeche({ id: dataResp.id, ...dataResp.data() });
      setCargando(false);
      

    }

    getLeche();

  }, [id])    
      

      const navigate = useNavigate();
      
        

    return (
        <>
          { (!cargando)?
          
            (
                <FormularioEdit id={leche.id }fech={leche.fecha} cant={leche.cantidad} hor={leche.hora} tip={leche.tipo}/>

            ): (
              <></>
            )
          }
        </>
    )
}
