import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (state.favorites.length < 10) {
        state.favorites.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      } else {
        alert('You have reached the maximum number of favorite characters.');
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(char => char.id !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;