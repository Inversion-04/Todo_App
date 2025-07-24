import { useState, useEffect } from 'react'
import {TodoProvider} from './Contexts'
import './App.css'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {
  const[todos,setTodos] = useState([])
  
  const addTodo = (todo)=>{
    setTodos((prev)=>[...prev,{id:Date.now(),...todo}])
  }

  const updateTodo = (id,todo)=>{
    setTodos((prev)=>prev.map((eachtodo)=> (eachtodo.id === id ? todo : eachtodo)))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id)=>{
     setTodos((prev)=>prev.map((todo)=>(todo.id === id ? {...todo,completed : !todo.completed} : todo)))
  }

   //if application loads then 
  useEffect(()=>{
      // Get the stored todos from localStorage
     const todos = JSON.parse(localStorage.getItem("todos"))
     //return all values with key todos
     // JSON.parse restores the original array/object structure from the string value in localStorage



     if(todos && todos.length>0){
        setTodos(todos) 
     }
      // If todos exist and the array is not empty, set it to state
  },[]);

  //now we want if anychange made in todos then the value must be added in localStorage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])



  return (
  <TodoProvider value = {{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                      {todos.map((todo) => (
                        <div key={todo.id} className='w-full'>
                         <TodoItem todo={todo}></TodoItem>
                        </div>
                      ))}
                       
                    </div>
                </div>
            </div>

  </TodoProvider>

  )
}

export default App
