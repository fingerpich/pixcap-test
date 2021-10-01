import { MoveAction } from "./types";

export default class History {
  history: Array<any>;
  pointer: number;

  /** 
  * adds initial state to the history
  * @param initialState 
  */ 
  constructor() {
    this.history = [];
    this.pointer = -1;
  }

  /** 
  * Adds a copy of the state to the history
  * @param state 
  */ 
  add(state: MoveAction): void {
    if (this.pointer < (this.history.length - 1)) {
      // user had undone some action and created a new state
      // so we remove the next states in the history and then push the new state
      this.history = this.history.slice(0, this.pointer+1)
    }
    this.history.push(state)
    this.pointer++
  };

  /** 
  * undo the last action
  */ 
  undo(): MoveAction {
    if (this.pointer > -1) {
      this.pointer--;
    }
    return this.history[this.pointer+1]
  };
  
  /** 
  * undo the last action
  */ 
  redo(): MoveAction {
    if ((this.pointer + 1) < this.history.length) {
      this.pointer++;
    }
    return this.history[this.pointer]
  }
}