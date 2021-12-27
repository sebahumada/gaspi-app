
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBV--gtqVSr2LgwsOAi5R7fbVxFifcvhHI",
    authDomain: "react-testing-2b477.firebaseapp.com",
    projectId: "react-testing-2b477",
    storageBucket: "react-testing-2b477.appspot.com",
    messagingSenderId: "128036532806",
    appId: "1:128036532806:web:a0fed7f9d3c5ab14491047"
  };


  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);


  