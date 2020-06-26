import {
  createValidator,
  combineValidators,
  createError,
} from '@/redux-store/middleware/validator';
import actions from '@/redux-store/actions';
import errors from '@/redux-store/errors';
import { getPiecesIds } from '@/pieces/selectors';
import { getPlayersIds } from './selectors';

function validateNameType(state, action) {
  const { name } = action.payload;

  return typeof name !== 'string'
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_TYPE)
    : action;
}

function validateNameValue(state, action) {
  const { name } = action.payload;

  return name === ''
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_VALUE)
    : action;
}

function validateId(state, action) {
  const { id } = action.payload;

  return getPlayersIds(state).indexOf(id) === -1
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_ID)
    : action;
}

function validateIdType(state, action) {
  return typeof action.payload.id !== 'string'
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_ID_TYPE)
    : action;
}

function validateNewId(state, action) {
  return getPlayersIds(state).indexOf(action.payload.id) !== -1
    ? createError(action, errors.PLAYERS.ADD.EXISTING_ID)
    : action;
}

function validatePieceId(state, action) {
  const { pieceId } = action.payload;

  return getPiecesIds(state).indexOf(pieceId) === -1
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_PIECE_ID)
    : action;
}

function validatePieceStatus(state, action) {
  const { status } = action.payload;

  return typeof status !== 'boolean'
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_STATUS)
    : action;
}

function validateGameNotStarted(state, action) {
  return state.game.isStarted
    ? createError(action, errors.PLAYERS.GENERAL.GAME_IS_STARTED)
    : action;
}

function validateGameIsStarted(state, action) {
  return !state.game.isStarted
    ? createError(action, errors.PLAYERS.GENERAL.GAME_NOT_STARTED)
    : action;
}

const validator = createValidator({
  [actions.players.add]: combineValidators(
    validateGameNotStarted,
    validateIdType,
    validateNewId,
    validateNameType,
    validateNameValue
  ),
  [actions.players.rename]: combineValidators(
    validateIdType,
    validateId,
    validateNameType,
    validateNameValue
  ),
  [actions.players.remove]: combineValidators(
    validateGameNotStarted,
    validateIdType,
    validateId
  ),
  [actions.players.update]: combineValidators(
    validateGameIsStarted,
    validateIdType,
    validateId,
    validatePieceId,
    validatePieceStatus
  ),
});

export default validator;
