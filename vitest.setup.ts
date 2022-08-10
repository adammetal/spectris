/* eslint-disable import/no-extraneous-dependencies */
import { vi, expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

vi.stubGlobal('localStorage', {
  storage: {},
  getItem(key) {
    return this.storage[key] ?? null;
  },
  setItem(key, value) {
    this.storage[key] = value;
  },
});
