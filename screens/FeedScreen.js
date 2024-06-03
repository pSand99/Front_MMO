import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import PostItem from "../components/PostItem"
import CommentModal from "../components/CommentModal"

const FeedScreen = () => {
  const [posts, setPosts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    fetch("http://172.20.10.2:9000/memeo/api/getposts/2")
      .then((response) => response.text())
      .then((data) => {
        console.log("Data fetched: ", data)
        setPosts(JSON.parse(data))
      })
      .catch((error) => console.error("Error fetching data: ", error))
  }, [])

  // const simulateSuccessfulLogin = () => {
  //   // Simular obtención de publicaciones
  //   const simulatedPosts = [
  //     {
  //       id: 1,
  //       username: "usuario1",
  //       text: "¡Hola mundo!",
  //       likes: 0,
  //       liked: false,
  //     },
  //     {
  //       id: 2,
  //       username: "usuario2",
  //       text: "Esto es una publicación de prueba.",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 3,
  //       username: "usuario3",
  //       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac maximus nulla. Proin pretium dapibus aliquam. Etiam semper ligula sit amet quam maximus, in porta lectus consectetur. Nunc varius massa massa, quis vehicula arcu consequat nec. Nullam sit amet tempus ante. Sed ornare sollicitudin urna, sit amet lobortis quam. Integer id feugiat ex. Vivamus a volutpat odio. Aliquam tristique lectus et mauris ullamcorper, sed sagittis leo aliquet. Donec viverra elementum magna, a commodo libero congue a. Nulla placerat iaculis fermentum. Vestibulum ullamcorper sit amet est ac sollicitudin. Ut eleifend, odio ut mollis placerat, elit diam finibus augue, ac laoreet risus erat eleifend neque.",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 4,
  //       username: "usuario4",
  //       text: "Esto es una publicación de prueba.",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 5,
  //       username: "usuario5",
  //       text: "¡Hola mundo!",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 6,
  //       username: "usuario6",
  //       text: "Esto es una publicación de prueba.",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 7,
  //       username: "usuario7",
  //       text: "¡Hola mundo!",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 8,
  //       username: "usuario8",
  //       text: "Esto es una publicación de prueba.",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 9,
  //       username: "usuario1",
  //       text: "¡Hola mundo!",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 10,
  //       username: "usuario2",
  //       text: "Esto es una publicación de prueba.",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 11,
  //       username: "usuario3",
  //       text: "¡Hola mundo!",
  //       likes: 5,
  //       liked: false,
  //     },
  //     {
  //       id: 12,
  //       username: "usuario4",
  //       text: "Esto es una publicación de prueba.",
  //       likes: 5,
  //       liked: false,
  //     },
  //   ]
  //   setPosts(simulatedPosts)
  // }

  // useEffect(() => {
  //   // simulateSuccessfulLogin();
  // }, []);

  const handleLogout = () => {
    navigation.navigate("Login")
  }

  const handleConversationsPress = () => {
    navigation.navigate("Conversations")
  }

  const handleNavigateToPostScreen = () => {
    navigation.navigate("Posts")
  }

  const handleAddComment = () => {
    if (newComment.trim() === "") return
    setComments((prevComments) => ({
      ...prevComments,
      [selectedPost.id]: [...(prevComments[selectedPost.id] || []), newComment],
    }))
    setNewComment("")
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedPost(null)
    setNewComment("")
  }

  const handleLikePress = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )

    // Optionally, you can also make an API call to update the likes on the server
    // fetch(`https://192.168.56.1/api/posts/${postId}/like`, {
    //   method: 'POST',
    //   body: JSON.stringify({ like: !liked }),
    // })
    // .catch(error => console.error("Error updating likes: ", error));
  }

  const handleCommentsPress = (postId) => {
    const selected = posts.find((post) => post.id === postId)
    setSelectedPost(selected)
    setModalVisible(true)
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Feed de Publicaciones</Text>
        <TouchableOpacity
          onPress={handleConversationsPress}
          style={styles.iconContainerChat}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToPostScreen}
          style={styles.addButton}>
          <Text style={styles.buttonText}>Añadir post</Text>
        </TouchableOpacity>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onLikePress={handleLikePress}
            onCommentsPress={handleCommentsPress}
          />
        ))}
        <TouchableOpacity style={styles.screenButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
      {selectedPost !== null && (
        <CommentModal
          visible={modalVisible}
          comments={comments[selectedPost.id] || []}
          newComment={newComment}
          onAddComment={handleAddComment}
          onClose={handleCloseModal}
          onChangeText={setNewComment}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  iconContainerChat: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  screenButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "blue",
    borderRadius: 10,
  },
})

export default FeedScreen
