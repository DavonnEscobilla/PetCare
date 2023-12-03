import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useMedicalRecords } from '../components/MedicalRecordContext';

const AddRecordScreen = () => {
  const navigation = useNavigation();
  const { addRecord } = useMedicalRecords();

  
  const [petName, setPetName] = useState('');
  const [age, setAge] = useState('');
  const [recordType, setRecordType] = useState('');
  const [recordDate, setRecordDate] = useState('');
  const [doctorAssigned, setDoctorAssigned] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddRecord = () => {
    const newRecord = {
      petName,
      age,
      recordType,
      recordDate,
      doctorAssigned,
    
    };
     // Add conditional logic to set specific dates for vaccination and treatment
     if (recordType === 'vaccination') {
      newRecord.dateVaccination = recordDate;
    } else if (recordType === 'treatment') {
      newRecord.dateTreatment = recordDate;
    }

    // Log the result of addRecord
    const result = addRecord(newRecord);
    console.log('Add Record Result:', result);

    // Navigate back to the RecordListScreen
    navigation.goBack();
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const selectRecordType = (type) => {
    setRecordType(type);
    closeModal();
  };

  const onBackPress = () => {
    navigation.goBack();

  };


  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => onBackPress()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Medical Records</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.heading}>Add New Record</Text>
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
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
          <Text style={styles.modalHeading}>Select Record Type</Text>
          <TouchableOpacity onPress={() => selectRecordType('vaccination')} style={styles.modalOption}>
            <Text>Vaccination Record</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectRecordType('treatment')} style={styles.modalOption}>
            <Text>Treatment Record</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={closeModal} />
        </View>

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

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'pink',
    borderWidth: 3,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    height: 40,
    borderColor: 'pink',
    borderWidth: 3,
    justifyContent: 'center',
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
    margin: 10,
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
    height: 40,
    backgroundColor: 'pink',
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    margin: 10,
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 3,
    borderBottomColor: 'pink',
    width: '95%',
    alignItems: 'center',
    borderColor: 'pink',
    borderWidth: 3,
    borderRadius: 10,
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

export default AddRecordScreen;
