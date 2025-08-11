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