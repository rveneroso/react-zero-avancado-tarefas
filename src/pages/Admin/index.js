import './admin.css';
import { useState, useEffect} from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from '@firebase/auth';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where
} from 'firebase/firestore';

export default function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState({});

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
            if(userDetail) {
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas");
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userId: doc.data().userId
                        })
                    })
                    console.log('lista', lista);
                    setTarefas(lista);
                })
            } else {
                console.log('Sem userDetail para exibir');
            }
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
            created: new Date(),
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