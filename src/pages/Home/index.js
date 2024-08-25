import { useState } from 'react';
import './home.css';

import { Link } from 'react-router-dom';

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

export default function Home(){

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate();

  /*
    * A chamada à função handleLogin é feita como resultado da submissão do formulário. Por isso o
    * parâmetro 'e' é passado à função.
  */
  async function handleLogin(e){
    console.log('Fazendo login com ', email, password);
    e.preventDefault();
    if(email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true})
      })
      .catch((error) => {
        console.log("ERRO AO FAZER O LOGIN", error)
      })
    } else {
      alert("Preencha todos os campos");
    }

  }

  return(
    <div className='home-container'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <form className='form' onSubmit={handleLogin}>
        <input
          type="text"
          placeholder='Digite seu email...'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder='*******'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">Acessar</button>
      </form>

      <Link className='button-link' to="/register">
        Não possui uma conta? Cadastre-se.
      </Link>
    </div>
  )
}