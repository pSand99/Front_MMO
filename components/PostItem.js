// PostItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostItem = ({ post, onLikePress, onCommentsPress }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{post.username}</Text>
      <Text style={styles.text}>{post.text}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => onLikePress(post.id)} style={styles.iconButton}>
          <Ionicons
            name={post.liked ? 'heart' : 'heart-outline'}
            size={24}
            color={post.liked ? 'red' : 'black'}
          />
           <Text style={styles.likeCount}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onCommentsPress(post.id)} style={styles.iconButton}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {post.comments && post.comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
    lexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
  },

//   commentContainer: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     padding: 10,
//     marginTop: 10,
//   },
//   commentText: {
//     fontSize: 16,
//   },
  
});

export default PostItem;