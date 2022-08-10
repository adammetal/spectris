import { test, describe, beforeAll, beforeEach, expect, it } from 'vitest';
import createStore from '../createStore';
import { addMatch, updateMatchById, removeMatchById } from '../features/matches';

test('initial state should be empty', () => {
  const store = createStore();
  const state = store.getState();
  expect(state.matches.urls).toStrictEqual([]);
});

describe('preload from localstorage', () => {
  let store;

  beforeAll(() => {
    localStorage.setItem(
      'reduxState',
      JSON.stringify({
        matches: {
          urls: [
            { url: 'test1', id: 'test1' },
            { url: 'test2', id: 'test2' },
          ],
        },
      }),
    );

    store = createStore();
  });

  it('should load saved urls', () => {
    const state = store.getState();

    expect(state.matches).toStrictEqual({
      urls: [
        { url: 'test1', id: 'test1' },
        { url: 'test2', id: 'test2' },
      ],
    });
  });
});

describe('basic actions for matches', () => {
  let store;

  beforeEach(() => {
    localStorage.setItem('reduxState', '{}');
    store = createStore();
  });

  test('add match', () => {
    store.dispatch(addMatch({ url: 'test add 1' }));
    store.dispatch(addMatch({ url: 'test add 2' }));
    const state = store.getState();

    expect(state.matches.urls).toEqual(
      expect.arrayContaining([
        { url: 'test add 1', id: expect.anything() },
        { url: 'test add 2', id: expect.anything() },
      ]),
    );

    const saved = JSON.parse(localStorage.getItem('reduxState'));
    expect(state).toStrictEqual(saved);
  });

  test('update match', () => {
    store.dispatch(addMatch({ url: 'test add 1' }));
    store.dispatch(addMatch({ url: 'test add 2' }));
    store.dispatch(addMatch({ url: 'test add 3' }));

    let state = store.getState();
    const { id } = state.matches.urls[1];
    store.dispatch(updateMatchById({ id, url: 'updated url' }));

    state = store.getState();

    expect(state.matches.urls).toEqual(
      expect.arrayContaining([
        { url: 'test add 1', id: expect.anything() },
        { url: 'test add 3', id: expect.anything() },
        { url: 'updated url', id },
      ]),
    );

    const saved = JSON.parse(localStorage.getItem('reduxState'));
    expect(state).toStrictEqual(saved);
  });

  test('remove match', () => {
    store.dispatch(addMatch({ url: 'test add 1' }));
    store.dispatch(addMatch({ url: 'test add 2' }));
    store.dispatch(addMatch({ url: 'test add 3' }));

    let state = store.getState();
    const { id } = state.matches.urls[1];

    store.dispatch(removeMatchById({ id }));

    state = store.getState();

    expect(state.matches.urls).toEqual(
      expect.arrayContaining([
        { url: 'test add 1', id: expect.anything() },
        { url: 'test add 3', id: expect.anything() },
      ]),
    );

    const saved = JSON.parse(localStorage.getItem('reduxState'));
    expect(state).toStrictEqual(saved);
  });
});
