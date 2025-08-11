/*
* -------- TYPES OF DATA TYPES IN TYPESCRIPT: --------
*/



let age: number | string; // This age can be a number or a string *UNION OPERATOR*

age = "Twenty two";
age = 2;

let voter: boolean;

let hobbies: string[]; // Array of strings
let role: [number, string]; // Tuple of number: string
role = [5, "construction"]; 

/*
* -------- FUNCTIONS IN TYPESCRIPT: --------
*/

// Must include data type for parameters
function printName(name: string): void {  // Void returns undefined
  console.log(name);
}
printName("Randy Pahang II");

// Or enfroce strongly typed functions
// printName2 is a variable that holds a function given the restrictions
let printName2: (name: string) => never; // Never returns nothing


/*
* -------- ALIASES & INTERFACES --------
*/

// ---- ALIASING EXTENSION
type X = {
  a: string;
  b: number;
};

// Y has all the properties defined below include properties of X
// Every object of Y has to include all properties of X and Y
//   - TYPES & INTERFACES can extend off one another
type Y = X & {
  c: string;
  d: number;
}

// ---- INTERFACE
interface Person {
  name: string;
  age?: number;  // Optional property
};

// Instances of an object
// Guy interface extends with Person properties
interface Guy extends Person {
  profession: string;
}

// -- USE REDUCER EXAMPLE
import { useReducer } from "react";

// State we want to modify
type Todo = {
  id: number; 
  todo: string;
  isDone: boolean; 
}

// Type determines what type of change we want to do to the state
// Payload holds additional information to help change the state
type Actions =
  | {type: "add"; payload: string}
  | {type: "edit"; payload: number}
  | {type: "remove"; paylaod: number};

const reducer = (state:Todo[], action) => {
 // ...
}

const reducerExample = () => {
  
  // State is the state we want to modify (could be any data/data strucutre)
  // Dispatch sends an action to the reducer function

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    
  );
  
}