import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PetProfiles from './homeComponents/petProfiles';

const UserProfile = ({ navigation }) => {
  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const handleAddProfile = () => {
    console.log('Add a new pet profile...');
  };

  const uploadedImage = require('../assets/defaultProfile.png'); // Replace with actual image URI
  const userName = 'Jane Emerson'; // Replace with the user's name

return (
    <View style={styles.homeContainer}>

      {/* Header Container */}
      <View style={styles.headerContainer}>
      <TouchableOpacity
          style={styles.backtoHome}
          onPress={() => navigation.navigate('Home')} 
          >
          <Icon name="arrow-left" size={30} color="#D14E86" />
        </TouchableOpacity>
      </View>

      {/* UserProfile Container */}
      <View style={styles.userProfileContainer}>
        <TouchableOpacity
          style={styles.userPhotoContainer}
          onPress={() => console.log('Upload photo')} // Action to upload photo
        >
          {/* Display uploaded image or default image */}
          <Image source={uploadedImage} style={styles.userPhoto} />
          {/* Icon for uploading photo */}
          <Icon name="camera" size={24} color="gray" style={styles.cameraIcon} />
        </TouchableOpacity>

        {/* User's name */}
        <Text style={styles.userName}>{userName}</Text> 

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Intro')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* PetProfile Container */}
      <View style={styles.petProfileContainer}>
        <TouchableOpacity
          style={styles.addPetButton}
          onPress={() => navigation.navigate('PetInput')}
        >
          <Icon name="plus-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')} 
          >
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MagnifyingGlassDog')}
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
  homeContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    paddingTop: 50,
    paddingLeft: 20,
  },
  userProfileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPhotoContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  userPhoto: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'transparent',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  petProfileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 14,
    color: 'gray',
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  logoutBotton:{
    // top: 100, // Corrected property name to lowercase 'top'
  },
  addPetIcon: {
    backgroundColor: 'transparent',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: '#fff8dc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
  },
});

export default UserProfile;