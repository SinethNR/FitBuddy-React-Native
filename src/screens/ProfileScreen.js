// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logoutUser } from '../redux/slices/authSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items: favourites } = useSelector(state => state.favourites);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => dispatch(logoutUser()), style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName?.charAt(0) || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Feather name="heart" size={24} color="#FF6B6B" />
          <Text style={styles.statValue}>{favourites.length}</Text>
          <Text style={styles.statLabel}>Favourites</Text>
        </View>
        <View style={styles.statCard}>
          <Feather name="activity" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Feather name="trending-up" size={24} color="#2196F3" />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="user" size={20} color="#666" />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="settings" size={20} color="#666" />
          <Text style={styles.menuText}>Settings</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="help-circle" size={20} color="#666" />
          <Text style={styles.menuText}>Help & Support</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#FF6B6B" />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  menu: {
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF6B6B',
  },
});