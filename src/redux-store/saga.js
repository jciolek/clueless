import { all } from 'redux-saga/effects';
import players from '../players/saga';
import questions from '../questions/saga';

function* saga() {
  yield all([players(), questions()]);
}

export default saga;
