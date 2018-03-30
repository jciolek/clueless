import Piece from './piece';

describe('Piece', () => {
  it('should construct id based on group id and name', () => {
    expect(Piece({ name: 'Hello World', groupId: 'bollocks' })).toEqual({
      id: 'bollocks.helloWorld',
      name: 'Hello World'
    });
  });
});
