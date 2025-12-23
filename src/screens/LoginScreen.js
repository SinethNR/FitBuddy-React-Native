// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { loginUser, clearError } from '../redux/slices/authSlice';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(result)) {
        // Navigation will be handled automatically by AppNavigator
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to FitBuddy</Text>
          <Text style={styles.subtitle}>Your fitness journey starts here</Text>
        </View>

        <Formik
          initialValues={{ username: 'emilys', password: 'emilyspass' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  autoCapitalize="none"
                />
              </View>
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#666" />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Text>
              </TouchableOpacity>

              <View style={styles.demoCredentials}>
                <Text style={styles.demoTitle}>Demo Credentials:</Text>
                <Text style={styles.demoText}>Username: emilys</Text>
                <Text style={styles.demoText}>Password: emilyspass</Text>
              </View>

              <TouchableOpacity
                style={styles.registerLink}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.registerText}>
                  Don't have an account? <Text style={styles.registerTextBold}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  demoCredentials: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  demoText: {
    fontSize: 13,
    color: '#666',
  },
  registerLink: {
    marginTop: 30,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerTextBold: {
    color: '#007AFF',
    fontWeight: '600',
  },
});