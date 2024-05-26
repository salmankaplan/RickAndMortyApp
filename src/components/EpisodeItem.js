import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EpisodeItem = ({ episode, navigation }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Episode', { episodeId: episode.id })}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text>{episode.air_date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EpisodeItem;