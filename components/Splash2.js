import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';


const Splash2 = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.heading, { color: '#D14E86' }]}>Start your pet's</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.heading, { color: '#D14E86' }]}>journey.</Text>
        </View>
      </View>
      <Image
        source={require('../Images/start.gif')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    // flex: 1,
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 80,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop: 70, 
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});


export default Splash2;