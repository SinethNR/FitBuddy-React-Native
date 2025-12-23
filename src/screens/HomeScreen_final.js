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
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    color: '#666',
    marginRight: 8,
    marginTop: 4,
  },
});
