import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, database } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const Auth = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLogin = route.name === 'Login';

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully');
      } else {
        if (password === confirmPassword) {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const uid = userCredential.user.uid;
          await set(ref(database, `users/${uid}`), { email });
          console.log('Signed up successfully');
        } else {
          console.log('Passwords do not match');
          return;
        }
      }
      navigation.navigate('Splash2');
    } catch (error) {
      console.error('Authentication error:', error.message);
      if (error.code) {
        console.error('Error code:', error.code);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <View style={styles.header}>
          <Text style={styles.heading}>Welcome back! </Text>
          <View style={styles.messageContainer}>
            <Text style={styles.msgText}>Login below or</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.heading}>Sign up</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.msgText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupText}>Login now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      {isLogin ? null : (
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
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
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#D14E86'
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  msgText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 5,
  },
  signupText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 18,
    marginLeft: 5,
  },
  input: {
    width: '80%',
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#D14E86',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Auth;
