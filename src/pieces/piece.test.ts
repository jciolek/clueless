import Piece from './piece';

describe('Piece', () => {
  it('should construct id based on group id and name', () => {
    expect(Piece({ name: 'Hello World', groupId: 'suspects' })).toEqual({
      id: 'suspects.helloWorld',
      name: 'Hello World',
    });
  });
});
