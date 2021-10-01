import { Employee } from "../types";

export function convertListToLookup(node: any) {
  const subordinates = node.subordinates.reduce((obj: any, item: any) => {
    obj[item.uniqueId] = convertListToLookup(item)
    return obj;
  }, {})
  return {...node, subordinates}
}

export function convertLookupToList(node: any) {
  const subordinates: Employee[] = Object.values(node.subordinates).map(convertLookupToList)
  return {...node, subordinates}
}