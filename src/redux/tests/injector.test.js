import createStore from '../createStore';
import { addCss, addJs, removeCss, removeJs } from '../features/injector';

test('initial state should be empty', () => {
  const store = createStore();
  const state = store.getState();
  expect(state.injector).toStrictEqual({ css: [], js: [] });
});

describe('preload from localstorage', () => {
  let store;

  beforeAll(() => {
    localStorage.setItem(
      'reduxState',
      JSON.stringify({
        injector: {
          css: ['test-css-1'],
          js: ['test-js-1'],
        },
      }),
    );

    store = createStore();
  });

  it('should load saved files', () => {
    const state = store.getState();

    expect(state.injector).toStrictEqual({
      css: ['test-css-1'],
      js: ['test-js-1'],
    });
  });
});

describe('basic actions for injector', () => {
  let store;

  beforeEach(() => {
    localStorage.setItem('reduxState', '{}');
    store = createStore();
  });

  test('add files', () => {
    store.dispatch(addCss({ file: 'test-css-file-1' }));
    store.dispatch(addCss({ file: 'test-css-file-2' }));

    store.dispatch(addJs({ file: 'test-js-file-1' }));
    store.dispatch(addJs({ file: 'test-js-file-2' }));

    const state = store.getState();
    expect(state.injector).toStrictEqual({
      js: ['test-js-file-1', 'test-js-file-2'],
      css: ['test-css-file-1', 'test-css-file-2'],
    });

    const saved = JSON.parse(localStorage.getItem('reduxState'));
    expect(state).toStrictEqual(saved);
  });

  test('remove files', () => {
    store.dispatch(addCss({ file: 'test-css-file-1' }));
    store.dispatch(addCss({ file: 'test-css-file-rem' }));
    store.dispatch(addCss({ file: 'test-css-file-2' }));

    store.dispatch(addJs({ file: 'test-js-file-1' }));
    store.dispatch(addJs({ file: 'test-js-file-rem' }));
    store.dispatch(addJs({ file: 'test-js-file-2' }));

    store.dispatch(removeCss({ file: 'test-css-file-rem' }));
    store.dispatch(removeJs({ file: 'test-js-file-rem' }));

    const state = store.getState();
    expect(state.injector).toStrictEqual({
      js: ['test-js-file-1', 'test-js-file-2'],
      css: ['test-css-file-1', 'test-css-file-2'],
    });

    const saved = JSON.parse(localStorage.getItem('reduxState'));
    expect(state).toStrictEqual(saved);
  });
});
