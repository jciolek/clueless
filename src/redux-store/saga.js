import { all } from 'redux-saga/effects';
import players from '../players/saga';
import questions from '../questions/saga';
import game from '../game/saga';

function* saga() {
  yield all([players(), questions(), game()]);
}

export default saga;
