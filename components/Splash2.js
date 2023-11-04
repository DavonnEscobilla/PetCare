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
      <Text>Starting your pet's journey...</Text>
      <Image
        source={require('../Images/100.gif')}
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
});

export default Splash2;
