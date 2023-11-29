import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native'; // Import Linking

const MagnifyingGlassDog = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    Keyboard.dismiss(); // Dismiss the keyboard if open
    const encodedQuery = encodeURIComponent(searchQuery);
    const googleSearchUrl = `https://www.google.com/search?q=${encodedQuery}`;
    Linking.openURL(googleSearchUrl).catch(err => console.error("An error occurred", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../Images/pic.png')} style={styles.image} />
      </View>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Icon name="user-circle-o" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="arrow-left" size={20} color="white" />
      </TouchableOpacity>

      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={20} color="#D14E86" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Ask a question.."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch} // Call handleSearch when the user submits the input
        />
      </View>
    </View>
  );
};

// ... StyleSheet and other component code remains the same ...



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%', 
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    bottom: 50,
  },
  circle: {
    position: 'absolute',
    top: '7%',
    left: '5%',
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#D14E86',
  },
  profileIcon: {
    position: 'absolute',
    top: '8%',
    right: '5%',
  },
  searchBar: {
    width: '80%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    bottom: 60,
  },
  searchIcon: {
    padding: 10, 
  },

  textInputStyle: {
    flex: 1,
    marginLeft: 10, 
  }
});

export default MagnifyingGlassDog;
