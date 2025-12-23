# FitBuddy React Native App

A comprehensive fitness mobile application built with React Native for IN3210 Assignment 2.

## Features

### Core Functionality
- **User Authentication**: Login/logout functionality with demo credentials
- **Exercise Listings**: Dynamic display of fitness exercises with images
- **Favorites Management**: Add/remove exercises from favorites with persistence
- **Exercise Details**: Detailed view with instructions and exercise information
- **User Profile**: Personal dashboard with stats and settings

### Technical Features
- **Redux State Management**: Centralized state with Redux Toolkit
- **API Integration**: DummyJSON API for authentication + API Ninjas for exercise data
- **Responsive UI**: Modern, clean interface with Feather icons
- **Form Validation**: Formik + Yup for robust form handling
- **Data Persistence**: AsyncStorage for offline favorites and authentication
- **Navigation**: React Navigation with nested stack and tab navigators

## Demo Credentials

For testing the application, use these demo credentials:
- **Username**: `emilys`
- **Password**: `emilyspass`

## Project Structure

```
src/
├── components/           # Reusable UI components
├── navigation/          # Navigation configuration
│   └── AppNavigator.js  # Main navigation setup
├── redux/              # State management
│   ├── store.js        # Redux store configuration
│   └── slices/         # Feature-based slices
│       ├── authSlice.js      # Authentication state
│       ├── exercisesSlice.js # Exercise data management
│       └── favouritesSlice.js # Favorites management
├── screens/            # Screen components
│   ├── LoginScreen.js        # User authentication
│   ├── RegisterScreen.js     # User registration
│   ├── HomeScreen.js         # Main exercise listing
│   ├── DetailsScreen.js      # Exercise details
│   ├── FavouritesScreens.js  # User favorites
│   └── ProfileScreen.js      # User profile
├── services/           # API services
├── styles/            # Shared styling
└── utils/             # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on device/emulator**:
   - For Android: Press `a` in the terminal or scan QR code with Expo Go
   - For iOS: Press `i` in the terminal or scan QR code with Camera app
   - For Web: Press `w` in the terminal

### Key Dependencies

- **React Navigation**: Navigation and routing
- **Redux Toolkit**: State management
- **React Redux**: React bindings for Redux
- **AsyncStorage**: Local data persistence
- **Axios**: HTTP client for API requests
- **Formik & Yup**: Form handling and validation
- **Expo Vector Icons**: Icon library (Feather icons)

## App Flow

1. **Authentication Flow**:
   - Login screen with demo credentials pre-filled
   - Form validation with error messages
   - Persistent login state with AsyncStorage

2. **Main Navigation**:
   - Home tab: Browse and favorite exercises
   - Favorites tab: View saved exercises
   - Profile tab: User info and app settings

3. **Exercise Interaction**:
   - Tap exercise card to view details
   - Heart icon to add/remove favorites
   - Pull to refresh exercise list

## API Integration

- **Authentication**: DummyJSON API (`https://dummyjson.com/auth/login`)
- **Exercise Data**: API Ninjas Exercises API with fallback dummy data
- **Offline Support**: Cached data and AsyncStorage for favorites

## Assignment Requirements Fulfilled

✅ **User Authentication**: Login/logout with form validation  
✅ **Navigation Structure**: Stack and Tab navigation with proper routing  
✅ **Dynamic Item Lists**: Exercise listings with images and data  
✅ **Favorites Functionality**: Add/remove with local persistence  
✅ **Redux State Management**: Centralized state with proper actions  
✅ **API Integration**: External APIs with error handling  
✅ **Responsive UI**: Modern design with consistent styling  
✅ **Form Validation**: Robust validation using Formik/Yup  
✅ **Icon Integration**: Feather icons throughout the app  

## Development Notes

- The app uses demo credentials for easy testing
- Exercise data includes fallback dummy data for offline functionality
- Favorites are persisted locally using AsyncStorage
- The UI is designed to be responsive and work across different screen sizes
- All components follow React Native best practices and are properly structured

## Testing the App

1. Start with the login screen using the demo credentials
2. Browse exercises on the Home tab
3. Tap the heart icon to add exercises to favorites
4. Navigate to Favorites tab to see saved exercises
5. Tap any exercise to view detailed information
6. Check the Profile tab for user information and logout option

The app demonstrates a complete fitness tracking experience with all required features implemented according to the assignment specifications.
