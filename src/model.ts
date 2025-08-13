// Typescript file to hold interface definitions - Helps w/ Reusability

// Properties of each ToDo task
export interface ToDo {
    id: number; 
    todo: string;
    isDone: boolean; 
}

// Properties of particles
export interface Particles {
    id: number;
    left: string;
    top: string;
    x: string;
    y: string;
}

// TodoCard Reducer function 
export type Actions = 
    | {type: "add"; payload: string} // Accepts task descript to add
    | {type: "done"; payload: number} // Accepts task id to edit
    | {type: "undone"; payload: number} // Undos the done icon
    | {type: "delete"; payload: number} // Accepts task id to remove
    | {type: "edit"; payload: {id: number; newTask: string}}; // Accepts an instance of object that has a todoId and todoTask