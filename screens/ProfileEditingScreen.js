import React, { useState, useEffect } from "react"
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
} from "react-native"
import API_BASE_URL from "../config"
import { convertToBase64 } from "../utils/Utils"
import { TouchableOpacity } from "react-native-web"

const { width } = Dimensions.get("window")

const ProfileEditingScreen = () => {
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    name: "",
    surname: "",
    birth_date: "",
    signup_date: "",
  })

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
        setUser({ avatar: avatarUrl, username: data.username, name: data.name, surname: data.surname, birth_date: data.birth_date, signup_date: data.signup_date})
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchData()
  }, [])

  // Método para el botón de seleccionar imagen
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access camera roll denied');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.profileImage} onPress={handleSelectImage}>
            <Image source={{ uri: user.avatar }} style={styles.profileImage} />
        </TouchableOpacity>
        <TextInput style={styles.inputTextProp} value={usemmmmmmmr.username} editable={false} />
        <TextInput style={styles.inputTextProp} secureTextEntry={true} value="password" editable={false} />
        <TextInput style={styles.inputTextProp} value={user.name} editable={false} />
        <TextInput style={styles.inputTextProp} value={user.surname ? user.surname : "null"} editable={false} />
        <TextInput style={styles.inputTextProp} value={user.birth_date ? user.birth_date : "null"} editable={false} />

        <View style={{flexDirection: 'row', marginTop: 15,}}>
            <Text style={styles.username}>Te registraste en meme-o en </Text>
            <Text style={styles.username} >{user.signup_date}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
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
  inputTextProp: {
    borderBottomColor: "black",
    borderWidth: 1,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: 'lightgray',
    color: 'gray',
  },
  plainText:{
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  }
})

export default ProfileEditingScreen