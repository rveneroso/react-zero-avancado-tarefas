import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


// const firebaseConfig = {
//   apiKey: "AIzaSyBx9WFTQC2XIi-4xE1adOMQYaxEEeshZFg",
//   authDomain: "cursoapp-f0398.firebaseapp.com",
//   projectId: "cursoapp-f0398",
//   storageBucket: "cursoapp-f0398.appspot.com",
//   messagingSenderId: "394026650841",
//   appId: "1:394026650841:web:2072c9f66868dfd41ac2c8",
//   measurementId: "G-JST0NMT5EC"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBIONpj7MFS-QoXOT8s-5LerAAHeKA9ITg",
  authDomain: "react-z-avancado-firebaseapp.firebaseapp.com",
  projectId: "react-z-avancado-firebaseapp",
  storageBucket: "react-z-avancado-firebaseapp.appspot.com",
  messagingSenderId: "535586999980",
  appId: "1:535586999980:web:cbadd0aa4b7c6c78ca1909",
  measurementId: "G-JLSWL7DDMH"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };