import {
  createValidator,
  combineValidators,
  createError,
} from '@/redux-store/middleware/validator';
import errors from '@/redux-store/errors';
import type { AnyAction } from 'redux';
import type { StateType } from '@/redux-store/types';
import { actions } from './slice';
import { getPiecesIds, getPiecesGroupIds } from './selectors';
import Piece from './piece';

function validateIdExists(state: StateType, action: AnyAction) {
  const { id } = action.payload;

  return getPiecesIds(state).indexOf(id) === -1
    ? createError(action, errors.PIECES.PARAMS.INVALID_ID)
    : action;
}

function validateIdAvailable(state: StateType, action: AnyAction) {
  const { name, groupId } = action.payload;
  const piece = Piece({ name, groupId });

  return getPiecesIds(state).indexOf(piece.id) !== -1
    ? createError(action, errors.PIECES.PARAMS.INVALID_ID_AVAILABLE)
    : action;
}

function validateGroupIdExists(state: StateType, action: AnyAction) {
  const groupIds = getPiecesGroupIds(state);
  const { groupId } = action.payload;

  return groupIds.indexOf(groupId) === -1
    ? createError(action, errors.PIECES.PARAMS.INVALID_GROUP)
    : action;
}

function validateNameType(state: StateType, action: AnyAction) {
  const { name } = action.payload;

  return typeof name !== 'string'
    ? createError(action, errors.PIECES.PARAMS.INVALID_NAME_TYPE)
    : action;
}

function validateNameValue(state: StateType, action: AnyAction) {
  const { name } = action.payload;

  return name === ''
    ? createError(action, errors.PIECES.PARAMS.INVALID_NAME_VALUE)
    : action;
}

function validateGameNotStarted(state: StateType, action: AnyAction) {
  return state.game.isStarted
    ? createError(action, errors.PIECES.GENERAL.GAME_IS_STARTED)
    : action;
}

const validator = createValidator({
  [actions.add.type]: combineValidators(
    validateGameNotStarted,
    validateGroupIdExists,
    validateIdAvailable,
    validateNameType,
    validateNameValue
  ),
  [actions.replace.type]: combineValidators(
    validateGameNotStarted,
    validateIdExists,
    validateNameType,
    validateNameValue
  ),
  [actions.remove.type]: combineValidators(
    validateGameNotStarted,
    validateIdExists
  ),
});

export default validator;
