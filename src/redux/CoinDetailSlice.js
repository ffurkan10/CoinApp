import { createSlice } from "@reduxjs/toolkit";
import { fetchChart, fetchCoinDetail } from "../api/Api";

const initialState = {
  detail: [],
  status: "idle",
  error: null,
  charts: [],
};

const CoinDetailSlice = createSlice({
  name: "coinDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(fetchCoinDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

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
