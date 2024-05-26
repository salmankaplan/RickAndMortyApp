import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchEpisodes } from '../apiservices/Api';
import EpisodeItem from '../components/EpisodeItem';

const HomeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);

  useEffect(() => {
    loadEpisodes();
  }, [page]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredEpisodes(episodes.filter(episode => episode.name.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredEpisodes(episodes);
    }
  }, [searchTerm, episodes]);

  const loadEpisodes = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetchEpisodes(page);
      setEpisodes(prevEpisodes => [...prevEpisodes, ...response.data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreEpisodes = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loading} />;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search episodes..."
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <FlatList
        data={filteredEpisodes}
        renderItem={({ item }) => <EpisodeItem episode={item} navigation={navigation} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreEpisodes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
  loading: {
    padding: 20,
  },
});

export default HomeScreen;