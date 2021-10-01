
import { Employee, EmployeeSupervisor } from "../types"

/**
* @param node node in a tree
* @param employeeID searching employee id
* @param supervisor parent node
*/
export function findEmployeeInTree(node: Employee, employeeID: number): EmployeeSupervisor | undefined {
  if (node.uniqueId === employeeID) {
    return { employee: node }
  }
  if (node.subordinates[employeeID]) {
    return { employee: node.subordinates[employeeID], supervisor: node }
  } else {
    for(let i in node.subordinates) {
      if (node.subordinates.hasOwnProperty(i)) {
        const employee = node.subordinates[i]
        const foundedEmployee = findEmployeeInTree(employee, employeeID);
        if (foundedEmployee) {
          return foundedEmployee;
        }
      }
    }
  }
  return undefined
}
