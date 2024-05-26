import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchEpisodeDetails, fetchCharacterDetails } from '../apiservices/Api';
import CharacterItem from '../components/CharacterItem';

const EpisodeScreen = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEpisodeDetails();
  }, []);

  const loadEpisodeDetails = async () => {
    try {
      const response = await fetchEpisodeDetails(episodeId);
      setEpisode(response.data);

      const characterPromises = response.data.characters.map((url) => {
        const characterId = url.split('/').pop();
        return fetchCharacterDetails(characterId).then((res) => res.data);
      });

      const characterDetails = await Promise.all(characterPromises);
      setCharacters(characterDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderCharacterItem = ({ item }) => (
    <TouchableOpacity
      style={styles.characterCard}
      onPress={() => navigation.navigate('CharacterScreen', { characterId: item.id })}
      renderItem={({ item }) => <CharacterItem character={item} navigation={navigation} />}
    >
      <Text style={styles.characterName}>{item.name}</Text> 
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {episode && (
        <>
          <Text style={styles.episodeName}>{episode.name}</Text>
          <Text style={styles.episodeDetails}>Air Date: {episode.air_date}</Text>
          <Text style={styles.episodeDetails}>Episode: {episode.episode}</Text>
          <FlatList
            data={characters}
            renderItem={renderCharacterItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.characterList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  episodeDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  characterList: {
    marginTop: 20,
  },
  characterCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 18,
  },
});

export default EpisodeScreen;
