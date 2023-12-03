import React, { useState }  from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

const PetProfile = ({ name, image, containerStyle, imageStyle, nameStyle }) => (
  <View style={[styles.petProfileContainer, containerStyle]}>
    <Image source={image} style={[styles.petImage, imageStyle]} />
    <View style={[styles.petNameContainer, nameStyle]}>
      <Text style={styles.petName}>{name}</Text>
    </View>
  </View>
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
      {}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  
  primoContainer: {
    flexDirection: 'row',
    backgroundColor: '#D14E86',
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '90%', 
    height: '27%',
    alignSelf: 'center', 
  },
  smudgeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFB4D4',
    borderRadius: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '90%', 
    height: '27%',
    alignSelf: 'center', 


  },
  petNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
  },
  primoNameContainer: {
   
    backgroundColor: 'transparent', 
  },
  smudgeNameContainer: {
   
    backgroundColor: 'transparent',
  },
  petName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35, 
  },
  header: {
    backgroundColor: '#D14E86',
    height: 150,
   
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


});
export default App;
