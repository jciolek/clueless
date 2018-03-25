function* defaultIdGenerator() {
  let currId = 1;

  while (true) {
    yield currId;
    currId += 1;
  }
}

function createAutoIdMiddleware({ idIterator = defaultIdGenerator() } = {}) {
  return () => (next) => (action) => {
    let newAction = action;
    let { payload: { id } = {} } = action;
    const { meta: { autoid: isAutoId = false } = {} } = action;

    if (isAutoId && id === undefined) {
      ({ value: id } = idIterator.next());
      newAction = {
        ...action,
        payload: {
          ...action.payload,
          id
        }
      };
    }

    return next(newAction);
  };
}

export default createAutoIdMiddleware;
