export function convertListToLookup(node) {
  const subordinates = node.subordinates.reduce((obj, item) => {
    obj[item.uniqueId] = convertListToLookup(item)
    return obj;
  }, {})
  return {...node, subordinates}
}