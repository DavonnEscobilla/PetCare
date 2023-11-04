// PetInput.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PetInput = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');

  const savePetData = () => {
    // Logic to save pet data

    // Navigate to SavePetProfile screen and pass the pet profile as a parameter
    navigation.navigate('SavePetProfile', { petProfile: { name, age, dob } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Pet Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={(text) => setDob(text)}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Save Pet Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetInput;
