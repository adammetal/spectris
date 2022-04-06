import { configureStore } from '@reduxjs/toolkit';
import matchesReducer from './features/matches';
import injectorReducer from './features/injector';

const storage = (key) => ({
  get: () => {
    const raw = localStorage.getItem(key) ?? '{}';
    return JSON.parse(raw);
  },
  set: (value) => {
    const raw = JSON.stringify(value);
    localStorage.setItem(key, raw);
  },
});

const reduxState = storage('reduxState');

export default () => {
  const preloadedState = reduxState.get();

  const store = configureStore({
    reducer: {
      matches: matchesReducer,
      injector: injectorReducer,
    },
    preloadedState,
  });

  store.subscribe(() => {
    reduxState.set(store.getState());
  });

  return store;
};
