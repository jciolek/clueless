import createMockStore from '@/test/createMockStore';
import type { MockStoreType } from '@/test/types';
import type { Dispatch } from 'redux';
import { actions, reducer } from './slice';
import Question from './question';
import type { AddQuestionPayloadType } from './types';

type ReducerType = typeof reducer;

describe('questions reducer', () => {
  const { add, update, remove, reset } = actions;
  let store: MockStoreType<ReducerType>;
  let dispatch: Dispatch;
  let payloads: Array<AddQuestionPayloadType>;

  beforeEach(() => {
    store = createMockStore(reducer);
    ({ dispatch } = store);
    payloads = [
      {
        id: '1',
        playerId: '1',
        pieces: ['weapons.knife', 'locations.study', 'suspects.green'],
        answer: 1,
      },
      {
        id: '2',
        playerId: '2',
        pieces: ['weapons.rope', 'locations.livingRoom', 'suspects.mustard'],
        answer: 1,
      },
    ];
    dispatch(add(payloads[0]));
    dispatch(add(payloads[1]));
  });

  it('should return empty list of questions', () => {
    expect(reducer(undefined, { type: 'whatevs' })).toEqual([]);
  });

  it('should add only a question with answer === 1', () => {
    dispatch(
      add({
        id: '3',
        playerId: '1',
        pieces: ['weapons.wrench', 'locations.livingRoom', 'suspects.white'],
        answer: 0,
      })
    );
    dispatch(
      add({
        id: '4',
        playerId: '3',
        pieces: ['weapons.wrench', 'locations.study', 'suspects.white'],
        answer: 'weapons.wrench',
      })
    );

    expect(store.getState()).toEqual([
      Question(payloads[0]),
      Question(payloads[1]),
    ]);
  });

  it('should allow to remove a question', () => {
    dispatch(remove({ id: '2' }));
    expect(store.getState()).toEqual([Question(payloads[0])]);
  });

  it('should allow to update a question', () => {
    dispatch(update({ id: '2', pieceId: 'weapons.rope' }));

    expect(store.getState()).toEqual([
      Question(payloads[0]),
      Object.assign(Question(payloads[1]), {
        pieces: ['locations.livingRoom', 'suspects.mustard'],
      }),
    ]);
  });

  it('should allow to reset questions', () => {
    dispatch(reset());

    expect(store.getState()).toEqual([]);
  });
});
