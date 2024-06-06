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
import API_BASE_URL from "../config"

const user = {
  userID: 2,
  username: "username",
}

const FeedScreen = () => {
  const [posts, setPosts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState({})
  const navigation = useNavigation()

  const [memeLikes, setMemeLikes] = useState([
    {
      user: {
        userID: user.userID,
        username: user.username,
      },
    },
  ])

  useEffect(() => {
    fetch("http://192.168.0.13:9000/memeo/api/getposts/2")
      .then((response) => response.text())
      .then((data) => {
        console.log("Data fetched: ", data)
        debugger
        setPosts(JSON.parse(data))
      })
      .catch((error) => console.error("Error fetching data: ", error))
  }, [])

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

  const handleLikePress = async (postID, userID) => {
    const postToUpdate = posts.find((post) => post.postID === postID)
    const userLiked = postToUpdate.memeLikes.some(
      (like) => like.user.userID === user.userID
    )
    const url = userLiked
      ? `${API_BASE_URL}/memeo/api/deletememelike/${userID}/${postID}`
      : `${API_BASE_URL}/memeo/api/creatememelike`

    try {
      const response = await fetch(url, {
        method: userLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userLiked
          ? null
          : JSON.stringify({
              post: {
                postID: postID,
              },
              user: {
                userID: userID,
              },
            }),
      })

      if (!response.ok) {
        throw new Error("Error al realizar la operación de like.")
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postID === postID
            ? {
                ...post,
                memeLikes: userLiked
                  ? post.memeLikes.filter(
                      (like) => like.user.userID !== user.userID
                    )
                  : [...post.memeLikes, response],
              }
            : post
        )
      )
    } catch (error) {
      console.error("Error:", error)
    }
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
            key={post.postID}
            post={post}
            // onLikePress={handleLikePress(post.postID, user.userID)}
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
