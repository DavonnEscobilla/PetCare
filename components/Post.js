import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const Post = ({ navigation, route }) => {
  const { onAddPost } = route.params;
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const photoSelectionContainerStyle = selectedImage
    ? { ...styles.photoSelectionContainer }
    : styles.photoSelectionContainer;

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

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      console.log("Selected Image URI: ", result.assets[0].uri); // Debugging line
    } else {
      console.log("Image picker cancelled or failed.");
    }
  };

  const handleSubmit = () => {
    onAddPost({ title: postTitle, content: postContent, image: selectedImage });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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

      <View style={photoSelectionContainerStyle}>
        <Text style={styles.ImgPrevText}>Upload Image</Text>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        )}
        <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
          <Icon name="camera" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    padding: 20,
  },
  cancelbuttonText: {
    fontSize: 16,
    color: "#FFA8CD",
  },
  pawsButton: {
    borderRadius: 25,
    width: 70,
    height: 39,
    backgroundColor: "#FFA8CD",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    minHeight: 100,
    padding: 5,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  photoSelectionContainerStyle: {
    paddingVertical: 30,
  },
  ImgPrevText: {
    color: 'gray',
    paddingBottom: 5,
  },
  photoSelectionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  selectedImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  previewImage: {
    width: 200, // Set width to your preference
    height: 200, // Set height relative to width for aspect ratio
    alignSelf: "center",
    marginBottom: 10, // Space between image and camera icon
  },
  cameraButton: {
    borderRadius: 15,
    width: 50,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cameraIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  cameraIconText: {
    fontSize: 24,
  },
});

export default Post;
