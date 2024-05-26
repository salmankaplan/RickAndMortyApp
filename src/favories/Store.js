import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './FavoritesSlice';

const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  });
  
  export default store;