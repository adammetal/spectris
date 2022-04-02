import '@testing-library/jest-dom';

beforeAll(() => {
  global.localStorage = {
    storage: {},
    getItem(key) {
      return this.storage[key] ?? null;
    },
    setItem(key, value) {
      this.storage[key] = value;
    },
  };
});
