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
import { ref, set, onValue } from "firebase/database";
import { signOut } from "firebase/auth";

const saveUserData = async (newUserName, profilePicUrl) => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const userRef = ref(database, "users/" + userId);
    try {
      await set(userRef, {
        username: newUserName,
        profilePicture: profilePicUrl,
      });
    } catch (error) {
      console.error("Error saving user data: ", error);
      Alert.alert("Error", "Failed to save user data.");
    }
  }
};

const UserProfile = ({ navigation }) => {
  const [userName, setUserName] = useState("Default Name");
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = ref(database, "users/" + userId);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserName(data.username);
          setProfilePic(data.profilePicture);
        }
      });
    }
  }, []);

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

  const handleAddProfile = () => {
    console.log("Add a new pet profile...");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        Alert.alert(
            "Permission Denied",
            `Sorry, we need camera roll permissions to upload images.`
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
        setFile(result.assets[0].uri);
        // Save user data to Firebase
        saveUserData(userName, result.assets[0].uri); // Pass the current userName
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
          onEndEditing={() => saveUserData(userName, profilePic || "")}
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
    // backgroundColor: '#fff8dc',
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
