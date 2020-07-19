import type { Middleware, AnyAction } from 'redux';

function* defaultIdGenerator(): Generator<string, string, undefined> {
  let currId = 1;

  while (true) {
    yield String(currId);
    currId += 1;
  }
}

type Props = {
  idIterator?: Iterator<string>;
};

function createAutoIdMiddleware({
  idIterator = defaultIdGenerator(),
}: Props = {}): Middleware {
  return () => (next) => (action: AnyAction) => {
    let newAction = action;
    const { payload: { id = undefined } = {} } = action;
    const { meta: { autoid: isAutoId = false } = {} } = action;

    if (isAutoId && id === undefined) {
      const { value: autoId } = idIterator.next();

      newAction = {
        ...action,
        payload: {
          ...action.payload,
          id: autoId,
        },
      };
    }

    return next(newAction);
  };
}

export default createAutoIdMiddleware;
