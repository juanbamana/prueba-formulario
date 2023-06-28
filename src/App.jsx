import './App.css'
import { useState, useEffect } from 'react'
import {Formulario} from './components/Formulario'
import { Todos } from './components/Todos'


const initialState = JSON.parse(localStorage.getItem("todos")) || [];
function App() {


  const [todos, setTodos] = useState(initialState)

    // Solo utilizamos un useEffect para actualizar LocalStorage
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const addTodo = (todo) =>{

    setTodos([...todos, todo])

  }

  const deleteTodo = (id) =>{

    const newArray = todos.filter(todo =>todo.id !== id)
      setTodos(newArray)

  
  }
  const updateTodo = (id) =>{

    const newArray = todos.map((todo) =>{

      if(todo.id === id){
        todo.state = !todo.state
      }
      return todo

    })
setTodos(newArray)
  }


  const orderTodos = (arrayTodos) => {
    return arrayTodos.sort((a, b) => {
      if (a.priority === b.priority) {
        return 0;
      }
      if (a.priority) {
        return -1;
      }
      if (!a.priority) {
        return 1;
      }
    });
  };




  return (

    <div className='container mb-2'>
      <Formulario addTodo={addTodo}  />
      <Todos todos={orderTodos(todos)} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
    </div>

  )
}

export default App
