import { takeEvery, all, put } from 'redux-saga/effects';
import actions, { types } from '../redux-store/actions';

function* watchGameFinish() {
  yield takeEvery(types.GAME.FINISH, function* gameFinish() {
    yield all([put(actions.players.reset()), put(actions.questions.reset())]);
  });
}

function* saga() {
  yield all([watchGameFinish()]);
}

export default saga;
export { watchGameFinish };
