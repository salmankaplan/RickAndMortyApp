import React from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../favories/FavoritesSlice';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleRemove = (character) => {
    Alert.alert(
      'Remove Favorite',
      `Are you sure you want to remove ${character.name} from your favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => dispatch(removeFavorite(character.id)) },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Button title="Remove" onPress={() => handleRemove(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
});

export default FavoritesScreen;