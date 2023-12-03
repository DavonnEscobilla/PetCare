// PetInput.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { database } from '../firebase';
import { ref, push, update, get } from 'firebase/database';


const PetInput = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [breed, setBreed] = useState('');

  const savePetData = async () => {
    try {
      const petProfile = { name, age, dob, weight, breed };

      // Save the pet data to Firebase Realtime Database
      const newPetRef = push(ref(database, 'pets'));
      await update(newPetRef, petProfile);

      console.log('Pet profile saved with ID: ', newPetRef.key);

      // Navigate back to the pets list screen
      navigation.goBack(); // Ensure that this navigates back to PetsComponent
    } catch (error) {
      console.error('Error saving pet data', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create pet account</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Pet Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date of birth</Text>
            <TextInput
              style={styles.input} 
              placeholder="MM/DD/YYYY"
              value={dob}
              onChangeText={(text) => setDob(text)}
            />
      <View style={styles.calendarContainer}>
      <TouchableOpacity onPress={() => console.log('Calendar icon pressed')}>
              <Icon name="calendar" size={20} color="#D14E86" style={styles.calendarIcon} />
      </TouchableOpacity></View>

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Weight"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Breed"
        value={breed}
        onChangeText={(text) => setBreed(text)}
      />
      <TouchableOpacity style={styles.button} onPress={savePetData}>
        <Text style={styles.buttonText}>Save Pet Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D14E86',
    marginBottom: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginLeft: 40,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#D14E86',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  calendarContainer: {
    alignSelf: 'flex-end',
    right: 50,
    top: -50,
    marginBottom: -10,
  },
  
});

export default PetInput;