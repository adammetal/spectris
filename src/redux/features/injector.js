/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  css: [],
  js: [],
};

const injectorSlice = createSlice({
  name: 'injector',
  initialState,
  reducers: {
    addCss: (state, action) => {
      state.css.push(action.payload.file);
    },
    addJs: (state, action) => {
      state.js.push(action.payload.file);
    },
    removeCss: (state, action) => {
      const index = state.css.findIndex((file) => file === action.payload.file);
      state.css.splice(index, 1);
    },
    removeJs: (state, action) => {
      const index = state.js.findIndex((file) => file === action.payload.file);
      state.js.splice(index, 1);
    },
  },
});

export const { addCss, addJs, removeCss, removeJs } = injectorSlice.actions;

export default injectorSlice.reducer;
