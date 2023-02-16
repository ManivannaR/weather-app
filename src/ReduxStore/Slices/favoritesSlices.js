import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addFavorite } = favoritesSlice.actions;

export const selectAllFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
