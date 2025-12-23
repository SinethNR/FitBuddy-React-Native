import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      
      // Store user data in AsyncStorage
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for checking stored auth
export const checkStoredAuth = createAsyncThunk(
  'auth/checkStoredAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      return rejectWithValue('Failed to check stored auth');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear AsyncStorage
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('userData');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Check stored auth cases
      .addCase(checkStoredAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;