<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PetProfiles from './homeComponents/petProfiles';

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const handleAddProfile = () => {
    console.log('Add a new pet profile...');
  };

=======
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PetProfiles from "./homeComponents/petProfiles";

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
>>>>>>> 0311604966cba344a7de262c9544e9d07b5bbc45
  const handleAddPost = (post) => {
    setPosts((currentPosts) => [post, ...currentPosts]);
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.topContainer}>
        {/* Moved user profile icon to the end */}
        <TouchableOpacity
          style={styles.addProfileIcon}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Icon name="user-circle-o" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.feedContainer}>
<<<<<<< HEAD
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
          <Image source={require('../Images/justLogo.png')} style={styles.homeLogo} />
=======
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.logoContainer}
        >
          <Image
            source={require("../Images/justLogo.png")}
            style={styles.homeLogo}
          />
>>>>>>> 0311604966cba344a7de262c9544e9d07b5bbc45
        </TouchableOpacity>

        <Text style={styles.myPets}> My Pets </Text>

        <ScrollView style={styles.scrollViewPet}>
          <PetProfiles />
        </ScrollView>
<<<<<<< HEAD

        <TouchableOpacity
          style={styles.postIcon}
          onPress={() => navigation.navigate('Post')}
        >
          <ScrollView style={styles.scrollView}>
            {posts.map((post, index) => (
              <View key={index} style={styles.postContainer}>
                <Text>{post.content}</Text>
              </View>
            ))}
          </ScrollView>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Post', { onAddPost: handleAddPost })}
          style={styles.postIcon}
        >
          <Icon name="paw" size={50} color="#D14E86" />
        </TouchableOpacity>

        {/* New Button for MedicalHomeScreen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('MedicalHomeScreen')}
          style={styles.medicalHomeButton}
        >
          <Text style={styles.buttonText}>Go to Medical Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
=======

        <ScrollView style={styles.scrollViewFeed}>
          {posts.map((post, index) => (
            <View key={index} style={styles.postContainer}>
              <View style={styles.postHeaderContainer}>
              <Text style={styles.postHeader}>{post.title}</Text>
              </View>
              <View style={styles.postTimeContainer}>
                <Text style={styles.postTime}>12/03/2023</Text>
              </View>
              <Text>{post.content}</Text>
              <Image
                source={require("../assets/post1.jpg")}
                style={styles.postImage}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.postIcon}
        onPress={() => navigation.navigate("Post")}
      ></TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Post", { onAddPost: handleAddPost })
        }
        style={styles.postIcon}
      >
        <Icon name="paw" size={50} color="#D14E86" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
>>>>>>> 0311604966cba344a7de262c9544e9d07b5bbc45
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MagnifyingGlassDog")}
        >
          <Icon name="search" size={30} color="black" />
        </TouchableOpacity>

<<<<<<< HEAD
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calendar')}>
=======
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Calendar")}
        >
>>>>>>> 0311604966cba344a7de262c9544e9d07b5bbc45
          <Icon name="calendar" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    // backgroundColor: 'yellow',
    paddingTop: 40,
  },

  addProfileIcon: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingLeft: 355,
  },

  feedContainer: {
    // flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  homeLogo: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  myPets: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  // scrollViewPet: {
  //   paddingBottom: 10,
  // },
  scrollViewFeed: {
    paddingHorizontal: 15,
  },
  postHeaderContainer: {
    // marginBottom: 5,
  },
  postHeader: {
    fontSize: 20,
  },
  postTimeContainer: {
    marginBottom: 10,
  },
  postImage: {
    width: 338,
    height: 227,
    marginTop: 15,
  },
  postContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "black",
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  postIcon: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 110,
    right: 25,
    borderRadius: 20,
    shadowColor: "gray",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 0.1,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    bottom: 0.1,
    width: "100%",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    paddingBottom: 20,
  },
 
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Home;
