import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { ToDo } from './model';
import TodoList from './components/TodoList';

// React.FC = functional component type
const App:React.FC = () => {

  // usestate hook for current inputted task
  const [task, setTask] = useState<string>(""); 
  // usestate hook for all tasks
  const [tasks, setTasks] = useState<ToDo[]>([]);

  const handleAdd = (e:React.FormEvent<EventTarget>) => {
    e.preventDefault(); // Prevent from refreshing on submit
    
    const toAdd:ToDo = {
      id: Date.now(), // Creating unique randomized ids
      todo: task,
      isDone: false
    };
    
    if(task.trim().length !== 0) {
      setTasks((prevTasks) => [...prevTasks, toAdd]);
      setTask(""); // Reset input field
    }
  };



  return (
  
    <div className="App">
      <span className="heading">taskify</span>

      {/* Call child components */ }
       <InputField task={task} setTask={setTask} handleAdd={handleAdd}/> {/* Displays input bar for todo task */}
       <TodoList tasks={tasks} setTasks={setTasks}/> {/*Displays lists of todo tasks*/}

       
    </div>

    
  );
}

export default App;
