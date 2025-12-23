// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { fetchExercises } from '../redux/slices/exercisesSlice';
import { toggleFavourite } from '../redux/slices/favouritesSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { list: exercises, loading } = useSelector(state => state.exercises);
  const { items: favourites } = useSelector(state => state.favourites);

  useEffect(() => {
    dispatch(fetchExercises());
  }, []);

  const isFavourite = (item) => {
    return favourites.some(fav => fav.name === item.name);
  };

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { exercise: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={() => dispatch(toggleFavourite(item))}>
            <Feather
              name="heart"
              size={20}
              color={isFavourite(item) ? '#FF6B6B' : '#ccc'}
              fill={isFavourite(item) ? '#FF6B6B' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardSubtitle}>{item.type}</Text>
        <View style={styles.cardTags}>
          <Text style={styles.tag}>{item.muscle}</Text>
          <Text style={styles.tag}>{item.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.firstName || 'User'}!</Text>
          <Text style={styles.subtitle}>Ready for your workout?</Text>
        </View>
        <TouchableOpacity>
          <Feather name="bell" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchExercises())}
            colors={['#007AFF']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 15,
    color: '#666',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#667eea',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
});