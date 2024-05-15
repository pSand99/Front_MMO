import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Aquí realizamos la solicitud a la API REST para obtener las publicaciones
    fetch('http://localhost:8080/api/time')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error al obtener las publicaciones:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map(post => (
        <View key={post.id} style={styles.postContainer}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.text}>{post.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    padding: 15,
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
  },
});

export default FeedScreen;
