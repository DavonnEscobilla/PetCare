import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const PetProfile = ({ name, image, containerStyle, imageStyle, nameStyle }) => (
  <View style={[styles.petProfileContainer, containerStyle]}>
    <Image source={image} style={[styles.petImage, imageStyle]} />
    <View style={[styles.petNameContainer, nameStyle]}>
      <Text style={styles.petName}>{name}</Text>
    </View>
  </View>
);

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendar</Text>
      </View>
      <Calendar
        // Specify any props for the calendar here.
        style={styles.calendar}
      />
      <View style={styles.petSection}>
        <PetProfile
          name="Primo"
          image={require('../Images/primo.png')}
          containerStyle={styles.primoContainer}
          imageStyle={styles.primoImage}
          nameStyle={styles.primoNameContainer}
          textStyle={styles.primoText}
        />
        <PetProfile
          name="Smudge"
          image={require('../Images/smudge.png')}
          containerStyle={styles.smudgeContainer}
          imageStyle={styles.smudgeImage}
          nameStyle={styles.smudgeNameContainer}
        />
      </View>
      {/* Icons for the tab bar go here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... other styles remain unchanged ...
  
  primoContainer: {
    flexDirection: 'row',
    backgroundColor: '#D14E86',
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to position children on opposite sides
    width: '90%', // Adjusted to be relative to screen width
    height: '27%',
    alignSelf: 'center', // Center the container within its parent
  },
  smudgeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFB4D4',
    borderRadius: 20,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to position children on opposite sides
    width: '90%', // Adjusted to be relative to screen width
    height: '27%',
    alignSelf: 'center', // Center the container within its parent

  // ... petNameContainer, petName, petImage styles remain unchanged ...
  },
  petNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Allows the name container to fill the space next to the image
  },
  primoNameContainer: {
    // Removed the right property, use padding or margin if needed to adjust the text position
    backgroundColor: 'transparent', // Use transparent to avoid overlapping colors
  },
  smudgeNameContainer: {
    // Removed the right property, use padding or margin if needed to adjust the text position
    backgroundColor: 'transparent',
  },
  petName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35, // Adjust font size according to the design
  },
  primoImage: {
    // Use flex properties or padding/margin to position the image instead of left and bottom
     // Fixed height, or use percentage if you want it to be responsive

 
  },
  smudgeImage: {

  
  },
  primoText: {
    // The fontSize should be responsive; consider using a calculated value based on screen size or removing it if not needed
  },
  // tabBar style remains unchanged
  calendar: {
    // If you need to apply additional styles directly to the calendar's container view
    // borderWidth and borderColor are just examples
    borderWidth: 3,
    borderColor: 'gray', // Pink border
    
    
  },
});
export default App;
