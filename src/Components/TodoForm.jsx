import React, { useState } from 'react'
import { useTodo } from '../Contexts/TodoContext';
//now the TodoForm will addTodo so will will get its functionality from context 
function TodoForm() {
    const[todo,setTodo] = useState("")
    const {addTodo} = useTodo()

   const add = (e)=>{
     e.preventDefault()
     if(!todo) return 

     addTodo({todo:todo,completed:false})
     //we pass object as todos array except object as elemnts and not passed
     //id beacuse it is already handled in addTodo
     setTodo("")
     // Clear the input field after adding
   }
  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default TodoForm;