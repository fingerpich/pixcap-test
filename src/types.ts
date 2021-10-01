export interface Employee { 
  uniqueId: number; 
  name: string; 
  subordinates: any; 
}

export interface EmployeeSupervisor { 
  employee?: Employee; 
  supervisor?: Employee; 
}

export interface MoveAction { 
  employeeID: number; 
  prevSupervisorID: number; 
  nextSupervisorID: number; 
  employeeSubordinatesIds: string[]; 
}

export interface IEmployeeOrgApp { 
  ceo: Employee; 
  /** 
  * Moves the employee with employeeID (uniqueId) under a supervisor (another employee) that has supervisorID (uniqueId). 
  * E.g. move Bob (employeeID) to be subordinate of Georgina (supervisorID). * @param employeeID 
  * @param supervisorID 
  */ 
  move(employeeID: number, supervisorID: number, isRedo?: boolean): void; 
  /** 
  * Undo last move action 
  */ 
  undo(): void; 
  /** 
  * Redo last undone action 
  */ 
  redo(): void; 
}  