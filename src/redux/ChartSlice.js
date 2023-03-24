import { createSlice } from "@reduxjs/toolkit";
import { fetchChart } from "../api/Api";

const initialState = {
  charts: [],
  status: "idle",
  error: null,
};

const CoinDetailSlice = createSlice({
  name: "coinChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.charts = action.payload;
      })
      .addCase(fetchChart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default CoinDetailSlice.reducer;
