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

function metaCreator(payload, meta) {
  return meta;
}

// Create action map digestible by createActions
// and add default metaCreator.
// The assumption is that each action takes only two params: (payload, meta).
function createActionMap(typeIds) {
  return typeIds.reduce((result, item) => {
    if (typeof item === 'object') {
      Object.keys(item).forEach((id) => {
        Object.assign(result, {
          [id]: [].concat(item[id], metaCreator).slice(0, 2),
        });
      });
      Object.assign(result);
    } else {
      Object.assign(result, { [item]: [undefined, metaCreator] });
    }

    return result;
  }, {});
}

export { createTypes, createActionMap, metaCreator };
