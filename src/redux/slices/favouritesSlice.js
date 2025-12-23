import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVOURITES_KEY = '@favourites';

// Async thunk for loading favourites from storage
export const loadFavourites = createAsyncThunk(
  'favourites/loadFavourites',
  async (_, { rejectWithValue }) => {
    try {
      const favouritesData = await AsyncStorage.getItem(FAVOURITES_KEY);
      return favouritesData ? JSON.parse(favouritesData) : [];
    } catch (error) {
      return rejectWithValue('Failed to load favourites');
    }
  }
);

// Async thunk for saving favourites to storage
export const saveFavourites = createAsyncThunk(
  'favourites/saveFavourites',
  async (favourites, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
      return favourites;
    } catch (error) {
      return rejectWithValue('Failed to save favourites');
    }
  }
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addToFavourites: (state, action) => {
      const exercise = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === exercise.id);
      
      if (existingIndex === -1) {
        state.items.push(exercise);
        // Save to AsyncStorage
        AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(state.items));
      }
    },
    removeFromFavourites: (state, action) => {
      const exerciseId = action.payload;
      state.items = state.items.filter(item => item.id !== exerciseId);
      // Save to AsyncStorage
      AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(state.items));
    },
    toggleFavourite: (state, action) => {
      const exercise = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === exercise.id);
      
      if (existingIndex === -1) {
        state.items.push(exercise);
      } else {
        state.items.splice(existingIndex, 1);
      }
      // Save to AsyncStorage
      AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(state.items));
    },
    clearFavourites: (state) => {
      state.items = [];
      AsyncStorage.removeItem(FAVOURITES_KEY);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load favourites cases
      .addCase(loadFavourites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(loadFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Save favourites cases
      .addCase(saveFavourites.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveFavourites.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { 
  addToFavourites, 
  removeFromFavourites, 
  toggleFavourite, 
  clearFavourites, 
  clearError 
} = favouritesSlice.actions;

export default favouritesSlice.reducer;