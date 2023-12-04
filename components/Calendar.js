import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { auth, database } from '../firebase';
import { ref, onValue, off } from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';

const PetContainer = ({ pet, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.petContainer}>
    <Image source={{ uri: pet.image }} style={styles.petImage} />
    <Text style={styles.petName}>{pet.name}</Text>
  </TouchableOpacity>
);

const App = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const [pets, setPets] = useState([]); // State to hold the pet data

  useEffect(() => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    const userId = auth.currentUser.uid;
    const userPetsRef = ref(database, `users/${userId}/pets`);

    onValue(userPetsRef, (snapshot) => {
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

  const navigateToCalendarEvent = (pet) => {
    navigation.navigate('CalendarEvent', { pet });
  };

  const renderPet = ({ item }) => (
    <PetContainer pet={item} onPress={() => navigateToCalendarEvent(item)} />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.circle} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Calendar</Text>
      </View>

      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#FFB4D4',
            selectedTextColor: 'white',
            selectedDotColor: '#FFB4D4'
          }
        }}
        theme={{
          arrowColor: '#FFB4D4',
        }}
        style={{
          borderRadius: 10,
          elevation: 6,
          margin: 40
        }}
      />

      <Text style={styles.petSectionTitle}>My Pets</Text>
      <FlatList
        data={pets}
        renderItem={renderPet}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.petList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D14E86',
    height: 100,
    paddingHorizontal: 50,
    paddingTop: 20
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
  },
  circle: {
    position: 'absolute',
    left: 16,
    top: 40,
  },
  petSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  petList: {
    flexGrow: 0, // Ensure the FlatList doesn't grow larger than its content
    paddingHorizontal: 20,
  },
  petContainer: {
    backgroundColor: '#FFB4D4',
    borderRadius: 20,
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 20,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  petName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
