// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, setDoc, getFirestore, doc, deleteDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { uuid } from "uuidv4";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export function firebaseConfig(){
    const config = {
        apiKey: "AIzaSyCb2WM23rKvC_SUN-L-wefWCLe34UDRQlo",
        authDomain: "sistema-95474.firebaseapp.com",
        projectId: "sistema-95474",
        storageBucket: "sistema-95474.appspot.com",
        messagingSenderId: "1056755032716",
        appId: "1:1056755032716:web:44d45da970503fafb651a9"
      };

// Initialize Firebase
const app = initializeApp(config);
}

export function firebaseRegistrarUsuario(email,password){
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
        //credenciales.user.
    })
}

export async function firebaseIniciarSesion(email, password){
    try{
        let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    } catch(e){
        return false;
    }
    
    //credenciales.user
    return true;
}

export async function firebaseBuscar(coleccionABuscar){
    let listado = [];
    let consulta = collection(getFirestore(), coleccionABuscar);
    let resultado = await getDocs(consulta);
    resultado.forEach(documento => {
        let objeto = documento.data();
        objeto.id = documento.id;
        listado.push(objeto);
    });
    return listado;
}

export function firebaseCrear(coleccion, objeto){
    objeto.id = v4();
    let referencia = doc(getFirestore(), coleccion, objeto.id);
    setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id){
    await deleteDoc(doc(getFirestore(),coleccion, id));
}