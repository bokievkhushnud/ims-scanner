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
import * as ImagePicker from 'expo-image-picker';
import ChangePasswordScreen from './ChangePasswordScreen';


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


  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    return pickerResult;
  };

  const handleChangePic = async () => {
    const image = await openImagePickerAsync();
    if (image.canceled === true) {
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const uri = image.assets[0].uri;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('profile_pic', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    const response = await fetch('https://inventory-ms.herokuapp.com/api/change_profile_pic/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert('Profile picture updated');
      fetchUserProfile(); // Reload profile data to show the new picture
    } else {
      alert('Failed to update profile picture');
    }
  };


  const handleNavigateToChangePassword = () => {
    navigation.navigate('ChangePassword');

  }

  return (
    <ScrollView contentContainerStyle={styles.container} >
      {
        profile ? (
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
            style={[styles.button, styles.changePicButton]}
            onPress={handleChangePic}
          >
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.changePasswordButton]}
            onPress={handleNavigateToChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView >
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
  button: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
 
  },
  changePicButton: {
    backgroundColor: "#1abc9c",
  },
  changePasswordButton: {
    backgroundColor: "#3498db",
  },
  logoutButton: {
    backgroundColor: "#95a5a6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfilePage;
