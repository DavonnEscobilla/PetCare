import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useMedicalRecords } from '../components/MedicalRecordContext';

const RecordListScreen = () => {
  const [expandedRecords, setExpandedRecords] = useState([]);
  const { records } = useMedicalRecords();

  const fetchMedicalRecords = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    setRecords(data);
  };
  
  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const renderRecordSection = (record, recordNumber) => {
    return (
      <View style={styles.petRecord} key={recordNumber}>
        <View style={styles.recordSection}>
          {record.recordType === 'Vaccination' && (
            <View style={styles.vaccineBox}>
            <Text style={styles.recordSubtitle}>Vaccination Record</Text>
            <View style={styles.recordBox}>
              <View style={styles.recordInfo}>
              <Text style={{ fontWeight: 'bold' }}>{record.petName}</Text>
                <Text>Date: {record.recordDate}</Text>
                <Text>Doctor Assigned: {record.doctorAssigned}</Text>
              </View>
            </View>
            </View>
          )}

          {record.recordType === 'Treatment' && (
            <View style={styles.treatmentBox}>
              <Text style={styles.recordSubtitle}>Treatment Record</Text>
              <View style={styles.recordBox}>
              <View style={styles.recordInfo}>
              <Text style={{ fontWeight: 'bold' }}>{record.petName}</Text>
                <Text>Date: {record.recordDate}</Text>
                <Text>Doctor Assigned: {record.doctorAssigned}</Text>
              </View>
            </View>
            </View>
          )}
        </View>
      </View>
      
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {records.map((record, index) =>
        renderRecordSection(record, index)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  petRecord: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: '35%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for x and y
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 1, // Use elevation for Android
    color: 'black',
  },
  
  recordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordSection: {
    marginVertical: 5,
  },
  recordBox: {
    marginTop: 15,
    alignSelf: 'flex-start',
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    height: '60%',
    width: '50%',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for x and y
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius

  },
  vaccineTitle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  recordSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  recordInfo: {
    marginBottom: 10,
    color: 'black',
    marginLeft: 20,
    marginTop: 10,

  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecordListScreen;
