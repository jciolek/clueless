import {
  createValidator,
  combineValidators,
  createError
} from '../redux-store/middleware/validator';
import { types } from '../redux-store/actions';
import errors from '../redux-store/errors';
import { getPlayersIds } from './selectors';
import { getPiecesIds } from '../pieces/selectors';

function validateName(state, action) {
  const { name } = action.payload;

  return typeof name !== 'string'
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_NAME)
    : action;
}

function validateId(state, action) {
  const { id } = action.payload;

  return getPlayersIds(state).indexOf(id) === -1
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_ID)
    : action;
}

function validateDefinedId(state, action) {
  return action.payload.id === undefined
    ? createError(action, errors.PLAYERS.ADD.MISSING_ID)
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
  [types.PLAYERS.ADD]: combineValidators(
    validateGameNotStarted,
    validateDefinedId,
    validateNewId,
    validateName
  ),
  [types.PLAYERS.RENAME]: combineValidators(validateName, validateId),
  [types.PLAYERS.REMOVE]: combineValidators(validateGameNotStarted, validateId),
  [types.PLAYERS.UPDATE]: combineValidators(
    validateGameIsStarted,
    validateId,
    validatePieceId,
    validatePieceStatus
  )
});

export default validator;
