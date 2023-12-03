import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

const PetContainer = ({ containerStyle, onPress }) => (
  <TouchableOpacity style={[styles.petContainer, containerStyle]} onPress={onPress} />
);

const App = ({ navigation }) => {
  const [selected, setSelected] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => navigation.navigate('Home')} 
        >
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
      {/* ... Calendar properties */}
      
      <Text style={styles.petSectionTitle}>Pet</Text>
      <View style={styles.petSection}>
        <PetContainer
          containerStyle={styles.primoContainer}
          onPress={() => navigation.navigate('CalendarEvent')} // Replace 'CalendarEvent' with the correct route name if different
        />
        <PetContainer
          containerStyle={styles.smudgeContainer}
          onPress={() => navigation.navigate('CalendarEvent')} // Replace 'CalendarEvent' with the correct route name if different
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row', // Use row layout for header
    alignItems: 'center', // Align items in the center vertically
    justifyContent: 'flex-start', // Align items to the start horizontally
    backgroundColor: '#D14E86',
    height: 100, // Choose the height you prefer
    paddingHorizontal: 50, // Add some horizontal padding
    paddingTop: 20 // Choose the padding you prefer
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 100, // Add margin to separate the text from the icon
  },
  circle: {
    // Adjust the circle positioning if needed
  },
  petSectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 40,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  petSection: {
    paddingHorizontal: 30,
  },
  petContainer: {
    backgroundColor: '#D14E86',
    borderRadius: 20,
    height: 100,
    marginBottom: 10,
    width: '90%', 
    alignSelf: 'center', 
  },
  primoContainer: {
    // Additional styling for primo container if needed
  },
  smudgeContainer: {
    backgroundColor: '#FFB4D4',
    // Additional styling for smudge container if needed
  },
  // ... rest of your styles
});
export default App;
