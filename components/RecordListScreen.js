import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useMedicalRecords } from '../components/MedicalRecordContext';

const RecordListScreen = () => {
  const [expandedRecords, setExpandedRecords] = useState([]);
  const { records} = useMedicalRecords();
 
  const toggleExpansion = (recordNumber) => {
    setExpandedRecords((prevExpanded) =>
      prevExpanded.includes(recordNumber)
        ? prevExpanded.filter((record) => record !== recordNumber)
        : [...prevExpanded, recordNumber]
    );
  };

  const renderRecordSection = (recordNumber, petName, age, recordDate, treatment, doctorAssigned ) => {
    return (
      <View style={styles.petRecord} key={recordNumber}>
        <TouchableOpacity onPress={() => toggleExpansion(recordNumber)}>
          <Text style={styles.recordTitle}>{petName}</Text>
        </TouchableOpacity>

        {expandedRecords.includes(recordNumber) && (
          <View style={styles.recordSection}>
            <View style={styles.recordBox}>
              <Text style={styles.recordSubtitle}>Vaccination Record</Text>
              <View style={styles.recordInfo}>
                <Text>Age: {age}</Text>
                <Text>Date: {recordDate}</Text>
                <Text>Doctor Assigned: {doctorAssigned}</Text>
              </View>
        
            </View>

            <View style={styles.recordBox}>
              <Text style={styles.recordSubtitle}>Treatment Record</Text>
              <View style={styles.recordInfo}>
                <Text>Treatment: {treatment}</Text>
                <Text>Date:{recordDate}</Text>
                <Text>Doctor Assigned: {doctorAssigned}</Text>
              </View>
             
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {records.map((record, index) =>
        renderRecordSection(
          index,
          record.petName,
          record.age,
          record.recordDate,
          record.doctorAssigned
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  petRecord: {
    borderWidth: 3,
    borderColor: 'pink',
    padding: 10,
    margin: 20,
    borderRadius: 10,
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
    marginBottom: 20,
  },
  recordSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recordInfo: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecordListScreen;
