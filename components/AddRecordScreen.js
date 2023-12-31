import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../firebase'; 
import { ref, set } from 'firebase/database';

const AddRecordScreen = () => {
  const navigation = useNavigation();

  const [petName, setPetName] = useState('');
  const [age, setAge] = useState('');
  const [recordType, setRecordType] = useState('');
  const [recordDate, setRecordDate] = useState('');
  const [doctorAssigned, setDoctorAssigned] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecordType, setSelectedRecordType] = useState('');

  const handleAddRecord = async () => {
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      // Check if any of the required fields are empty
      if (!petName || !age || !recordType || !recordDate || !doctorAssigned) {
        console.error('Please fill in all the required fields.');
        return;
      }

      // Validate date format
      const dateRegex = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/;
      if (!dateRegex.test(recordDate)) {
        console.error('Invalid date format. Please use "Month day, year" format, e.g., "December 25, 2023".');
        return;
      }

      const newRecord = {
        petName,
        age,
        recordType,
        recordDate,
        doctorAssigned,
      };

      if (recordType === 'vaccination') {
        newRecord.dateVaccination = recordDate;
      } else if (recordType === 'treatment') {
        newRecord.dateTreatment = recordDate;
      }

      try {
        await set(ref(database, `users/${userId}/records/${recordDate}`), newRecord);

        console.log('Record added successfully!');
      } catch (error) {
        console.error('Error adding record:', error);
      }

      navigation.goBack();
    } else {
      console.error('User not authenticated.'); 
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const selectRecordType = (type) => {
    setSelectedRecordType(type);
  };

  const onSave = () => {
    setRecordType(selectedRecordType);
    closeModal();
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => onBackPress()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Records</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />

      <TextInput
        style={styles.input}
        placeholder="Name of Record"
        value={petName}
        onChangeText={setPetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>{recordType ? `Selected: ${recordType}` : 'Select Record Type'}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Record Date"
        value={recordDate}
        onChangeText={setRecordDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Doctor Assigned"
        value={doctorAssigned}
        onChangeText={setDoctorAssigned}
      />
      <TouchableOpacity style={styles.addRecordButton} onPress={handleAddRecord}>
        <Text style={styles.buttonText}>Add Record</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalHeading, { color: '#D14E86' }]}>Select Record Type</Text>
          <TouchableOpacity
            onPress={() => selectRecordType('Vaccination')}
            style={[
              styles.modalOption,
              selectedRecordType === 'Vaccination' && styles.selectedRecordType,
            ]}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>Vaccination Record</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectRecordType('Treatment')}
            style={[
              styles.modalOption,
              selectedRecordType === 'Treatment' && styles.selectedRecordType,
            ]}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>Treatment Record</Text>
          </TouchableOpacity>
          <Button title="Save" onPress={onSave} color="#D14E86" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  button: {
    height: 40,
    borderColor: '#D14E86',
    borderWidth: 3,
    justifyContent: 'center',
    paddingLeft: 8,
    marginBottom: 10,
    borderRadius: 10,
    margin: 20,
    backgroundColor: '#D14E86',
  },
  selectedRecordTypeText: {
    color: '#D14E86',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
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
    left: 30,
    marginTop: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  addRecordButton: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    margin: 20,
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
  },
  modalOption: {
    backgroundColor: '#D14E86',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '50%',
    color: 'black',
  },
  selectedRecordType: {
    borderWidth: 2,
    borderColor: 'black', 
  },
});

export default AddRecordScreen;
