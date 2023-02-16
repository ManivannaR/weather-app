import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ name: "", state: "", country: "", lat: "", lon: "" }];

export const selectedLocationSlice = createSlice({
  name: "selectedLocation",
  initialState,
  reducers: {
    setSelectedState(state, action) {
      return {
        ...state,
        name: action.payload.name,
        state: action.payload.state,
        country: action.payload.country,
        lat: action.payload.lat,
        lon: action.payload.lon,
      };
    },
  },
});

export const { setSelectedState } = selectedLocationSlice.actions;

export const fetchSelectedLocation = (state) => state.selectedLocation;

export default selectedLocationSlice.reducer;
