function createValidatorMiddleware(validator) {
  return (store) => (next) => (action) => {
    const result = validator(store.getState(), action);

    return result.error ? result : next(result);
  };
}

function createValidator(validatorMap) {
  return function validator(state, action) {
    const { [action.type]: actionValidator } = validatorMap;

    return actionValidator ? actionValidator(state, action) : action;
  };
}

function combineValidators(...validators) {
  return function validator(state, action) {
    const { length } = validators;
    let result = action;

    for (let i = 0; i < length; i += 1) {
      result = validators[i](state, result);
      if (result.error === true) {
        break;
      }
    }

    return result;
  };
}

function createError(action, error) {
  return {
    ...action,
    error: true,
    payload: new Error(error)
  };
}

export default createValidatorMiddleware;
export { createValidator, combineValidators, createError };
