import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { convertToBase64 } from "../utils/Utils"
import { useState, useEffect } from "react"
import API_BASE_URL from "../config"

const { width } = Dimensions.get("window")
const NUM_COLUMNS = 2

const user = {
  userID: 2,
  username: "username",
}

const PostItem = ({ post, onLikePress, onCommentsPress }) => {
  const [base64Image, setBase64Image] = useState(null)

  const [comment, setComment] = useState({
    user: {
      username: "",
    },
    text_content: "",
  })

  useEffect(() => {
    const convertImage = async () => {
      const base64 = await convertToBase64(`${API_BASE_URL}/${post.media_file}`)
      setBase64Image(base64)
    }
    convertImage()
    setComment({ user: { username: post.user.username } })
  }, [post.media_file])

  return (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{post.user.username}</Text>
      <Image source={{ uri: base64Image }} style={styles.image} />
      <Text style={styles.text}>{post.text_content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity
          // onPress={() => onLikePress()}
          style={styles.iconButton}>
          {/* <Ionicons
            name={
              post.memeLikes.some((likes) => likes.user.userID === user.userID)
                ? "heart"
                : "heart-outline"
            }
            size={24}
            color={
              post.memeLikes.some((likes) => likes.user.userID === user.userID)
                ? "red"
                : "black"
            }
          /> */}
          <Ionicons name="heart-outline" size={24} color="73788B"></Ionicons>
          <Text style={styles.likeCount}>{post.memeLikes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onCommentsPress(post.postID)}
          style={styles.iconButton}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {Array.isArray(post.comments) &&
        post.comments.length > 0 &&
        post.comments.map((comment) => (
          <View key={comment.commentID} style={styles.commentContainer}>
            <Text style={styles.commentText}>{comment.user.username}</Text>
            <Text style={styles.commentText}>{comment.text_content}</Text>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 500,
    borderRadius: 60,
    marginBottom: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: width / NUM_COLUMNS - 20,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    paddingLeft: 5,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  iconButton: {
    marginLeft: 10,
    lexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 5,
  },
})

export default PostItem
