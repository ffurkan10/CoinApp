import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  return response.data;
});

export const fetchCoinDetail = createAsyncThunk(
  "coinDetail/fetchCoinDetail",
  async (id) => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return response.data;
  }
);

export const fetchChart = createAsyncThunk(
  "coinChart/fetchChart",
  async (id) => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    );
    return response?.data?.prices;
  }
);

export const fetchPopular = createAsyncThunk(
  "popularCoins/fetchPopular",
  async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/search/trending`
    );
    return response.data.coins;
  }
);
