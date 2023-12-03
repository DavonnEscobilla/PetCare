import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/FontAwesome";

const Post = ({ navigation, route }) => {
  const { onAddPost } = route.params;
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the media library is required!");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleSubmit = () => {
    onAddPost({ title: postTitle, content: postContent, image: selectedImage });
    console.log({
      title: postTitle,
      content: postContent,
      image: selectedImage,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.customHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
          >
            <Text style={styles.cancelbuttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} style={styles.pawsButton}>
            <Text style={styles.buttonText}>Paws</Text>
          </TouchableOpacity>
        </View>

        {/* New TextInput for the post title */}
        <TextInput
          style={styles.input}
          placeholder="Post Title"
          value={postTitle}
          onChangeText={setPostTitle}
        />
        
        <TextInput
          style={styles.input}
          multiline
          placeholder="Any updates about your pet?"
          value={postContent}
          onChangeText={setPostContent}
        />
      </View>

      {/* Photo Selection Interface */}
      {keyboardStatus === "Keyboard Shown" && (
        <View style={styles.photoSelectionContainer}>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          )}
          <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
            <Icon name="camera" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {/* TextInput should be here, along with any other UI elements */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
  },
  headerButton: {
    padding: 10,
  },
  cancelbuttonText: {
    fontSize: 16,
    color: "#FFA8CD",
  },
  pawsButton: {
    borderRadius: 25, // Half of width and height to make it circular
    width: 70, // Set the width of the circle
    height: 39, // Set the height of the circle
    backgroundColor: "#FFA8CD", // Background color of the circle
    justifyContent: "center", // Center the text inside the circle
    alignItems: "center", // Center the text inside the circle
    padding: 10, // Padding for the size
    elevation: 3, // Optional: for shadow on Android
    shadowOpacity: 0.3, // Optional: for shadow on iOS
    shadowRadius: 4, // Optional: for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: for shadow on iOS
  },
  buttonText: {
    // Adjust your text styles accordingly
    color: "white", // Color of the text inside the circle
    fontSize: 16, // Size of the text
  },
  input: {
    minHeight: 100,
    // borderColor: 'black',
    // borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    // backgroundColor: 'white',
  },
  photoSelectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#FFF', // or any color that matches your design
  },
  selectedImage: {
    width: 50, // adjust as needed
    height: 50, // adjust as needed
    marginRight: 10,
  },
  cameraButton: {
    borderRadius: 15, // Half of width and height to make it circular
    width: 70, // Set the width of the circle
    height: 70, // Set the height of the circle
    backgroundColor: "white", // Background color of the circle
    justifyContent: "center", // Center the text inside the circle
    alignItems: "center", // Center the text inside the circle
    padding: 10, // Padding for the size
    elevation: 3, // Optional: for shadow on Android
    shadowOpacity: 0.3, // Optional: for shadow on iOS
    shadowRadius: 4, // Optional: for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: for shadow on iOS
  },
  cameraIcon: {
    fontSize: 24, // adjust as needed
  },
  cameraIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  cameraIconText: {
    fontSize: 24,
  },
  previewImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default Post;