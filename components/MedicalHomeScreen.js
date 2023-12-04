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

    removeData(userRecordsRef)
      .then(() => {
        console.log(`Record removed from the database: ${recordId}`);
      })
      .catch((error) => {
        console.error('Error removing record from the database:', error);
      });

    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== recordId));
  };

  const renderPet = ({ item }) => (
    <View style={styles.petImageContainer}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <Text style={styles.petName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
          <FlatList
            data={pets}
            renderItem={renderPet}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>My Records</Text>
        <FlatList
          data={records}
          renderItem={({ item }) => (
            <View style={styles.recordContainer}>
              <View style={styles.recordRow}>
                <Text style={styles.recordLabel}>Pet Name:</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.recordValue}>
                  {item.petName}
                </Text>
              </View>

              <View style={styles.recordRow}>
                <Text style={styles.recordLabel}>Record Type:</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.recordValue}>
                  {item.recordType}
                </Text>
              </View>

              <View style={styles.recordRow}>
                <Text style={styles.recordLabel}>Record Date:</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.recordValue}>
                  {item.recordDate}
                </Text>
              </View>

              <View style={styles.recordRow}>
                <Text style={styles.recordLabel}>Doctor Assigned:</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.recordValue}>
                  {item.doctorAssigned}
                </Text>
              </View>

              <View style={styles.recordRow}>
                <AntDesign
                  name="close"
                  size={20}
                  color="white"
                  style={styles.removeButton}
                  onPress={() => removeRecord(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

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
    flex: 1,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  recordLabel: {
    flex: 1,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recordValue: {
    flex: 2,
  },
  removeButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#D14E86',
    alignSelf: 'flex-end',
  },
});

export default MedicalHomeScreen;
