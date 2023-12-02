import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [selected, setSelected] = useState('');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const events = ['Birthday', 'Grooming', 'Medication', 'Vaccination']; 

  const handleEventSelection = (event) => {
    setSelected(event);
  };

  const handleTimePress = () => {
    setTimePickerVisible(true);
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setSelectedTime(selectedTime);
    }
    setTimePickerVisible(Platform.OS === 'ios'); // Hide picker after selection on Android
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => {/* navigation.navigate('Home') */}}
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

      <Text style={styles.eventLabel}>Event</Text>
      <View style={styles.eventContainer}>
        {events.map((event, index) => (
          <TouchableOpacity
            key={index}
            style={event === selected ? styles.eventButtonSelected : styles.eventButton}
            onPress={() => handleEventSelection(event)}
          >
            <Text style={styles.eventButtonText}>{event}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.timeLabel}>Time</Text>
      {/* Time Picker Container */}
      <TouchableOpacity
        style={styles.timeContainer}
        onPress={handleTimePress}
      >
        <Text style={styles.timeText}>Set Time</Text>
      </TouchableOpacity>

      {isTimePickerVisible && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="spinner"
          onChange={onTimeChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#D14E86',
        height: 100,
      },
      headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 53,
     },
      circle: {
        position: 'absolute',
        top: 45,
        left: 25,
        padding: 15,
        borderRadius: 0,
        backgroundColor: '#D14E86',
        alignSelf: 'flex-start',
      },

      eventLabel: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: 20, // Reduced top padding to bring the label down closer to the buttons
        paddingBottom: 0, // Added bottom padding to create space between the label and buttons
        paddingHorizontal: 22, // Keep horizontal padding to align with your design
        alignSelf: 'flex-start' // aligns text to the start of the flex container
      },
      
      eventContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 25,

      },
      eventButton: {
        backgroundColor: 'white',
        padding: 12,
        margin: 8,
        borderRadius: 10,
        width: '45%', // adjust the width to have two columns
        shadowColor: 'black', // Shadow color
        shadowOffset: { width: 9, height: 5 }, // Shadow offset
        shadowOpacity: 0.75, // Shadow opacity
        shadowRadius: 5.84, // Shadow radius
        elevation: 8, // Elevation for Android

      },
      eventButtonSelected: {
        backgroundColor: '#FFB4D4',
        padding: 12,
        margin: 8,
        borderRadius: 10,
        width: '45%',
        shadowColor: 'black',
        shadowOffset: { width: 9, height: 5 },
        shadowOpacity: 0.75,
        shadowRadius: 5.84,
        elevation: 8,
      },
    
      eventButtonText: {
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold' // ensures text is centered within the button
 
      },
      timeContainer: {
        backgroundColor: 'white',
        padding: 12,
        margin: 8,
        borderRadius: 10,
        width: '40%', // Match the width of the event buttons
        shadowColor: 'black',
        shadowOffset: { width: 9, height: 5 },
        shadowOpacity: 0.75,
        shadowRadius: 5.84,
        elevation: 8,
        alignSelf: 'flex-start', // Align to the start of the flex container
        marginLeft: '5%',
       // Match the left margin of the event buttons
       alignSelf: 'center',
      },
      timeText: {
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      timeLabel: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: 0, // Reduced top padding to bring the label down closer to the buttons
        paddingBottom: 0, // Added bottom padding to create space between the label and buttons
        paddingHorizontal: 22, // Keep horizontal padding to align with your design
        alignSelf: 'flex-start', 

      }, 

    
    
    });
    export default App;
    

