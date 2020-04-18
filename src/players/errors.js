const errors = {
  GENERAL: {
    GAME_IS_STARTED:
      'Players cannot be added or removed after the game has started.',
    GAME_NOT_STARTED: 'Players cannot be updated before the game has started.',
  },
  ADD: {
    EXISTING_ID: 'Cannot add another player with the same id.',
  },
  PARAMS: {
    INVALID_ID: 'There is no player with specified id.',
    INVALID_ID_TYPE: 'The id has to be a string.',
    INVALID_NAME_TYPE: 'The name has to be a string.',
    INVALID_NAME_VALUE: 'The name cannot be an empty string.',
    INVALID_STATUS: 'The status has to be boolean.',
    INVALID_PIECE_ID: 'There is no piece with specified id.',
  },
};

export default errors;
