import reducer from './reducer';
import actions from '../redux-store/actions';
import Question from './question';
import createMockStore from '../../test/reducer-utils';

describe('questions reducer', () => {
  let store = null;
  let dispatch = null;
  let payloads = null;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
    payloads = [
      {
        id: '1',
        playerId: '1',
        pieces: ['weapons.knife', 'locations.study', 'suspects.green'],
        answer: 1
      },
      {
        id: '2',
        playerId: '2',
        pieces: ['weapons.rope', 'locations.livingRoom', 'suspects.mustard'],
        answer: 1
      }
    ];
    dispatch(actions.questions.add(payloads[0]));
    dispatch(actions.questions.add(payloads[1]));
  });

  it('should return empty list of questions', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should add only a question with answer === 1', () => {
    dispatch(
      actions.questions.add({
        id: '3',
        playerId: '1',
        pieces: ['weapons.wrench', 'locations.livingRoom', 'suspects.white'],
        answer: 0
      })
    );
    dispatch(
      actions.questions.add({
        id: '4',
        playerId: '3',
        pieces: ['weapons.wrench', 'locations.study', 'suspects.white'],
        answer: 'weapons.wrench'
      })
    );
    expect(store.getState()).toEqual([
      Question(payloads[0]),
      Question(payloads[1])
    ]);
  });

  it('should allow to remove a question', () => {
    dispatch(actions.questions.remove({ id: '2' }));
    expect(store.getState()).toEqual([Question(payloads[0])]);
  });

  it('should allow to update a question', () => {
    dispatch(
      actions.questions.update({
        id: '2',
        pieceId: 'weapons.rope'
      })
    );
    expect(store.getState()).toEqual([
      Question(payloads[0]),
      Object.assign(Question(payloads[1]), {
        pieces: ['locations.livingRoom', 'suspects.mustard']
      })
    ]);
  });
});
