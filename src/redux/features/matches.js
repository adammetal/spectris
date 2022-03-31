import { createSlice } from "@reduxjs/toolkit";
import { v4 as genId } from "uuid";

const initialState = {
  urls: [],
};

const matches = createSlice({
  name: "matches",
  initialState,
  reducers: {
    addMatch: (state, action) => {
      state.urls.push(action.payload);
    },
    removeMatchById: (state, action) => {
      const { id } = action.payload;
      const index = state.urls.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.urls.splice(index, 1);
      }
    },
    updateMatchById: (state, action) => {
      const { id, url } = action.payload;
      const index = state.urls.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.urls[index].url = url;
      }
    },
  },
});

const { actions } = matches;

export const { removeMatchById, updateMatchById } = actions;

export const addMatch = ({ url }) => (dispatch) => {
  const id = genId();
  const payload = { url, id };
  dispatch(actions.addMatch(payload));
};

export default matches.reducer;
