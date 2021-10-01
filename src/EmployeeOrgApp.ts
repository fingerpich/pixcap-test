import History from "./History"
import { EmployeeSupervisor, Employee, IEmployeeOrgApp, MoveAction } from "./types"
import { findEmployeeInTree } from "./utils/find-in-tree"
import { convertListToLookup } from "./utils/convert-to-lookup";


export default class EmployeeOrgApp implements IEmployeeOrgApp{
  ceo: Employee;
  history: History;

  /** 
  * initializes ceo parameter with organizationChartTree
  * @param organizationChartTree
  */ 
  constructor(organizationChartTree: Employee) {
    this.ceo = convertListToLookup(organizationChartTree);
    this.history = new History();
  }

  /** 
  * Finds the employee by employeeID (uniqueId)
  * searches the tree using a recursive function
  * @param employeeID 
  */ 
  findEmployee(employeeID: number): EmployeeSupervisor {
    return findEmployeeInTree(this.ceo, employeeID) || {};
  }

  /** 
  * Moves the employee with employeeID (uniqueId) under a supervisor (another employee) that has supervisorID (uniqueId). 
  * E.g. move Bob (employeeID) to be subordinate of Georgina (supervisorID). * @param employeeID 
  * @param supervisorID 
  */ 
  move(employeeID: number, supervisorID: number, isRedo?:boolean): void {
    if (employeeID == supervisorID) {return}
    const { supervisor, employee } = this.findEmployee(employeeID)
    const { employee: nextSupervisor } = this.findEmployee(supervisorID)

    if (!employee) { throw `There is not any employee with ID ${employeeID}` }
    if (!supervisor) { throw `According to the given algorithem we are not able to move the root node` }
    if (!nextSupervisor) { throw `There is not any supervisor with ID ${employeeID}` }

    delete supervisor.subordinates[employeeID]
    supervisor.subordinates = {...supervisor.subordinates, ...employee.subordinates }; //adds child subordinates to the parent subordinates 
    nextSupervisor.subordinates[employeeID] = employee;
    const employeeSubordinatesIds = Object.keys(employee.subordinates)
    employee.subordinates = {};

    if (!isRedo) {
      const action: MoveAction = {
        employeeID,
        prevSupervisorID: supervisor.uniqueId,
        nextSupervisorID: supervisorID,
        employeeSubordinatesIds
      }
      this.history.add(action)
    }
  };

  /** 
  * Undo last move action 
  */ 
  undo(): void {
    const action = this.history.undo()
    if (action) {
      const { employeeID, prevSupervisorID, employeeSubordinatesIds } = action
      const { employee: curSupervisor } = this.findEmployee(prevSupervisorID)
      const { supervisor: nextSupervisor, employee: movedEmployee } = this.findEmployee(employeeID)
      
      if (!movedEmployee) { throw `There is not any employee with ID ${employeeID}` }
      if (!curSupervisor) { throw `According to the given algorithem we are not able to move the root node` }
      if (!nextSupervisor) { throw `There is not any supervisor with ID ${employeeID}` }

      delete nextSupervisor.subordinates[movedEmployee.uniqueId]
      employeeSubordinatesIds.forEach(id => {
        const item = curSupervisor.subordinates[id]
        if (!item) {
          console.log(id, employeeSubordinatesIds, curSupervisor.subordinates)
        }
        movedEmployee.subordinates[item.uniqueId] = item
        delete curSupervisor.subordinates[id]
      })
      curSupervisor.subordinates[movedEmployee.uniqueId] = movedEmployee
    }
  };

  /** 
  * Redo last undone action
  */ 
  redo(): void {
    const action = this.history.redo()
    if (action) {
      const { employeeID, nextSupervisorID } = action
      this.move(employeeID, nextSupervisorID, true)
    }
  };
}