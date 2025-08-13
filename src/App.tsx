import React, { useReducer, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Actions, ToDo } from './model';
import TodoList from './components/TodoList';




const taskReducer = (state:ToDo[], action:Actions):ToDo[] => {
    switch(action.type) {
        case "add":

          // Return previous state including newly added task
          if(action.payload.trim().length !== 0) {
            console.log("This is executing!");
            return [...state, {id: Date.now(), todo: action.payload, isDone: false}]
          }
          break;

        case "done":
            console.log("done reducer executing");
            return state.map(task => (
                task.id === action.payload ? {...task, isDone:true} : task
            ));
        
        case "undone":
            return state.map(task => (
              task.id === action.payload ? {...task, isDone: false} : task));

        case "delete":
            return state.filter(task => task.id !== action.payload);

        case "edit":
            // If newTask is not empty or has only spaces
            //  - return newArray with new task
            if(action.payload.newTask.trim().length !== 0) 
                return state.map((task) => (
                    task.id === action.payload.id ? {...task, todo:action.payload.newTask} : task
                ));
            break;
        default: 
            return state;
        
    }
    return state;
}

// React.FC = functional component type
const App:React.FC = () => {

  // usestate hook for current inputted task
  const [task, setTask] = useState<string>(""); 
  // usestate hook for all tasks
  // const [tasks, setTasks] = useState<ToDo[]>([]);

  const [state, dispatch] = useReducer(taskReducer, []);

  const handleAdd = (e:React.FormEvent<EventTarget>) => {
    e.preventDefault(); // Prevent from refreshing on submit
    
    const toAdd:ToDo = {
      id: Date.now(), // Creating unique randomized ids
      todo: task,
      isDone: false
    };
    
    if(task.trim().length !== 0) {
      // setTasks((prevTasks) => [...prevTasks, toAdd]);
      dispatch({type: "add", payload: task});
      state.forEach((task)=> console.log(task.todo));
      setTask(""); // Reset input field
    }
  };



  return (
  
    <div className="App">
      <span className="heading">taskify</span>

      {/* Call child components */ }
       <InputField task={task} setTask={setTask} handleAdd={handleAdd} /> {/* Displays input bar for todo task */}
       <TodoList state={state} dispatch={dispatch}/> {/*Displays lists of todo tasks*/}

       
    </div>

    
  );
}

export default App;
