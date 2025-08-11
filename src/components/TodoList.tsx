import React from "react";
import "./styles.css"
import { ToDo } from "../model";
import TodoCard from "./TodoCard";

interface Props {
    tasks: ToDo[];
    setTasks: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const TodoList:React.FC<Props> = ({tasks, setTasks}) => {
    return (
        <div className="tasks">
            
                {tasks.map(todo => (
                    <TodoCard key= {Date.now() - todo.id} task={todo} tasks={tasks} setTasks={setTasks} />
                     
                ))}
            
        </div>
    );
}

export default TodoList;