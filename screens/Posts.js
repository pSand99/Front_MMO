import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PostScreen = () => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handlePost = () => {
    // Here you can handle the submission of the post text and image
    console.log('Post text:', postText);
    console.log('Selected image:', selectedImage);
    // Add your logic to submit the post to the backend or store locally
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Post</Text>
      <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        ) : (
          <Ionicons name="image-outline" size={48} color="black" />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={postText}
        onChangeText={setPostText}
        placeholder="Escribe tu post aquí..."
        multiline
      />
      <Button title="Publicar" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    minHeight: 100,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default PostScreen;