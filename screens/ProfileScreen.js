import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native"
import API_BASE_URL from "../config"
import { convertToBase64 } from "../utils/Utils"

const { width } = Dimensions.get("window")
const NUM_COLUMNS = 2

// const user = {
//   profileImage: 'https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?t=st=1717233516~exp=1717237116~hmac=d6a88ab2fd33d9fc83f6389e6ac669ec688eb2c150ce77d719cc30176ff38e42&w=826',
//   username: 'meme_user',
//   images: [
//     { id: '1', src: 'https://ethic.es/wp-content/uploads/2023/01/memes-antes.jpg', caption: 'Caption 1' },
//     { id: '2', src: 'https://example.com/image2.jpg', caption: 'Caption 2' },
//     { id: '3', src: 'https://example.com/image3.jpg', caption: 'Caption 3' },
//     { id: '4', src: 'https://example.com/image4.jpg', caption: 'Caption 4' },
//     { id: '5', src: 'https://example.com/image4.jpg', caption: 'Caption 5' },
//     { id: '6', src: 'https://example.com/image4.jpg', caption: 'Caption 6' },
//     { id: '7', src: 'https://example.com/image4.jpg', caption: 'Caption 7' },
//     { id: '8', src: 'https://example.com/image4.jpg', caption: 'Caption 8' },
//     { id: '9', src: 'https://example.com/image4.jpg', caption: 'Caption 9' },
//     // ... más imágenes
//   ],
// };

const ProfileScreen = () => {
  //const [user, setUser] = useState([])

  const [user, setUser] = useState({
    avatar: "",
    username: "",
    posts: [],
  })

  // const renderItem = ({ item }) => (
  //   <View style={styles.imageContainer}>
  //     <Image source={{ uri: item.src }} style={styles.image} />
  //     <Text style={styles.caption}>{item.caption}</Text>
  //   </View>
  // )

  // useEffect(() => {
  //   fetch("http://192.168.0.13:9000/memeo/api/getuser/4")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log("Data fetched: ", data)
  //       setUser(JSON.parse(data))
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error))
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.56.1:9000/memeo/api/getuser/2"
        )
        const data = await response.json()
        const avatarUrl = await convertToBase64(
          `${API_BASE_URL}/${data.avatar}`
        )
        const posts = await Promise.all(
          data.posts.map(async (post) => {
            const imageUrl = await convertToBase64(
              `${API_BASE_URL}/${post.media_file}`
            )
            return { ...post, media_file: imageUrl }
          })
        )
        setUser({ avatar: avatarUrl, username: data.username, posts: posts })
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchData()
  }, [])

  // const convertToBase64 = async (url) => {
  //   try {
  //     const response = await fetch(url)
  //     const blob = await response.blob()
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader()
  //       reader.onloadend = () => {
  //         resolve(reader.result)
  //       }
  //       reader.onerror = reject
  //       reader.readAsDataURL(blob)
  //     })
  //   } catch (error) {
  //     console.error("Error converting to base64: ", error)
  //     return null
  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.profileImage} />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.imagesList}>
        {user.posts.map((post) => (
          <View key={post.postID} style={styles.imageContainer}>
            <Image source={{ uri: post.media_file }} style={styles.image} />
            <Text style={styles.caption}>{post.text_content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imagesList: {
    flex: 1,
    position: "absolute",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: width / NUM_COLUMNS - 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 40,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: width / NUM_COLUMNS - 20,
  },
  caption: {
    padding: 5,
    textAlign: "center",
  },
})

export default ProfileScreen
