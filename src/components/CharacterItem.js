import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CharacterItem = ({ character, navigation }) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Character', { characterId: character.id })}>
        <Text style={styles.title}>{character.name}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CharacterItem;