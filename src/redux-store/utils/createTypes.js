function createTypes(actionMap, ns = '') {
  if (typeof actionMap !== 'object' || Array.isArray(actionMap)) {
    return ns;
  }

  const types = {};

  Object.keys(actionMap).forEach((key) => {
    const nsKey = ns ? `${ns}/${key}` : key;

    types[key] = createTypes(actionMap[key], nsKey);
  });

  return types;
}

export default createTypes;
