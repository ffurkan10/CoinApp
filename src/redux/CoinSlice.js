import { createSlice } from "@reduxjs/toolkit";
import { fetchCoins } from "../api/Api";

const initialState = {
  coins: [],
  status: "idle",
  error: null,
  filteredCoins: [],
};

const CoinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    filter: (state, action) => {
      const term = action.payload.toLowerCase();
      state.filteredCoins = state.coins.filter((coin) => {
        return coin.name.toLowerCase().includes(term);
      });
    },
  },
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

export const { filter } = CoinSlice.actions;
export const selectFilteredCoins = (state) => state.data.filteredCoins;

export const selectAllCoins = (state) => state.data.coins;

export default CoinSlice.reducer;
