import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import favoritesReducer from "../Slices/favoritesSlices.js";
import searchResultsReducer from "../Slices/searchResults.js";
import selectedLocationReducer from "../Slices/selectedLocationSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  favorites: favoritesReducer,
  searchResults: searchResultsReducer,
  selectedLocation: selectedLocationReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
