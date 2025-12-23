import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching exercises
export const fetchExercises = createAsyncThunk(
  'exercises/fetchExercises',
  async (_, { rejectWithValue }) => {
    try {
      // Using a fitness API - API Ninjas Exercises
      const response = await axios.get('https://api.api-ninjas.com/v1/exercises?muscle=biceps', {
        headers: {
          'X-Api-Key': 'YOUR_API_KEY' // You'd need to get this from api-ninjas.com
        }
      });
      
      // Fallback to dummy data if API fails
      const exercises = response.data || [
        {
          id: 1,
          name: 'Push-ups',
          type: 'strength',
          muscle: 'chest',
          equipment: 'body_only',
          difficulty: 'beginner',
          instructions: 'Get in a plank position with your hands placed slightly wider than shoulder-width apart...'
        },
        {
          id: 2,
          name: 'Squats',
          type: 'strength',
          muscle: 'quadriceps',
          equipment: 'body_only',
          difficulty: 'beginner',
          instructions: 'Stand with feet shoulder-width apart. Lower your body as if sitting back into a chair...'
        },
        {
          id: 3,
          name: 'Plank',
          type: 'strength',
          muscle: 'abdominals',
          equipment: 'body_only',
          difficulty: 'beginner',
          instructions: 'Get into push-up position. Hold your body in a straight line from head to heels...'
        },
        {
          id: 4,
          name: 'Jumping Jacks',
          type: 'cardio',
          muscle: 'full_body',
          equipment: 'body_only',
          difficulty: 'beginner',
          instructions: 'Stand upright with legs together and arms by your side. Jump and spread legs shoulder-width apart...'
        },
        {
          id: 5,
          name: 'Burpees',
          type: 'cardio',
          muscle: 'full_body',
          equipment: 'body_only',
          difficulty: 'intermediate',
          instructions: 'Start in standing position. Drop into squat, jump back into plank, do push-up...'
        }
      ];
      
      return exercises.map((exercise, index) => ({
        ...exercise,
        id: exercise.id || index + 1,
        image: `https://via.placeholder.com/300x200?text=${exercise.name.replace(' ', '+')}`
      }));
    } catch (error) {
      return rejectWithValue('Failed to fetch exercises');
    }
  }
);

// Async thunk for fetching exercise by muscle group
export const fetchExercisesByMuscle = createAsyncThunk(
  'exercises/fetchExercisesByMuscle',
  async (muscle, { rejectWithValue }) => {
    try {
      // This would normally hit the API with the muscle parameter
      const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`);
      
      // For now, return filtered dummy data
      const allExercises = [
        { id: 1, name: 'Push-ups', muscle: 'chest', type: 'strength' },
        { id: 2, name: 'Squats', muscle: 'quadriceps', type: 'strength' },
        { id: 3, name: 'Bicep Curls', muscle: 'biceps', type: 'strength' },
        { id: 4, name: 'Tricep Dips', muscle: 'triceps', type: 'strength' },
        { id: 5, name: 'Deadlifts', muscle: 'hamstrings', type: 'strength' },
      ];
      
      return allExercises.filter(exercise => exercise.muscle.includes(muscle.toLowerCase()));
    } catch (error) {
      return rejectWithValue('Failed to fetch exercises for muscle group');
    }
  }
);

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [],
    selectedExercise: null,
    isLoading: false,
    error: null,
    searchQuery: '',
    selectedMuscle: 'all',
  },
  reducers: {
    setSelectedExercise: (state, action) => {
      state.selectedExercise = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedMuscle: (state, action) => {
      state.selectedMuscle = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch exercises cases
      .addCase(fetchExercises.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exercises = action.payload;
        state.error = null;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch by muscle cases
      .addCase(fetchExercisesByMuscle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExercisesByMuscle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercisesByMuscle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedExercise, setSearchQuery, setSelectedMuscle, clearError } = exercisesSlice.actions;
export default exercisesSlice.reducer;