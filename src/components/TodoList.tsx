import React from "react";
import "./styles.css"
import { Actions, ToDo } from "../model";
import TodoCard from "./TodoCard";

interface Props {
    state: ToDo[];
    dispatch: React.Dispatch<Actions>;
}

const TodoList:React.FC<Props> = ({state, dispatch}) => {
    return (
        <div className="tasks">
            
                {state.map(todo => (
                    <TodoCard key= {Date.now() - todo.id} task={todo} state={state} dispatch={dispatch} />
                     
                ))}
            
        </div>
    );
}

export default TodoList;