// Intro.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signupText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 600,
    height: 600,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D14E86',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Intro;
