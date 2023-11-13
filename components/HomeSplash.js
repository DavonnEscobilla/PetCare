import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';


const HomeSplash = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Intro');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text></Text>
      <Image
        source={require('../Images/logo.png')}
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
    width: 650,
    height: 650,
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 20,
  },
});

export default HomeSplash;