import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const NowPlayingList = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=350e8b899c1a4e7788042a29f39f9186&language=es-ES&page=1'
      );
      const data = await response.json();
      const sortedMovies = data.results
        .map(movie => ({
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }))
        .sort((a, b) => a.title.localeCompare(b.title));
      setMovies(sortedMovies);
    } catch (error) {
      console.error('Error al cargar películas:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMovies(); // Actualiza la lista cada vez que se vuelve a esta pantalla
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.posterPath }} style={styles.poster} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>Fecha: {item.releaseDate || 'No disponible'}</Text>
          <Text style={styles.text}>Votos: {item.voteAverage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return <FlatList data={movies} keyExtractor={item => item.id.toString()} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  movieContainer: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#4e7fe7', padding: 10 },
  poster: { width: 100, height: 150 },
  details: { flex: 1, paddingLeft: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  text: { fontSize: 14 },
});

export default NowPlayingList;
