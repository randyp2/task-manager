import React, { useRef } from "react";
import './styles.css';

// Usestate props
interface Props {
    task: string; // Task being inputted
    setTask: React.Dispatch<React.SetStateAction<string>>; // Setter function for task
    handleAdd: (e: React.FormEvent<EventTarget>) => void;
};

const InputField:React.FC<Props> = ({task, setTask, handleAdd}) => {
    
    const inputRef = useRef<HTMLInputElement>(null); // ref to access input DOM element

    return (
        <form className="input" onSubmit={(e) => {
            handleAdd(e);
            if(inputRef.current) inputRef.current.blur(); // unfocuses on element
        }}>
            {/* Follow bem convention naming */}
            <input 
            ref={inputRef}
            id="input__search"  
            type="text" 
            placeholder="Enter task"
            value={task} // The field should always match the task state
            onChange = {
                (e) => {
                    setTask(e.target.value);
                }
            }
            />

            <button className="input__submit-btn" type="submit">Go</button>
        </form>
    );
}


export default InputField;