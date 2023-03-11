import { createSlice } from "@reduxjs/toolkit";
import { fetchCoins } from "../api/Api";

const initialState = {
  coins: [],
  status: "idle",
  error: null,
};

const CoinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.coins = action.payload;
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllCoins = (state) => state.data.coins;

export default CoinSlice.reducer;
