//Pet Profile
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { database } from '../firebase';
import { ref, onValue, off } from 'firebase/database'; // Ensure the off method is imported

const PetsComponent = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const petsRef = ref(database, 'pets');

    // Start listening for updates from the specified Firebase database reference.
    const unsubscribe = onValue(petsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Data received from Firebase:', data); // Additional logging for debugging
      const petsArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setPets(petsArray);
    }, (error) => {
      console.error(error);
    });

    // Stop listening for updates when the component is unmounted
    return () => off(petsRef); // Correctly unsubscribe from the listener
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.petCard}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petBreed}>Breed: {item.breed}</Text>
        <Text style={styles.petAge}>Age: {item.age}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pets</Text>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  petCard: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 10,
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petBreed: {
    fontSize: 14,
    color: 'gray',
  },
  petAge: {
    fontSize: 14,
    color: 'gray',
  },
});

export default PetsComponent;
