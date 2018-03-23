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

function createActionMap(typeIds) {
  const actionMap = {};

  typeIds.forEach((id) => {
    if (typeof id === 'object') {
      Object.assign(actionMap, id);
    } else {
      actionMap[id] = undefined;
    }
  });

  return actionMap;
}

export { createTypes, createActionMap };
