import React, { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const isFirstRun = useRef(true);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, [])

  useEffect(() => {
    if (isFirstRun.current) {
      console.log("Skipping first save to localStorage...");
      isFirstRun.current = false;
      return;
    }

    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    // "...todos" (three dots) is a spread operator which copies all elements from todos[] to new array 

    setTodo("")
  }

  const handleCheckBox = (id) => {
    const index = todos.findIndex(item => item.id === id)

    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });

    setTodos(newTodos);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });

    setTodos(newTodos);
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 rounded-xl p-6 my-8">
        <h2 className='font-bold text-xl text-center'>iTask manager All Todos at one place</h2>
        <div className="mb-2 mt-4">
          <h2 className='font-bold text-center'>Add a Todo</h2>
          <div className="add-input flex gap-4 justify-center">
            <input onChange={handleChange} value={todo} type="text" className='w-1/2 rounded-sm p-2' />
            <button onClick={handleAdd} className='bg-violet-500 hover:bg-violet-700 py-1 px-2 rounded-lg text-sm font-bold'>Save</button>
          </div>
        </div>

        <div className='flex gap-3 mt-4 w-[100%] justify-center'>
          <input onChange={toggleFinished} type="checkbox" name="Show todos" checked={showFinished} />
          <p>Show All Todos.</p>
        </div>
        <h2 className="font-bold text-center text-lg mb-8">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos found...</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-10 justify-center w-[100%] my-4">
              <div className='flex gap-3 w-[60%]'>
                <input checked={item.isCompleted} onChange={() => handleCheckBox(item.id)} type="checkbox" id="" />
                <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
              </div>
              <div className='buttons flex gap-3 items-center'>
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-500 hover:bg-violet-700 py-1 px-2 rounded-lg text-sm font-bold h-8'><FaEdit />
                  </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-500 hover:bg-violet-700 py-1 px-2 rounded-lg text-sm font-bold h-8'><MdDelete />
                  </button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
