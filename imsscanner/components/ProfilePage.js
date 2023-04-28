import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  const fetchUserProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(
      "https://inventory-ms.herokuapp.com/api/profile/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setProfile(data);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const handleChangePic = () => {
    // Implement the change profile picture logic
  };

  const handleChangePassword = () => {
    // Implement the change password logic
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profile ? (
        <>
          <Image
            style={styles.profileImage}
            source={{
              uri: profile.profile_pic,
            }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {profile.owner.first_name} {profile.owner.last_name}
            </Text>
            <Text style={styles.email}>{profile.owner.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.changePicButton}
            onPress={handleChangePic}
          >
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: "contain",
  },
  infoContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 26,
    marginBottom: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
    textAlign: "center",
  },
  changePicButton: {
    backgroundColor: "#2ed573",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  changePasswordButton: {
    backgroundColor: "#ff4757",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: "#747d8c",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfilePage;
