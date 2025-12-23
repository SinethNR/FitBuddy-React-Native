// src/screens/FavouritesScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleFavourite } from '../redux/slices/favouritesSlice';

export default function FavouritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items: favourites } = useSelector(state => state.favourites);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { exercise: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.type}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => dispatch(toggleFavourite(item))}
      >
        <Feather name="x" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (favourites.length === 0) {
    return (
      <View style={styles.empty}>
        <Feather name="heart" size={64} color="#ccc" />
        <Text style={styles.emptyText}>No favourites yet</Text>
        <Text style={styles.emptySubtext}>
          Start adding exercises to your favourites!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favourites</Text>
        <Text style={styles.count}>{favourites.length} exercises</Text>
      </View>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  list: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  removeBtn: {
    padding: 8,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});