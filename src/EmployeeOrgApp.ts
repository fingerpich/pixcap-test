import History from "./History"
import { EmployeeSupervisor, Employee, IEmployeeOrgApp } from "./types"
import { findEmployeeInTree } from "./find-in-tree"


export default class EmployeeOrgApp implements IEmployeeOrgApp{
  ceo: Employee;
  history: History;

  /** 
  * initializes ceo parameter with organizationChartTree
  * @param organizationChartTree
  */ 
  constructor(organizationChartTree: Employee) {
    this.ceo = organizationChartTree;
    this.history = new History(this.ceo);
  }

  /** 
  * Finds the employee by employeeID (uniqueId)
  * searches the tree using a recursive function
  * @param employeeID 
  */ 
  findEmployee(employeeID): EmployeeSupervisor {
    return findEmployeeInTree(this.ceo, employeeID, null) || {};
  }

  /** 
  * Moves the employee with employeeID (uniqueId) under a supervisor (another employee) that has supervisorID (uniqueId). 
  * E.g. move Bob (employeeID) to be subordinate of Georgina (supervisorID). * @param employeeID 
  * @param supervisorID 
  */ 
  move(employeeID: number, supervisorID: number): void {
    const { supervisor, employee } = this.findEmployee(employeeID)
    const { employee: nextSupervisor } = this.findEmployee(supervisorID)

    if (!employee) { throw `There is not any employee with ID ${employeeID}` }
    if (!supervisor) { throw `According to the given algorithem we are not able to move the root node` }
    if (!nextSupervisor) { throw `There is not any supervisor with ID ${employeeID}` }

    const index = supervisor.subordinates.findIndex(emp => emp.uniqueId === employeeID)
    supervisor.subordinates.splice(index, 1); // removes employee from previous list
    supervisor.subordinates = [ ...supervisor.subordinates, ...employee.subordinates ]; //adds child subordinates to the parent subordinates 
    nextSupervisor.subordinates.push(employee);
    employee.subordinates = [];

    this.history.add(this.ceo);
  };

  /** 
  * Undo last move action 
  */ 
  undo(): void {
    this.ceo = this.history.undo()
  };

  /** 
  * Redo last undone action 
  */ 
  redo(): void {
    this.ceo = this.history.redo()
  };
}