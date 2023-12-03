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
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>Medical Records</Text>
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
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MagnifyingGlassDog')}
        >
          <Icon name="search" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendar')}>
          <Icon name="calendar" size={30} color="black" />
        </TouchableOpacity>
      </View>

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
    left: 30, // Adjust this value to control the distance from the right edge
    marginTop: 30, // Increase this value to move the back button further down
  },
  
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  
  addButton: {
    backgroundColor: 'pink',
    borderWidth: 3,
    borderColor: '#ff08bd',
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
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
});

export default MedicalHomeScreen;
