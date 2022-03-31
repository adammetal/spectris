beforeAll(() => {
  global.localStorage = {
    storage: {},
    getItem: function (key) {
      return this.storage[key] ?? null;
    },
    setItem: function (key, value) {
      this.storage[key] = value;
    },
  };
});
