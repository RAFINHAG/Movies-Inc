import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StarRating = ({ movieId }) => {
  const [rating, setRating] = useState(0);

  const submitRating = async (value) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=350e8b899c1a4e7788042a29f39f9186`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value }),
        }
      );
      if (response.ok) {
        setRating(value);
      } else {
        console.error('Error al enviar la calificación:', response.status);
      }
    } catch (error) {
      console.error('Error al calificar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calificar esta película:</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => submitRating(star)}>
            <Text style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  stars: { flexDirection: 'row' },
  star: { fontSize: 30, marginHorizontal: 5 },
});

export default StarRating;
