import {
  createValidator,
  combineValidators,
  createError
} from '../redux-store/middleware/validator';
import { types } from '../redux-store/actions';
import errors from '../redux-store/errors';
import { getPiecesIds, getPiecesGroupIds } from './selectors';
import Piece from './piece';

function validateIdExists(state, action) {
  const { id } = action.payload;

  return getPiecesIds(state).indexOf(id) === -1
    ? createError(action, errors.PIECES.PARAMS.INVALID_ID)
    : action;
}

function validateIdAvailable(state, action) {
  const { name, groupId } = action.payload;
  const piece = Piece({ name, groupId });

  return getPiecesIds(state).indexOf(piece.id) !== -1
    ? createError(action, errors.PIECES.PARAMS.INVALID_ID_AVAILABLE)
    : action;
}

function validateGroupIdExists(state, action) {
  const groupIds = getPiecesGroupIds(state);
  const { groupId } = action.payload;

  return groupIds.indexOf(groupId) === -1
    ? createError(action, errors.PIECES.PARAMS.INVALID_GROUP)
    : action;
}

function validateNameType(state, action) {
  const { name } = action.payload;

  return typeof name !== 'string'
    ? createError(action, errors.PIECES.PARAMS.INVALID_NAME_TYPE)
    : action;
}

function validateNameValue(state, action) {
  const { name } = action.payload;

  return name === ''
    ? createError(action, errors.PIECES.PARAMS.INVALID_NAME_VALUE)
    : action;
}

function validateGameNotStarted(state, action) {
  return state.game.isStarted
    ? createError(action, errors.PIECES.GENERAL.GAME_IS_STARTED)
    : action;
}

const validator = createValidator({
  [types.PIECES.ADD]: combineValidators(
    validateGameNotStarted,
    validateGroupIdExists,
    validateIdAvailable,
    validateNameType,
    validateNameValue
  ),

  [types.PIECES.REPLACE]: combineValidators(
    validateGameNotStarted,
    validateIdExists,
    validateNameType,
    validateNameValue
  ),

  [types.PIECES.REMOVE]: combineValidators(
    validateGameNotStarted,
    validateIdExists
  )
});

export default validator;
