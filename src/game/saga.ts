import { takeEvery, all, put } from 'redux-saga/effects';
import actions from '@/redux-store/actions';

function* watchGameFinish() {
  yield takeEvery(actions.game.finish.type, function* gameFinish() {
    yield all([put(actions.players.reset()), put(actions.questions.reset())]);
  });
}

function* saga() {
  yield all([watchGameFinish()]);
}

export default saga;
export { watchGameFinish };
