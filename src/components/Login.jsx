import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth } from '../database/firebase-config.js';
import { useNavigate } from 'react-router-dom';




export const Login = () => {

    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider)
    .then( ({user}) => {
        
        localStorage.setItem('displayName', user.displayName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('photoURL', user.photoURL);
        
        navigate('../', { replace: true });
        


    }).catch( (error) =>{
      console.log(error)
    });
}



    return (
        <div>
            <button className='btn btn-primary' onClick={signInWithGoogle}><i class="fab fa-google"></i> Ingresar con Google</button>
        </div>
    )
}
