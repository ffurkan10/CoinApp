import { configureStore } from "@reduxjs/toolkit";
import CoinDetailSlice from "../redux/CoinDetailSlice";
import CoinSlice from "../redux/CoinSlice";
import logger from "redux-logger";
import PopularCoinsSlice from "../redux/PopularCoinsSlice";
import FavoriteSlice from "../redux/FavoriteSlice";

export default configureStore({
  reducer: {
    data: CoinSlice,
    detail: CoinDetailSlice,
    popular: PopularCoinsSlice,
    favorites: FavoriteSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
