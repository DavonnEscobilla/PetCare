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
      <Text style={styles.textMsg}>Starting your pet's journey...</Text>
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
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 20,
  },

  textMsg: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D14E86'
  },
});

export default Splash2;
