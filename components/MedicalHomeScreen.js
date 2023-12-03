import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import the back arrow icon
import Icon from 'react-native-vector-icons/FontAwesome';
import RecordListScreen from './RecordListScreen';

const MedicalHomeScreen = ({ navigation }) => {
  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

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
      
      <View style={styles.petContainer}>
        <Text style={styles.petTitle}>My Pets</Text>
        <View style={styles.petImagesContainer}>
          {/* Images of pets */}
        </View>
      </View>


      <View style={styles.vaccineContainer}>
        <Text style={styles.vaccineTitle}>Vaccinations</Text>
        <View style={styles.vaccineInfoContainer}>
          {/* Images of pets */}
        </View>
      </View>

      <View style={styles.groomingContainer}>
        <Text style={styles.groomingTitle}>Grooming</Text>
        <View style={styles.groomingInfoContainer}>
          {/* Images of pets */}
        </View>
      </View>

      {/* Content */}
      <RecordListScreen navigateToScreen={navigateToScreen} />

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
