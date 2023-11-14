import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MagnifyingGlassDog = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

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

      <TextInput
        style={[styles.searchBar, styles.absolutePosition]}
        placeholder="Ask a question.."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View style={styles.searchIcon}>
        <Icon name="search" size={20} color="#D14E86" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    top: -100,
  },
  circle: {
    position: 'absolute',
    top: 60,
    left: 25,
    padding: 15,
    borderRadius: 0,
    backgroundColor: '#D14E86',
    alignSelf: 'flex-start',
  },
  profileIcon: {
    position: 'absolute',
    top: 25,
    right: 10,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  searchBar: {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    top: 420,
  },
  absolutePosition: {
    position: 'absolute',
    bottom: 50,
  },
  searchIcon: {
    right: -75,
    top: -90,
  },
});

export default MagnifyingGlassDog;
