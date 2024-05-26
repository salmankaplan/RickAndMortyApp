import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterDetails } from '../apiservices/Api';
import { addFavorite, removeFavorite } from '../favories/FavoritesSlice';

const CharacterScreen = ({ route }) => {
    const { characterId } = route.params;
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const favoriteCharacters = useSelector(state => state.favorites.favoriteCharacters);
  
    useEffect(() => {
      loadCharacterDetails();
    }, []);
  

    const loadCharacterDetails = async () => {
        try {
          const response = await fetchCharacterDetails(characterId);
          setCharacter(response);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    
      const isFavorite = favoriteCharacters.some(char => char.id === characterId);
    
      const handleToggleFavorite = () => {
        if (isFavorite) {
          dispatch(removeFavorite(character));
          alert(`${character.name} has been removed from favorites.`);
        } else {
          if (favoriteCharacters.length < 10) {
            dispatch(addFavorite(character));
            alert(`${character.name} has been added to favorites.`);
          } else {
            alert("You have reached the maximum number of favorite characters. Please remove a character from favorites to add a new one.");
          }
        }
      };
    
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
    
      return (
        <View style={styles.container}>
          {character && (
            <>
              <Image source={{ uri: character.image }} style={styles.image} />
              <Text style={styles.characterName}>{character.name}</Text>
              <Text style={styles.characterDetails}>Status: {character.status}</Text>
              <Text style={styles.characterDetails}>Species: {character.species}</Text>
              <Text style={styles.characterDetails}>Gender: {character.gender}</Text>
              <Text style={styles.characterDetails}>Origin: {character.origin.name}</Text>
              <Text style={styles.characterDetails}>Location: {character.location.name}</Text>
              <TouchableOpacity onPress={handleToggleFavorite} style={styles.button}>
                <Text style={styles.buttonText}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</Text>
              </TouchableOpacity>
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
      characterName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      characterDetails: {
        fontSize: 16,
        marginBottom: 5,
      },
      image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 20,
      },
      button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
      },
    });

export default CharacterScreen;