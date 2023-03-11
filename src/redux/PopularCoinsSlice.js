import { createSlice } from "@reduxjs/toolkit";
import { fetchPopular } from "../api/Api";

const initialState = {
  populars: [],
  status: "idle",
  error: null,
};

const PopularCoinsSlice = createSlice({
  name: "popularCoins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.populars = action.payload;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default PopularCoinsSlice.reducer;
