import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { auth, database } from '../firebase'; // Replace with the actual path to your firebase configuration file
import { ref, onValue, off, remove as removeData } from 'firebase/database';
import { AntDesign } from '@expo/vector-icons';

const MedicalHomeScreen = ({ navigation }) => {
  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  const [pets, setPets] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    const userId = auth.currentUser.uid;
    const userPetsRef = ref(database, `users/${userId}/pets`);
    const userRecordsRef = ref(database, `users/${userId}/records`);

    const unsubscribePets = onValue(userPetsRef, (snapshot) => {
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

    const unsubscribeRecords = onValue(userRecordsRef, (snapshot) => {
      const data = snapshot.val();
      const recordsArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setRecords(recordsArray);
    }, (error) => {
      console.error(error);
    });

    return () => {
      off(userPetsRef);
      off(userRecordsRef);
    };
  }, []);

  const removeRecord = (recordId) => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    const userId = auth.currentUser.uid;
    const userRecordsRef = ref(database, `users/${userId}/records/${recordId}`);

    // Remove the record from the database
    removeData(userRecordsRef)
      .then(() => {
        console.log(`Record removed from the database: ${recordId}`);
      })
      .catch((error) => {
        console.error('Error removing record from the database:', error);
      });

    // Remove the record from the state
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== recordId));
  };

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
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>My Records</Text>
        <FlatList
          data={records}
          renderItem={({ item }) => (
            <View style={styles.recordContainer}>
              <View style={styles.recordColumn}>
                <Text style={styles.recordLabel}>Pet Name:</Text>
                <Text>{item.petName}</Text>
              </View>
              <View style={styles.recordColumn}>
                <Text style={styles.recordLabel}>Record Type:</Text>
                <Text>{item.recordType}</Text>
              </View>
              <View style={styles.recordColumn}>
                <Text style={styles.recordLabel}>Record Date:</Text>
                <Text>{item.recordDate}</Text>
              </View>
              <View style={styles.recordColumn}>
                <Text style={styles.recordLabel}>Doctor Assigned:</Text>
                <Text>{item.doctorAssigned}</Text>
              </View>

              {/* Remove Button */}
              <TouchableHighlight
                style={styles.removeButton}
                onPress={() => removeRecord(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

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
    marginBottom: 15,
  },
  header: {
    backgroundColor: '#D14E86',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0.6,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
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
  petTitle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1, // Add this line to make the content scrollable
    marginTop: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  recordContainer: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 10,
  },
  recordLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: '#D14E86',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicalHomeScreen;
