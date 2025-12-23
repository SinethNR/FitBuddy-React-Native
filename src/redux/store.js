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
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    
    if (data.id) {
      await AsyncStorage.setItem('user', JSON.stringify(data));
      dispatch(loginSuccess(data));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    dispatch(setLoading(false));
    return { success: false, message: error.message };
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    const userStr = await AsyncStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch(loginSuccess(user));
    }
  } catch (error) {
    console.error('Auth check failed:', error);
  }
};

export const logoutUser = () => async (dispatch) => {
  await AsyncStorage.removeItem('user');
  dispatch(logout());
};

export default authSlice.reducer;

// src/redux/slices/favouritesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
  },
  reducers: {
    setFavourites: (state, action) => {
      state.items = action.payload;
    },
    addFavourite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
  },
});

export const { setFavourites, addFavourite, removeFavourite } = favouritesSlice.actions;

export const loadFavourites = () => async (dispatch) => {
  try {
    const favStr = await AsyncStorage.getItem('favourites');
    if (favStr) {
      dispatch(setFavourites(JSON.parse(favStr)));
    }
  } catch (error) {
    console.error('Load favourites failed:', error);
  }
};

export const toggleFavourite = (item) => async (dispatch, getState) => {
  const { items } = getState().favourites;
  const exists = items.find(fav => fav.name === item.name);
  
  if (exists) {
    dispatch(removeFavourite(item));
    const updated = items.filter(fav => fav.name !== item.name);
    await AsyncStorage.setItem('favourites', JSON.stringify(updated));
  } else {
    dispatch(addFavourite(item));
    await AsyncStorage.setItem('favourites', JSON.stringify([...items, item]));
  }
};

export default favouritesSlice.reducer;

// src/redux/slices/exercisesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setExercises: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setExercises, setLoading, setError } = exercisesSlice.actions;

export const fetchExercises = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch('https://dummyjson.com/recipes?limit=20');
    const data = await response.json();
    
    // Transform recipes to look like exercises for demo
    const exercises = data.recipes.map(recipe => ({
      name: recipe.name,
      type: recipe.cuisine,
      muscle: recipe.mealType[0] || 'General',
      difficulty: recipe.difficulty,
      instructions: recipe.instructions.join(' '),
      image: recipe.image,
    }));
    
    dispatch(setExercises(exercises));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default exercisesSlice.reducer;