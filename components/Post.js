import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const Post = ({ navigation, route }) => {
  const { onAddPost } = route.params;
  const [postContent, setPostContent] = useState('');

  const handleSubmit = () => {
    onAddPost({ content: postContent });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.headerButton}>
          <Text style={styles.buttonText}>Paws</Text>
        </TouchableOpacity>
      </View>

      {/* Body Content */}
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="What's on your mind?"
        value={postContent}
        onChangeText={setPostContent}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  headerButton: {
    paddingTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#D14E86',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    minHeight: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
});

export default Post;
