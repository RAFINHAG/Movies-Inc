import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { getNowPlayingMovies } from '../api';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getNowPlayingMovies();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  const renderMovie = ({ item }) => (
    <View style={styles.movieContainer}>
      {/* Cartel de la película */}
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
      />
      {/* Información de la película */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>Fecha de estreno: {item.release_date}</Text>
        <Text style={styles.voteAverage}>Media de votos: {item.vote_average}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
        />
      ) : (
        <Text style={styles.noMovies}>No hay películas disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 14,
    color: '#555',
  },
  voteAverage: {
    fontSize: 14,
    color: '#555',
  },
  noMovies: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default HomeScreen;
