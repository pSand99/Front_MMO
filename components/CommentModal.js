import React from 'react';
import { View, Text, Modal, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CommentModal = ({ visible, comments, newComment, onAddComment, onClose, onChangeText }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Comentarios</Text>
          <ScrollView>
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentBubble}>
                <Text style={styles.commentText}>{comment}</Text>
              </View>
            ))}
          </ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Añadir un comentario..."
            value={newComment}
            onChangeText={onChangeText}
          />
          <TouchableOpacity style={styles.addButton} onPress={onAddComment}>
            <Text style={styles.buttonText}>Añadir Comentario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default CommentModal;