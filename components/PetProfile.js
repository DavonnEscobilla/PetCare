//Pet Profile
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, database } from '../firebase';
import { ref, onValue, off, remove } from 'firebase/database'; // Ensure the off method is imported
import Icon from 'react-native-vector-icons/FontAwesome';

const PetsComponent = () => {
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
      const petsArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setPets(petsArray);
    }, (error) => {
      console.error(error);
    });
  
    return () => off(userPetsRef);
  }, []);
  

  const renderItem = ({ item }) => (
    <View style={styles.petCard}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petBreed}>Breed: {item.breed}</Text>
        <Text style={styles.petAge}>Age: {item.age}</Text>
      </View>
      <TouchableOpacity onPress={() => deletePetProfile(item.id)}>
        <Icon name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );  

  const deletePetProfile = async (petId) => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }
  
    try {
      const userId = auth.currentUser.uid;
      const petRef = ref(database, `users/${userId}/pets/${petId}`);
      await remove(petRef);
      console.log('Pet profile deleted:', petId);
    } catch (error) {
      console.error('Error deleting pet data', error);
      Alert.alert('Error', 'Failed to delete pet data.');
    }
  };  

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
    marginTop: 5,
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
