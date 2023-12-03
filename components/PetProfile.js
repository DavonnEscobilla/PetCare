//Pet Profile
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, database } from '../firebase';
import { ref, onValue, off, remove, update } from 'firebase/database'; // Ensure the update method is imported
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

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

  const pickImage = async (petId) => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    // Select image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.cancelled) {
      updatePetImage(petId, result.uri);
    } else {
      console.error('Image picker was cancelled or failed to return an image.');
    }
  };

  // Function to update pet image in Firebase
  const updatePetImage = async (petId, uri) => {
    if (uri === undefined) {
      console.error('Error: URI is undefined.');
      Alert.alert('Error', 'Cannot update pet image with undefined URI.');
      return;
    }
  
    const petRef = ref(database, `users/${auth.currentUser.uid}/pets/${petId}`);
    try {
      await update(petRef, {
        image: uri,
      });
      // Update local state
      setPets((currentPets) =>
        currentPets.map((pet) => {
          if (pet.id === petId) {
            return { ...pet, image: uri };
          }
          return pet;
        })
      );
    } catch (error) {
      console.error('Error updating pet image', error);
      Alert.alert('Error', 'Failed to update pet image.');
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.petCard}>
      <TouchableOpacity onPress={() => pickImage(item.id)}>
        <Image
          source={{ uri: item.image || 'default_pet_image_placeholder' }}
          style={styles.petImage}
        />
      </TouchableOpacity>
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petBreed}>Breed: {item.breed}</Text>
        <Text style={styles.petAge}>Age: {item.age}</Text>
        <Text style={styles.petDob}>Birthday: {item.dob}</Text>
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
    borderWidth: 2, // Set the border width
    borderColor: 'black', // Change this to your desired color
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
