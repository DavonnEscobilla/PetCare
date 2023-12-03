import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { auth, database } from '../firebase';
import { ref, onValue, off } from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons'; // Import the back arrow icon
import RecordListScreen from './RecordListScreen';


const MedicalHomeScreen = ({ navigation }) => {
  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };
  
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    const userId = auth.currentUser.uid;
    const userPetsRef = ref(database, `users/${userId}/pets`);

    const unsubscribe = onValue(userPetsRef, (snapshot) => {
      const data = snapshot.val();
      const petsArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setPets(petsArray);
    }, (error) => {
      console.error(error);
    });

    return () => off(userPetsRef);
  }, []);

  const renderPet = ({ item }) => (
    <View style={styles.petImageContainer}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <Text style={styles.petName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow Button */}
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>Pet Health</Text>
      </View>

      {/* Pet Images Container */}
      <View style={styles.petContainer}>
      <Text style={styles.petTitle}>My Pets</Text>
      <View style={styles.petImagesContainer}>
        <FlatList
          data={pets}
          renderItem={renderPet}
          keyExtractor={(item) => item.id}
          horizontal={true}
          
        />
      </View>
      </View>

      {/* Content */}
      <RecordListScreen navigateToScreen={navigation} />

      {/* Add Record Button */}
      <TouchableHighlight
        style={styles.addButton}
        onPress={() => navigateToScreen('AddRecord')}
      >
        <Text style={styles.buttonText}>Add Record</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  header: {
    backgroundColor: '#D14E86',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0.6, // Adjust this to your liking for left padding
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 25,
    padding: 15,
    borderRadius: 0,
    backgroundColor: '#D14E86',
    alignSelf: 'flex-start',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  petContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 150,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for x and y
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 1, // Use elevation for Android
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  petImagesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petName: {
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#D14E86',
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20, // Add margin top if needed
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    // Add other styling properties for the buttons if needed
  },
  petContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 150,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for x and y
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 1, // Use elevation for Android
  },
  
  petTitle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    
  },
  vaccineContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 150,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for x and y
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 1, // Use elevation for Android
  },

  vaccineTitle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  groomingContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 150,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for x and y
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 1, // Use elevation for Android
  },
  groomingTitle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default MedicalHomeScreen;
