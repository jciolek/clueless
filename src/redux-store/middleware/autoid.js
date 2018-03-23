import _ from 'lodash';

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

    if (
      _.get(action, 'meta.autoid') &&
      _.get(action, 'payload.id') === undefined
    ) {
      const { value: id } = idIterator.next();
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
