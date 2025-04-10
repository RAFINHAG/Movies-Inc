import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NowPlayingList from './src/components/NowPlayingList.jsx';
import MovieDetails from './src/components/MovieDetails.jsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantalla principal con la lista de películas */}
        <Stack.Screen
          name="NowPlayingList"
          component={NowPlayingList}
          options={{ title: 'Cartelera de Películas' }}
        />
        {/* Pantalla de detalles de la película */}
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{ title: 'Detalles de la Película' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
