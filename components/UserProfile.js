import PetProfile from "./PetProfile";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { auth, database } from "../firebase";
import { ref, set, onValue, update } from "firebase/database";
import { off } from "firebase/database";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveUserData = async (newUserName, profilePicUrl) => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const userRef = ref(database, "users/" + userId);
    try {
      await update(userRef, {
        username: newUserName,
        profilePicture: profilePicUrl,
      });
    } catch (error) {
      console.error("Error updating user data: ", error);
      Alert.alert("Error", "Failed to update user data.");
    }
  }
};

const UserProfile = ({ navigation }) => {
  const [userName, setUserName] = useState("Default Name");
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    loadUserName();
    if (!auth.currentUser) {
      console.error("No user logged in");
      return;
    }

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
  }, []);

  const loadProfilePic = async () => {
    try {
      const storedProfilePic = await AsyncStorage.getItem("@profilePic");
      if (storedProfilePic !== null) {
        setProfilePic(storedProfilePic);
      }
    } catch (error) {
      console.error("Error loading profile picture: ", error);
    }
  };

  loadProfilePic();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
        setUserName("Default Name"); // Reset username state
        setProfilePic(null); // Reset profile picture state
        navigation.navigate("Intro"); // Navigate to intro or login screen
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        Alert.alert("Error", "Problem signing out.");
      });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to upload images."
      );
      return; // Early return if permission is not granted
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // If you want to allow editing
      aspect: [4, 3], // Aspect ratio
      quality: 1, // Keep the quality high
    });

    if (!result.cancelled) {
      // Update the file state and wait for the update before saving the user data
      setFile(result.assets[0].uri);
      await handleEndEditing(userName, result.assets[0].uri);
    }
  };

  // Load the username from AsyncStorage
  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem("@username");
      if (name !== null) {
        setUserName(name);
      }
    } catch (error) {
      console.error("Error loading username: ", error);
    }
  };

  // Save the username to AsyncStorage
  const saveUserName = async (name) => {
    try {
      await AsyncStorage.setItem("@username", name);
      setUserName(name); // Update the state to reflect the new username
    } catch (error) {
      console.error("Error saving username: ", error);
    }
  };

  const handleEndEditing = async (name, uri) => {
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (userId) {
        // Update user data in Firebase
        await update(ref(database, "users/" + userId), {
          username: name,
          profilePicture: uri || profilePic,
        });

        // Update the local state with the new username and profile picture
        setUserName(name);
        setProfilePic(uri);

        // Save to AsyncStorage
        await AsyncStorage.setItem("@username", name);
        if (uri) {
          await AsyncStorage.setItem("@profilePic", uri);
        }
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
      Alert.alert("Error", "Failed to update user data.");
    }
  };

  return (
    <View style={styles.homeContainer}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backtoHome}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="arrow-left" size={30} color="#D14E86" />
        </TouchableOpacity>
      </View>

      {/* UserProfile Container */}
      <View style={styles.userProfileContainer}>
        <TouchableOpacity style={styles.userPhotoContainer} onPress={pickImage}>
          <Image
            source={
              profilePic
                ? { uri: profilePic }
                : require("../assets/defaultProfile.png")
            }
            style={styles.userPhoto}
          />
          <Icon
            name="camera"
            size={24}
            color="gray"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>

        {/* User's name */}
        <TextInput
          style={styles.userNameInput}
          value={userName}
          onChangeText={setUserName}
          onEndEditing={() => handleEndEditing(userName, profilePic || "")}
        />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Intro")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* PetProfile Container */}
      <View style={styles.petProfileContainer}>
        <TouchableOpacity
          style={styles.addPetButton}
          onPress={() => navigation.navigate("PetInput")}
        >
          <Icon name="plus-circle" size={30} color="black" />
        </TouchableOpacity>
        {/* Pass the pets array to the PetProfile component */}
        <PetProfile pets={pets} />
      </View>
      <PetProfile />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    // backgroundColor: 'yellow',
    paddingTop: 50,
    paddingLeft: 20,
  },
  userProfileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userPhotoContainer: {
    width: 150,
    height: 150,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  userPhoto: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "transparent",
  },
  userNameInput: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    // borderBottomWidth: 1,
    borderBottomColor: "gray", // You can adjust the color
    marginVertical: 5,
  },
  petProfileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 14,
    color: "gray",
    textDecorationLine: "underline",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  logoutBotton: {
    // top: 100, // Corrected property name to lowercase 'top'
  },
  addPetIcon: {
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
  },
});

export default UserProfile;
