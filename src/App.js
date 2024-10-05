import './style.css';
import { useState, useEffect } from 'react';

import { db } from './config.js';
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot
 } from 'firebase/firestore';


function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const unSub = onSnapshot(collection(db, "tarefas"), (snapshot) => {
        let listaTarefas = [];

        snapshot.forEach((doc) => {
          listaTarefas.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
          })
        })

        setTarefas(listaTarefas);

      })

      
    }

    loadTarefas();
  }, [])

  async function handleAdd() {

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefa,
    })
    .then(() => {
      setTarefa('');
      alert('Tarefa adicionada com sucesso!');
    })
    .catch(((error) => {
      alert('Erro ao adicionar uma nova tarefa!');
      console.log('error: ', error);
    }))
  }

  async function concluirTarefa(id, tarefa) {
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)
    .then(() => {
      alert(`Parabéns por concluir a tarefa ${tarefa}!`)
    })
    .catch((error) => {
      alert('Erro ao excluir a tarefa!');
      console.log('error: ', error);
    })
  }


  return (
    <div className='container-maior'>
      <div className='container-tarefas'>
        <h1 className='titulo'>TO DO LIST</h1>

        <div className='inputs'>
          <input
          type='text'
          placeholder='Digite uma tarefa'
          value={tarefa}
          onChange={(e) => {
            setTarefa(e.target.value);
          }}
          />
          <button onClick={handleAdd}>Adicionar</button>

        </div>
     
        <div className='tarefas'>
          <ul className='container-lista'>
            {tarefas.map((task) => {
              return (
                <div className='lista-tarefas'>
                  <li
                  className='tarefa'
                  key={task.id}
                  >
                    {task.tarefa}
                  </li>
                  <button onClick={() => {
                    concluirTarefa(task.id, task.tarefa)
                  }}>
                    Concluída
                  </button>

                </div>
                  
                  
              )     
              
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
