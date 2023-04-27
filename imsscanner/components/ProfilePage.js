import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  const fetchUserProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('https://inventory-ms.herokuapp.com/api/profile/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setProfile(data);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);


  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Image
            style={styles.profileImage}
            source={{
              uri: profile.profile_pic,
            }}
          />
          <Text style={styles.name}>
            {profile.owner.first_name} {profile.owner.last_name}
          </Text>
          <Text style={styles.email}>{profile.owner.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: '#888',
  },

  logoutButton: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ProfilePage;
