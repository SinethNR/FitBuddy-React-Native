// src/screens/RegisterScreen.js
import React, { useState } from 'react';
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
import { Feather } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    Alert.alert('Success', 'Registration successful! Please login.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Feather name="user-plus" size={50} color="#4CAF50" />
          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={form.username}
              onChangeText={text => setForm({ ...form, username: text })}
              autoCapitalize="none"
            />
          </View>
          {errors.username && <Text style={styles.error}>{errors.username}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={text => setForm({ ...form, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={form.password}
              onChangeText={text => setForm({ ...form, password: text })}
              secureTextEntry
            />
          </View>
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChangeText={text => setForm({ ...form, confirmPassword: text })}
              secureTextEntry
            />
          </View>
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>
              Already have an account? <Text style={styles.linkBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  linkBold: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
