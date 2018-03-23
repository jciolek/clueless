import { createStore, getStore } from './';

describe('createStore', () => {
  it('should return new store every time', () => {
    expect(createStore()).not.toBe(createStore());
  });
});

describe('getStore', () => {
  it('should return the same store every time', () => {
    expect(getStore()).toBe(getStore());
  });
});
