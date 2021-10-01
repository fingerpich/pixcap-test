
import { EmployeeSupervisor } from "../types"

/**
* @param node node in a tree
* @param employeeID searching employee id
* @param supervisor parent node
*/
export function findEmployeeInTree(node, employeeID, supervisor): EmployeeSupervisor {
  if (node.subordinates[employeeID]) {
    return {employee: node.subordinates[employeeID], supervisor: node}
  } else {
    for(let i in node.subordinates) {
      const employee = node.subordinates[i]
      const foundedEmployee: EmployeeSupervisor = findEmployeeInTree(employee, employeeID, node);
      if (foundedEmployee) {
        return foundedEmployee;
      }
    }
  }
}
