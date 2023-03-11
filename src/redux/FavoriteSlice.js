import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [],
  },
  reducers: {
    addFavorite(state, action) {
      const favoriteItemIndex = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );
      if (favoriteItemIndex !== -1) {
        // Favori zaten eklenmiş, o zaman çıkarın
        state.favorites.splice(favoriteItemIndex, 1);
      } else {
        // Favori henüz eklenmemiş, o zaman ekle
        state.favorites.push({ ...action.payload });
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action) {
      const favoriteItem = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
      state.favorites = favoriteItem;
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
