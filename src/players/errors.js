const errors = {
  GENERAL: {
    GAME_IS_STARTED:
      'Players cannot be added or removed after the game has started.',
    GAME_NOT_STARTED: 'Players cannot be updated before the game has started.'
  },
  ADD: {
    EXISTING_ID: 'Cannot add another player with the same id.',
    MISSING_ID: 'Id has to be specified when adding a player.'
  },
  PARAMS: {
    INVALID_ID: 'There is no player with specified id.',
    INVALID_NAME: 'The name should be a string.',
    INVALID_STATUS: 'The status should be boolean.',
    INVALID_PIECE_ID: 'There is no piece with specified id.'
  }
};

export default errors;
