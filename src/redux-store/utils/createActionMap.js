import metaCreator from './metaCreator';

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

export default createActionMap;
