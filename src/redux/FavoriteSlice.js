import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
        toast.success(`coin removed from favorites`);
      } else {
        // Favori henüz eklenmemiş, o zaman ekle
        state.favorites.push({ ...action.payload });
        toast.success(`coin added to favorites`);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action) {
      const favoriteItem = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
      state.favorites = favoriteItem;
      toast.success(`coin removed from favorites`);

      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
