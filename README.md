Este proyecto permite a los usuarios explorar una cartelera de películas, visualizar detalles específicos, calificar películas, y gestionar favoritos. Está construido con React Native y hace uso de la API de TMDb para obtener los datos de las películas.

**Componentes Implementados**
1. App.js

2. NowPlayingList.jsx
//Muestra la lista de películas en estreno con detalles básicos:

Título, fecha de estreno y calificación promedio.

Cada tarjeta permite navegar a la pantalla de detalles.

**Botón de favoritos integrado**
No se agrego por problemas con el codigo 

3. MovieDetails.jsx
Presenta información detallada de una película:

Póster, año, géneros, descripción y reparto.

Función para calificar películas mediante 'handleRating'

Calificaciones se envían a la API de TMDb con un 'Guest Session ID'

Redirección automática a la pantalla principal tras calificar.

4. StarRating.jsx
Componente reutilizable para calificación:

Permite seleccionar una calificación entre 1 y 10 estrellas.

Envía la calificación al servidor utilizando un Guest Session ID.

Funciones Principales
Calificación de Películas
Las calificaciones se envían a TMDb mediante la API.

Se valida el rango de calificación (0.5 a 10).

Sincronización con el estado global para reflejar cambios en el menú principal.

Gestión de Favoritos
Las películas pueden marcarse como favoritas desde la lista principal o pantalla de detalles.

Sincronización con el estado global para mostrar favoritos en todas las pantallas.

Redirección
Navegación fluida entre pantallas usando React Navigation:

Al calificar una película, se redirige automáticamente al menú principal.

Integración de API
TMDb API
Datos obtenidos:

Información general de las películas (/movie/{movieId}).

Reparto (/movie/{movieId}/credits).

Calificaciones enviadas mediante POST a /movie/{movieId}/rating.

Sesión de invitado generada con /authentication/guest_session/new.

**Estilo y Diseño**
Simple ya que la tarea no requeria algo mas detallado.

**Tecnologías Utilizadas**

React Native: Framework para desarrollo de aplicaciones móviles.

React Navigation: Biblioteca para navegación entre pantallas.

TMDb API: Fuente de datos para películas, calificaciones y reparto.


