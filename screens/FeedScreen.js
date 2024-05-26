import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() =>{
    fetch('https://192.168.56.1/api')
    .then(response => response.text)
    .then(data => setMessage(Data))
    .then(error => console.error(error))
  }, []);


  // Función para simular inicio de sesión exitoso y obtener publicaciones
  const simulateSuccessfulLogin = () => {
    // Simular inicio de sesión exitoso
    console.log("Inicio de sesión exitoso.");

    // Simular obtención de publicaciones
    const simulatedPosts = [
      {
        id: 1,
        username: 'usuario1',
        text: '¡Hola mundo!',
      },
      {
        id: 2,
        username: 'usuario2',
        text: 'Esto es una publicación de prueba.',
      },
      {
        id: 3,
        username: 'usuario3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac maximus nulla. Proin pretium dapibus aliquam. Etiam semper ligula sit amet quam maximus, in porta lectus consectetur. Nunc varius massa massa, quis vehicula arcu consequat nec. Nullam sit amet tempus ante. Sed ornare sollicitudin urna, sit amet lobortis quam. Integer id feugiat ex. Vivamus a volutpat odio. Aliquam tristique lectus et mauris ullamcorper, sed sagittis leo aliquet. Donec viverra elementum magna, a commodo libero congue a. Nulla placerat iaculis fermentum. Vestibulum ullamcorper sit amet est ac sollicitudin. Ut eleifend, odio ut mollis placerat, elit diam finibus augue, ac laoreet risus erat eleifend neque.',
      },
      {
        id: 4,
        username: 'usuario4',
        text: 'Esto es una publicación de prueba.',
      },
      {
        id: 5,
        username: 'usuario5',
        text: '¡Hola mundo!',
      },
      {
        id: 6,
        username: 'usuario6',
        text: 'Esto es una publicación de prueba.',
      },
      {
        id: 7,
        username: 'usuario7',
        text: '¡Hola mundo!',
      },
      {
        id: 8,
        username: 'usuario8',
        text: 'Esto es una publicación de prueba.',
      },
      {
        id: 9,
        username: 'usuario1',
        text: '¡Hola mundo!',
      },
      {
        id: 10,
        username: 'usuario2',
        text: 'Esto es una publicación de prueba.',
      },
      {
        id: 11,
        username: 'usuario3',
        text: '¡Hola mundo!',
      },
      {
        id: 12,
        username: 'usuario4',
        text: 'Esto es una publicación de prueba.',
      },
    ];
    setPosts(simulatedPosts);
  };

  useEffect(() => {
    // Simular inicio de sesión exitoso y obtener publicaciones cuando se monta el componente
    simulateSuccessfulLogin();
  }, []);

  const handleLogout = () => {
    // Navegar de regreso a la pantalla de inicio de sesión
    navigation.navigate('Login');
  };

  const handleConversationsPress = () => {
    // Navegar a la pantalla de conversaciones
    navigation.navigate('Conversations');
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.title}>Feed de Publicaciones</Text>
        
        <TouchableOpacity onPress={handleConversationsPress} style={styles.iconContainerChat}>
            <Ionicons name="chatbubbles-outline" size={24} color="black" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleConversationsPress} style={styles.iconContainerNewPost}>
          <Ionicons name="chatbubbles-outline" size={24} color="red" />
        </TouchableOpacity> */}
        
          {posts.map(post => (
            <View key={post.id} style={styles.postContainer}>
              <Text style={styles.username}>{post.username}</Text>
              <Text style={styles.text}>{post.text}</Text>
            </View>
          ))}

        <TouchableOpacity style={styles.screenButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

    );
}


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  iconContainerChat: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  iconContainerNewPost: {
    position: 'absolute',
    top: 20,
    right: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 500,
    borderRadius: 60,
    marginBottom: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    paddingLeft: 5,
  },
  screenButton: {
    padding: 10,
    margin: 5,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  }
});

export default FeedScreen;
