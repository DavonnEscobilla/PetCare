import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PetProfiles from './homeComponents/petProfiles';

const Home = ({ navigation }) => {
  const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log('Signing out...');
  };

  const handleAddProfile = () => {
    // Implement logic to add a new pet profile
    console.log('Add a new pet profile...');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signOutIcon}
        onPress={() => navigation.navigate('Intro')}
      >
        <Icon name="sign-out" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addProfileIcon}
        onPress={() => navigation.navigate('PetInput')}
      >
        <Icon name="plus-circle" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Icon name="user-circle-o" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.myPets}> My Pets </Text>
      <ScrollView>
        <PetProfiles />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Icon name="calendar" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signOutIcon: {
    position: 'absolute',
    top: 25,
    left: 10,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  addProfileIcon: {
    position: 'absolute',
    top: 25,
    right: 10,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: 25, 
    right: 60, 
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  myPets: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 100,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
  },
});

export default Home;
