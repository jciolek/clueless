import { AnyAction, Middleware } from 'redux';
import type {
  ValidatorType,
  ErrorActionType,
  ValidatorMapType,
} from '@/redux-store/types';

function isErrorAction(
  action: AnyAction | ErrorActionType
): action is ErrorActionType {
  return action.error === true;
}

function createValidatorMiddleware<State>(
  validator: ValidatorType<State>
): Middleware {
  return (store) => (next) => (action) => {
    const result = validator(store.getState(), action);

    return isErrorAction(result) ? result : next(result);
  };
}

function createValidator<State>(
  validatorMap: ValidatorMapType<State>
): ValidatorType<State> {
  return function validator(state, action) {
    const { [action.type]: actionValidator } = validatorMap;

    return actionValidator ? actionValidator(state, action) : action;
  };
}

function combineValidators<State>(
  ...validators: Array<ValidatorType<State>>
): ValidatorType<State> {
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

function createError(action: AnyAction, error: string): ErrorActionType {
  return {
    ...action,
    error: true,
    payload: new Error(error),
  };
}

export default createValidatorMiddleware;
export { createValidator, combineValidators, createError };
