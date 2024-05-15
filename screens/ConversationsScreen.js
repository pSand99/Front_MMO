import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConversationsScreen = () => {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  // Array de objetos representando las conversaciones
  useEffect(() => {
    // Nuestros datos de ejemplo
    const simulatedConversations = [
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
            "user": "Usuario3",
            "lastMessage": "¿Has visto este meme? Es épico."
          },
          {
            "id": 4,
            "user": "Usuario4",
            "lastMessage": "¡Me encanta este meme!"
          },
          {
            "id": 5,
            "user": "Usuario5",
            "lastMessage": "Este meme es la definición de humor."
          },
          {
            "id": 6,
            "user": "Usuario6",
            "lastMessage": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac maximus nulla. Proin pretium dapibus aliquam. Etiam semper ligula sit amet quam maximus, in porta lectus consectetur. Nunc varius massa massa, quis vehicula arcu consequat nec. Nullam sit amet tempus ante. Sed ornare sollicitudin urna, sit amet lobortis quam. Integer id feugiat ex. Vivamus a volutpat odio. Aliquam tristique lectus et mauris ullamcorper"
          },
          {
            "id": 7,
            "user": "Usuario7",
            "lastMessage": "Tienes que ver este meme, te va a encantar."
          },
          {
            "id": 8,
            "user": "Usuario8",
            "lastMessage": "No puedo evitar reírme cada vez que veo este meme."
          },
          {
            "id": 9,
            "user": "Usuario9",
            "lastMessage": "Este meme es lo mejor que he visto hoy."
          },
          {
            "id": 10,
            "user": "Usuario10",
            "lastMessage": "¡Ja, ja, ja! Este meme es un clásico."
          },
          {
            "id": 11,
            "user": "Usuario11",
            "lastMessage": "¡Qué buen meme! Me sacó más de una carcajada."
          },
          {
            "id": 12,
            "user": "Usuario12",
            "lastMessage": "¿Te imaginas la cara de alguien viendo este meme por primera vez?"
          },
          {
            "id": 13,
            "user": "Usuario13",
            "lastMessage": "¡No puedo dejar de reírme con este meme!"
          },
          {
            "id": 14,
            "user": "Usuario14",
            "lastMessage": "¡Hola! Bien, gracias. ¿Y tú?"
          },
          {
            "id": 15,
            "user": "Usuario15",
            "lastMessage": "Nunca me canso de ver este meme."
          },
          {
            "id": 16,
            "user": "Usuario16",
            "lastMessage": "Este meme es oro puro!"
          },
          {
            "id": 17,
            "user": "Usuario17",
            "lastMessage": "¿Alguien más se ríe tanto como yo con este meme?"
          },
          {
            "id": 18,
            "user": "Usuario18",
            "lastMessage": "¡Este meme es tan oportuno!"
          },
          {
            "id": 19,
            "user": "Usuario19",
            "lastMessage": "No puedo explicar lo gracioso que es este meme."
          },
          {
            "id": 20,
            "user": "Usuario20",
            "lastMessage": "¿Has compartido este meme con tus amigos? Deberías."
          }
    ];
    setConversations(simulatedConversations);
  }, []);

  const handleConversationPress = (conversationId) => {
    // Aquí podemos navegar a la pantalla de detalle de la conversación
    // Por ahora, simularemos imprimir el ID de la conversación
    console.log(`Conversación seleccionada: ${conversationId}`);
  };

  // Calcula el ancho de cada mosaico basado en el ancho de la pantalla
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2; // Número de columnas deseadas
  const tileWidth = screenWidth / numColumns - 20; // Restamos 20 para dejar espacio entre mosaicos

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {conversations.map(conversation => (
        <TouchableOpacity
          key={conversation.id}
          style={[styles.conversationContainer, { width: tileWidth }]}
          onPress={() => handleConversationPress(conversation.id)}
        >
          <Text style={styles.username}>{conversation.user}</Text>
          <Text numberOfLines={2} style={styles.lastMessage}>{conversation.lastMessage}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row', // Alinear en fila
    flexWrap: 'wrap', // Permitir que los mosaicos se envuelvan
    justifyContent: 'space-between', // Espacio uniforme entre mosaicos
  },
  conversationContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
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
  lastMessage: {
    fontSize: 16,
  },
});

export default ConversationsScreen;
