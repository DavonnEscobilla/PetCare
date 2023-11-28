import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PetProfiles from './homeComponents/petProfiles';

const Home = ({ navigation }) => {
  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const handleAddProfile = () => {
    console.log('Add a new pet profile...');
  };

  
  return (
    <View style={styles.homeContainer}>
    <View style={styles.topContainer}>
      {/* Moved user profile icon to the end */}
        <TouchableOpacity
          style={styles.addProfileIcon}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon name="user-circle-o" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.feedContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
          <Image
            source={require('../Images/justLogo.png')}
            style={styles.homeLogo}
          />
        </TouchableOpacity>

        <Text style={styles.myPets}> My Pets </Text>

        <ScrollView style={styles.scrollView}>
          <PetProfiles />
        </ScrollView>
        
        <TouchableOpacity
          style={styles.postIcon}
          onPress={() => navigation.navigate('Post')}
        >
          <Icon name='paw' size={50} color="#D14E86" />
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
  topContainer: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    paddingTop: 40,
  },

  addProfileIcon: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingLeft: 355,
  },

  feedContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeLogo: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myPets: {
    fontSize: 20,
    marginTop: 0,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    marginVertical: 0,
    width: '100%',
    paddingLeft: 20,
  },
postIcon: {
  backgroundColor: 'transparent', 
    position: 'absolute',
    bottom: 20,
    right: 25,
    borderRadius: 20,
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    // elevation: 0.1, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: '#fff8dc',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
  },
});

export default Home;