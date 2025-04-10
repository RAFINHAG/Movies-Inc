import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const MovieDetails = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [rating, setRating] = useState(0); // Calificación local
  const [guestSessionId, setGuestSessionId] = useState('');

  useEffect(() => {
    const fetchGuestSession = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=350e8b899c1a4e7788042a29f39f9186`
        );
        const data = await response.json();
        setGuestSessionId(data.guest_session_id);
      } catch (error) {
        console.error('Error al crear Guest Session:', error);
      }
    };

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=350e8b899c1a4e7788042a29f39f9186&language=es-ES`
        );
        const data = await response.json();
        setMovie(data);

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=350e8b899c1a4e7788042a29f39f9186&language=es-ES`
        );
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 10)); // Solo los primeros 10 actores
      } catch (error) {
        console.error('Error al cargar los detalles:', error);
      }
    };

    fetchGuestSession();
    fetchMovieDetails();
  }, [movieId]);

  const handleRating = async (value) => {
    if (!guestSessionId) {
      console.error('Guest Session ID no disponible. No se puede calificar.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=350e8b899c1a4e7788042a29f39f9186&guest_session_id=${guestSessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value }),
        }
      );
      if (response.ok) {
        setRating(value); // Actualiza la calificación localmente
        console.log(`Calificación enviada correctamente: ${value}`);
        navigation.navigate('NowPlayingList'); // Redirige a la pantalla principal
      } else {
        const errorData = await response.json();
        console.error('Error al enviar la calificación:', errorData.status_message);
      }
    } catch (error) {
      console.error('Error al calificar:', error);
    }
  };

  if (!movie) return <Text>Cargando detalles de la película...</Text>;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title || 'Sin título'}</Text>
      <Text style={styles.text}>Año: {movie.release_date?.substring(0, 4) || 'No disponible'}</Text>
      <Text style={styles.text}>Géneros: {movie.genres?.map(g => g.name).join(', ') || 'No disponibles'}</Text>
      <Text style={styles.text}>Descripción: {movie.overview || 'No disponible'}</Text>
      <Text style={styles.text}>Calificación Promedio: {movie.vote_average || 'No disponible'} ⭐</Text>
      <Text style={styles.subTitle}>Reparto:</Text>
      <FlatList
        data={cast}
        keyExtractor={(item) => item.cast_id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {item.name} como {item.character}
          </Text>
        )}
      />
      <View style={styles.ratingContainer}>
        <Text style={styles.subTitle}>Califica esta película:</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <Text style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#06dff5' },
  poster: { width: '100%', height: 200, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  subTitle: { fontSize: 15, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  ratingContainer: { alignItems: 'center', marginTop: 20 },
  stars: { flexDirection: 'row', justifyContent: 'center' },
  star: { fontSize: 30, marginHorizontal: 5 },
});

export default MovieDetails;
