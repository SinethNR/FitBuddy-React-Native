import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import favouritesReducer from './slices/favouritesSlice';
import exercisesReducer from './slices/exercisesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favourites: favouritesReducer,
    exercises: exercisesReducer,
  },
});

export default store;