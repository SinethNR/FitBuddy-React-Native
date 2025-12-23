// src/screens/DetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleFavourite } from '../redux/slices/favouritesSlice';

export default function DetailsScreen({ route }) {
  const { exercise } = route.params;
  const dispatch = useDispatch();
  const { items: favourites } = useSelector(state => state.favourites);

  const isFavourite = favourites.some(fav => fav.name === exercise.name);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: exercise.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.name}</Text>
          <TouchableOpacity onPress={() => dispatch(toggleFavourite(exercise))}>
            <Feather
              name="heart"
              size={28}
              color={isFavourite ? '#FF6B6B' : '#ccc'}
              fill={isFavourite ? '#FF6B6B' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Feather name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Type</Text>
            <Text style={styles.infoValue}>{exercise.type}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <Feather name="target" size={24} color="#FF9800" />
            <Text style={styles.infoLabel}>Target</Text>
            <Text style={styles.infoValue}>{exercise.muscle}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <Feather name="bar-chart-2" size={24} color="#2196F3" />
            <Text style={styles.infoLabel}>Level</Text>
            <Text style={styles.infoValue}>{exercise.difficulty}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{exercise.instructions}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Feather name="play-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  instructions: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});