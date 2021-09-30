
export default class History {
  history: Array<any>;
  pointer: number;

  /** 
  * adds initial state to the history
  * @param initialState 
  */ 
  constructor(initialState) {
    this.history = [];
    this.pointer = -1;
    this.add(initialState);
  }

  /** 
  * Adds a copy of the state to the history
  * @param state 
  */ 
  add(state: any): void {
    const clonedState = JSON.parse(JSON.stringify(state)) // Creates a clone of the state
    if (this.pointer < (this.history.length - 1)) {
      // user had undone some action and created a new state
      // so we remove the next states in the history and then push the new state
      this.history = this.history.slice(0, this.pointer+1)
    }
    this.history.push(clonedState)
    this.pointer++
  };

  /** 
  * undo the last action
  */ 
  undo(): any {
    if (this.pointer > 0) {
      this.pointer--;
    }
    return this.history[this.pointer]
  };
  
  /** 
  * undo the last action
  */ 
  redo(): any {
    if ((this.pointer + 1) < this.history.length) {
      this.pointer++;
    }
    return this.history[this.pointer]
  }
}