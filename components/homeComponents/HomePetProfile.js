import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from "../../firebase";
import { ref, onValue } from "firebase/database";

const PetProfiles = () => {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const petsRef = ref(database, `users/${userId}/pets`);
      onValue(petsRef, (snapshot) => {
        const petsData = snapshot.val();
        const loadedPets = petsData
          ? Object.keys(petsData).map((key) => ({ id: key, ...petsData[key] }))
          : [];
        setPets(loadedPets);
      });
    }
  }, []);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 20 }}
    >
      {pets.map((pet, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.push("Status", {
              name: pet.name,
              image: pet.image, // Assuming `image` is the URL from Firebase
            })
          }
        >
          <View
            style={{
              flexDirection: "column",
              paddingHorizontal: 8,
              position: "relative",
            }}
          >
            <View
              style={{
                width: 68,
                height: 68,
                backgroundColor: "white",
                borderWidth: 1.8,
                borderRadius: 100,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={
                  pet.image
                    ? { uri: pet.image }
                    : require("../../assets/defaultpetprofile.png")
                }
                style={{
                  resizeMode: "cover",
                  width: "92%",
                  height: "92%",
                  borderRadius: 100,
                  backgroundColor: "orange",
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {pet.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PetProfiles;
