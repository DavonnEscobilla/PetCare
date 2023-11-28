import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Post = ({ navigation }) => {
  // Function to handle going back to the previous screen
  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
    {/* Back button */}
    <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create a New Post</Text>
      {/* Content of your post */}
      <Text>This is the content of the post.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Post;
