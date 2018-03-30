const errors = {
  PARAMS: {
    INVALID_ID: 'There is no piece with specified id.',
    INVALID_ID_AVAILABLE: 'There is already a piece with this id.',
    INVALID_GROUP: 'There is no group with specified group id.',
    INVALID_NAME_TYPE: 'The name has to be a string.',
    INVALID_NAME_VALUE: 'The name cannot be an empty string.'
  },
  GENERAL: {
    GAME_IS_STARTED: 'Pieces cannot be changed after the game has started.'
  }
};

export default errors;
