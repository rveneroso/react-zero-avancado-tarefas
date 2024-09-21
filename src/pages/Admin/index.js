import './admin.css';
import { useState, useEffect} from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from '@firebase/auth';
import {
    addDoc,
    collection
} from 'firebase/firestore';

export default function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
        }

        loadTarefas();
    }, [])

    async function handleRegister(e){
        e.preventDefault();
        if(tarefaInput === ''){
            alert('Digite sua tarefa...')
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            create: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            console.log('Tarefa registrada');
            setTarefaInput('');
        })
        .catch((error) => {
            console.log("Erro ao registrar " + error);

        })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    return(
        <div className="admin-container">
            <h1>Minhas Tarefas</h1>
            <form className="form" onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite sua tarefa...'
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />

                <button className="btn-register" type="submit">Registrar Tarefa</button>
            </form>

            <article className="list">
                <p>Estudar javascript e reactjs hoje à noite</p>
                <div>
                    <button>Editar</button>
                    <button className="btn-delete">Concluir</button>
                </div>
            </article>

            <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
    )
}