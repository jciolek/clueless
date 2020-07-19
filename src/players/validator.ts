import {
  createValidator,
  combineValidators,
  createError,
} from '@/redux-store/middleware/validator';
import errors from '@/redux-store/errors';
import { getPiecesIds } from '@/pieces/selectors';
import type { StateType } from '@/redux-store/types';
import type { AnyAction } from 'redux';
import { actions } from './slice';
import { getPlayersIds } from './selectors';

function validateNameType(state: StateType, action: AnyAction) {
  const { name } = action.payload;

  return typeof name !== 'string'
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_TYPE)
    : action;
}

function validateNameValue(state: StateType, action: AnyAction) {
  const { name } = action.payload;

  return name === ''
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_NAME_VALUE)
    : action;
}

function validateId(state: StateType, action: AnyAction) {
  const { id } = action.payload;

  return getPlayersIds(state).indexOf(id) === -1
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_ID)
    : action;
}

function validateIdType(state: StateType, action: AnyAction) {
  return typeof action.payload.id !== 'string'
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_ID_TYPE)
    : action;
}

function validateNewId(state: StateType, action: AnyAction) {
  return getPlayersIds(state).indexOf(action.payload.id) !== -1
    ? createError(action, errors.PLAYERS.ADD.EXISTING_ID)
    : action;
}

function validatePieceId(state: StateType, action: AnyAction) {
  const { pieceId } = action.payload;

  return getPiecesIds(state).indexOf(pieceId) === -1
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_PIECE_ID)
    : action;
}

function validatePieceStatus(state: StateType, action: AnyAction) {
  const { status } = action.payload;

  return typeof status !== 'boolean'
    ? createError(action, errors.PLAYERS.PARAMS.INVALID_STATUS)
    : action;
}

function validateGameNotStarted(state: StateType, action: AnyAction) {
  return state.game.isStarted
    ? createError(action, errors.PLAYERS.GENERAL.GAME_IS_STARTED)
    : action;
}

function validateGameIsStarted(state: StateType, action: AnyAction) {
  return !state.game.isStarted
    ? createError(action, errors.PLAYERS.GENERAL.GAME_NOT_STARTED)
    : action;
}

const validator = createValidator({
  [actions.add.type]: combineValidators(
    validateGameNotStarted,
    validateIdType,
    validateNewId,
    validateNameType,
    validateNameValue
  ),
  [actions.rename.type]: combineValidators(
    validateIdType,
    validateId,
    validateNameType,
    validateNameValue
  ),
  [actions.remove.type]: combineValidators(
    validateGameNotStarted,
    validateIdType,
    validateId
  ),
  [actions.update.type]: combineValidators(
    validateGameIsStarted,
    validateIdType,
    validateId,
    validatePieceId,
    validatePieceStatus
  ),
});

export default validator;
