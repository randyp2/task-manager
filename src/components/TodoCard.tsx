import React, { useEffect, useReducer, useRef, useState } from "react";
import { Actions, Particles, ToDo } from "../model";
import "./styles.css";

// Icons
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";




interface Props {
    task: ToDo; 
    state: ToDo[];
    dispatch: React.Dispatch<Actions>; // For deleting tasks
}

const TodoCard:React.FC<Props> = ({task, state, dispatch}) => {
    
    // const [state, dispatch] = useReducer(taskReducer, tasks);

    // --- react hooks for edit task
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task.todo);


    // Highlight the task to edit
    useEffect(() => {
        if(inputRef.current && isEdit) {

            // // Highligh the text
            // inputRef.current.select();

            // Show keyboard caret
            inputRef.current.focus();
            
        }
    }, [isEdit]);

    // --- react hooks for deletion animation
    const formRef = useRef<HTMLFormElement>(null);
    const [particles, setParticles] = useState<Particles[]>([]);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const NUM_PARTICLES:number = 1000;
    const PARTICLE_COLORS:string[] = ["#1d1d1d", "#393939", "#4f4f4f"];

    /* ---- HANDLE VAPORIZING PARTICLE EXPLOSION ANIMATION ---- */
    
    const explode = () => {
        const todoCard:HTMLFormElement | null = formRef.current;
        if(!todoCard) return;
        const rect:DOMRect = todoCard.getBoundingClientRect();
        const newParticles:Particles[] = [];

        for(let i = 0; i < NUM_PARTICLES; ++i) {
            
            // Adjust "left" & "top" properties
            // Set the particle into a random position inside the todoCard
            const left:string = `${rect.left + Math.random() * rect.width}px`;
            const top:string = `${rect.top + Math.random() * rect.height}px`;

            const angle:number = Math.random() * (2 * Math.PI); // Generate a random angle within a circle
            const distance:number = Math.random() * 100; // Travel at most 100px out

            // Generate Cartesian coordinates (points on a 2d plane) 
            // Used for translation (translate right left, up down) that many pixels
            const x:string = `${Math.cos(angle) * distance}px`; // X distance covered (px)
            const y:string = `${Math.sin(angle) * distance}px`; // Y distance covered (px)
            
            newParticles.push({
                id: Date.now() + i,
                left,
                top,
                x,
                y
            });
        }

        setParticles(newParticles);


        // Delete the particles after 1 second (after animation)
        setTimeout(() => {
            setParticles([]);
        }, 1000);


    };

    // Edit the task and update tasks array
    const handleEdit = (e:React.FormEvent<EventTarget>, id:number) => {

        e.preventDefault(); // Prevent page from refreshing 
        
        // If edited task is not empty or only spaces
        if(editTask.trim().length !== 0){
            dispatch({type:"edit", payload: {id: task.id, newTask: editTask}});
        }else {setEditTask(task.todo);}

        setIsEdit(false); // Finish editing    
    }

    // Remove the task from the tasks array
    const handleDelete = (id:number) => dispatch({type: "delete", payload: task.id});
        
    // Update the isdone property
    const handleDone = (id:number) => !task.isDone ? 
    dispatch({type: "done", payload: id}) : dispatch({type: "undone", payload: id});
    

    return (
        <>
        <form className={`todoCard ${isDeleting ? "todoCard--delete" : ""}`} 
        ref={formRef}
        onSubmit={(e) => handleEdit(e, task.id)}>

            
            {
                isEdit ? (
                    <input 
                    ref={inputRef}
                    className="todoCard--text"
                    id="todoCard--input"
                    type="text"
                    placeholder="Edit task"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}/>

                    
                ): (
                    task.isDone ? (
                        <s className="todoCard--text">{task.todo}</s>
                    ) : (
                        <span className="todoCard--text">{task.todo}</span>
                    )
                )

            }
            



            <div className="todoCard--icons">
                <span className="icon"> 
                    {
                        !isEdit ? (
                            <MdEdit className="icon--animation" color="white" 
                            onClick={() => {
                                if(!isEdit && !task.isDone) setIsEdit(true); 
                                // ERROR: Component may not be mounted so inputRef.current == null
                                // if(inputRef.current) {
                                //     inputRef.current.select();
                                //     console.log("SELECTED!");
                                // }
                            }}/> 
                        ) : (
                            <ImCancelCircle className="icon--animation" 
                            color="white" 
                            onClick={() => {
                                setIsEdit(false);
                                setEditTask(task.todo);
                            }} />
                        )
                    }



                    
                </span>

                <span className="icon"> 
                    <MdDeleteForever className="icon--animation" color="white" onClick={() => {
                        setIsDeleting(true);
                        explode();

                        setTimeout(() => {
                            handleDelete(task.id);
                          }, 1000);

                    }}/> 
                </span>

                <span className="icon"> 
                    {
                        !task.isDone ? (
                            <MdDone className="icon--animation" color="white" onClick={() => handleDone(task.id)}/> 
                        ) : (
                            <ImCancelCircle className="icon--animation" color="white" onClick={() => handleDone(task.id)} />
                        )
                    }
                    
                </span>
            </div>
        </form>
        
        {/* Render the particles list */}
    
        {particles.map((particle) => (
            <span
            key={particle.id}
            className="delete-particle"
            style={{
                left: particle.left,
                top: particle.top,
                "--x": particle.x, // Custom properties
                "--y": particle.y, // Custom properties
                color: PARTICLE_COLORS[Math.floor(Math.random() * 3)],
            } as React.CSSProperties}>
                •
            </span>
        ))}
        

        </>
        

    );
};

export default TodoCard;