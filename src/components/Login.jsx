import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth } from '../database/firebase-config.js';
import { useNavigate } from 'react-router-dom';




export const Login = () => {

    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider)
    .then( ({name, email, profilePic}) => {

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('profilePic', profilePic);
        
        navigate('../', { replace: true });
        


    }).catch( (error) =>{
      console.log(error)
    });
}



    return (
        <div>
            <button className='btn btn-primary' onClick={signInWithGoogle}>Ingresar con Google</button>
        </div>
    )
}
