import React, { useState, useEffect } from "react";
import { auth, database } from "../firebase"; // Import Firebase
import { ref, onValue, off } from "firebase/database";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PetProfiles from "./homeComponents/HomePetProfile";

const Home = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const [pets, setPets] = useState([]);

  const handleAddPost = (post) => {
    setPosts((currentPosts) => [post, ...currentPosts]);
  };

  const handleDeletePost = (indexToDelete) => {
    setPosts((currentPosts) =>
      currentPosts.filter((_, index) => index !== indexToDelete)
    );
  };

  const fetchPetsData = () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userPetsRef = ref(database, `users/${userId}/pets`);

      const unsubscribe = onValue(
        userPetsRef,
        (snapshot) => {
          const data = snapshot.val();
          const petsArray = data
            ? Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
              }))
            : [];
          setPets(petsArray);
        },
        (error) => {
          console.error(error);
        }
      );

      return () => off(userPetsRef);
    }
  };

  const updatePetsState = () => {
    fetchPetsData(); // Re-fetch the pets data
  };

  useEffect(() => {
    if (route.params?.petId) {
      const petId = route.params.petId;
      fetchPetPosts(petId);
    } else {
      setPosts([]); // Clear posts if no specific pet is selected
    }
  }, [route.params?.petId]);
  
  const fetchPetPosts = (petId) => {
    const postsRef = ref(database, `users/${auth.currentUser.uid}/pets/${petId}/posts`);
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      const loadedPosts = postsData
        ? Object.keys(postsData).map((key) => ({ id: key, ...postsData[key] }))
        : [];
      setPosts(loadedPosts);
    });
  };  

  return (
    <View style={styles.homeContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.addProfileIcon}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Icon name="user-circle-o" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.feedContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.logoContainer}
        >
          <Image
            source={require("../Images/logoFINAL.png")}
            style={styles.homeLogo}
          />
        </TouchableOpacity>
        <Text style={styles.myPets}> My Pets </Text>

        <ScrollView style={styles.scrollViewPet}>
          <PetProfiles pets={pets} onPetsChange={updatePetsState} />
        </ScrollView>

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
              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
              )}
              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePost(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
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
          s
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MagnifyingGlassDog")}
        >
          <Icon name="search" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Icon name="calendar" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MedicalHomeScreen")}
        >
          <Icon name="medkit" size={30} color="black" />
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
    paddingTop: 40,
  },
  addProfileIcon: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingLeft: 355,
  },
  feedContainer: {},
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  homeLogo: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  myPets: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  scrollViewPet: {
    paddingBottom: 5,
  },
  scrollViewFeed: {
    paddingHorizontal: 15,
  },
  postHeaderContainer: {},
  postHeader: {
    fontSize: 20,
  },
  postTimeContainer: {
    marginBottom: 10,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#FFA8CD", // Example color, adjust as needed
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
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
    backgroundColor: "white",
    position: "absolute",
    bottom: 110,
    right: 25,
    borderRadius: 20,
    // Shadow properties for iOS
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android - adjust this value as needed
    elevation: 5, // Try increasing this for a more pronounced shadow on Android
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
});

export default Home;
