import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    addSearchResults(state, action) {
      state.push(action.payload);
    },
    resetSearchResults(state) {
      return [];
    },
  },
});

export const { addSearchResults, resetSearchResults } =
  searchResultsSlice.actions;

export const fetchAllSearchResults = (state) => state.searchResults;

export default searchResultsSlice.reducer;
