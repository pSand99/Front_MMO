import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState({});
  const navigation = useNavigation();

  useEffect(() =>{
    fetch('https://192.168.56.1/api')
    .then(response => response.text)
    // .then(data => setMessage(Data))
    .then(data => {
      console.log("Data fetched: ", data); // Log data
      setPosts(JSON.parse(data));
    })
    // .then(error => console.error(error))
    .catch(error => console.error("Error fetching data: ", error));
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

  const handleNavigateToPostScreen = () => {
    navigation.navigate('Posts');
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    setComments(prevComments => ({
      ...prevComments,
      [selectedPost]: [...(prevComments[selectedPost] || []), newComment]
    }));
    setNewComment('');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
    setNewComment('');
  };

  const handleLikePress = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const handleCommentsPress = (postId) => {
    const selected = posts.find(post => post.id === postId);
    setSelectedPost(selected);
    setModalVisible(true);
  };


  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.title}>Feed de Publicaciones</Text>
        
        <TouchableOpacity onPress={handleConversationsPress} style={styles.iconContainerChat}>
            <Ionicons name="chatbox-outline" size={24} color="black" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleConversationsPress} style={styles.iconContainerNewPost}>
          <Ionicons name="chatbubbles-outline" size={24} color="red" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleNavigateToPostScreen} style={styles.addButton}>
          <Text style={styles.buttonText}>Añadir post</Text>
        </TouchableOpacity>

          {posts.map(post => (
            <View key={post.id} style={styles.postContainer}>
              <Text style={styles.username}>{post.username}</Text>
              <Text style={styles.text}>{post.text}</Text>
              {/* <TouchableOpacity onPress={() => handleOpenComments(post.id)} style={styles.commentIcon}>
                <Ionicons name="chatbubbles-outline" size={24} color="gray" />
              </TouchableOpacity> */}
              <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleLikePress(post.id)} style={styles.iconButton}>
                <Ionicons
                  name={post.liked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={post.liked ? 'red' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCommentsPress(post.id)} style={styles.iconButton}>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {post.comments && post.comments.map((comment, index) => (
              <View key={index} style={styles.commentContainer}>
                <Text style={styles.commentText}>{comment}</Text>
              </View>
            ))}
            </View>
          ))}

        <TouchableOpacity style={styles.screenButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {selectedPost !== null && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Comentarios</Text>
              <ScrollView>
                {(comments[selectedPost] || []).map((comment, index) => (
                  <View key={index} style={styles.commentBubble}>
                    <Text style={styles.commentText}>{comment}</Text>
                  </View>                
                ))}
              </ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Añadir un comentario..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
                <Text style={styles.buttonText}>Añadir Comentario</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

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
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  screenButton: {
    padding: 10,
    margin: 5,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentIcon: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentBubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  commentText: {
    fontSize: 16,
    // marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default FeedScreen;
