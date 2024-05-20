import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SingleChatScreen = () => {
  const [conversations, setChats] = useState([]);
  const navigation = useNavigation();

  // Array de objetos representando las conversaciones
  useEffect(() => {
    // Nuestros datos de ejemplo
    const simulatedChats = [
        {
            "id": 1,
            "user": "Usuario1",
            "lastMessage": "¡Ja, ja! Este meme es genial."
          },
          {
            "id": 2,
            "user": "Usuario2",
            "lastMessage": "Este meme me hizo el día."
          },
          {
            "id": 3,
            "user": "Usuario1",
            "lastMessage": "¿Has visto este meme? Es épico."
          },
          {
            "id": 4,
            "user": "Usuario2",
            "lastMessage": "¡Me encanta este meme!"
          },
          {
            "id": 5,
            "user": "Usuario1",
            "lastMessage": "Este meme es la definición de humor."
          },
          {
            "id": 6,
            "user": "Usuario2",
            "lastMessage": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac maximus nulla. Proin pretium dapibus aliquam. Etiam semper ligula sit amet quam maximus, in porta lectus consectetur. Nunc varius massa massa, quis vehicula arcu consequat nec. Nullam sit amet tempus ante. Sed ornare sollicitudin urna, sit amet lobortis quam. Integer id feugiat ex. Vivamus a volutpat odio. Aliquam tristique lectus et mauris ullamcorper"
          },
          {
            "id": 7,
            "user": "Usuario1",
            "lastMessage": "Tienes que ver este meme, te va a encantar."
          },
          {
            "id": 8,
            "user": "Usuario2",
            "lastMessage": "No puedo evitar reírme cada vez que veo este meme."
          },
          {
            "id": 9,
            "user": "Usuario1",
            "lastMessage": "Este meme es lo mejor que he visto hoy."
          },
          {
            "id": 10,
            "user": "Usuario2",
            "lastMessage": "¡Ja, ja, ja! Este meme es un clásico."
          },
          {
            "id": 11,
            "user": "Usuario1",
            "lastMessage": "¡Qué buen meme! Me sacó más de una carcajada."
          },
          {
            "id": 12,
            "user": "Usuario2",
            "lastMessage": "¿Te imaginas la cara de alguien viendo este meme por primera vez?"
          },
          {
            "id": 13,
            "user": "Usuario1",
            "lastMessage": "¡No puedo dejar de reírme con este meme!"
          },
          {
            "id": 14,
            "user": "Usuario2",
            "lastMessage": "¡No puedo dejar de reírme con este meme!"
          },
          {
            "id": 15,
            "user": "Usuario1",
            "lastMessage": "¡No puedo dejar de reírme con este meme!"
          }
    ];
    setChats(simulatedChats);
  }, []);

  // Calcula el ancho de cada mensaje basado en el ancho de la pantalla
  const screenWidth = Dimensions.get('window').width; //HACERLO MÁS PEQUEÑO!!!!!
  const messageWidth = screenWidth * 0.6; // 60% del ancho de la pantalla

  return (
    <View style={styles.outerContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        {conversations.map((chat, index) => (
            <View
            key={chat.id}
            style={[
                styles.messageContainer,
                { 
                width: messageWidth,
                alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                backgroundColor: index % 2 === 0 ? 'lightgray' : 'lightblue'
                }
            ]}
            >
                <Text style={styles.username}>{chat.user}</Text>
                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            </View>
        ))}
        </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
      position: 'absolute',
      padding: 10,
      flexDirection: 'column',
      flexWrap: 'wrap', // Permitir que los mosaicos se envuelvan
      justifyContent: 'space-between', // Espacio uniforme entre mosaicos
    },
    messageContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 35,
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
    lastMessage: {
      fontSize: 16,
    },
  });
  

export default SingleChatScreen;
