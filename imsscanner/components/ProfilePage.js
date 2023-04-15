import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  const fetchUserProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('http://192.168.1.184:8080/api/profile/', {
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

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Image
            style={styles.profileImage}
            source={{
              uri: `http://192.168.1.184:8080/${profile.profile_pic}`,
            }}
          />
          <Text style={styles.name}>
            {profile.owner.first_name} {profile.owner.last_name}
          </Text>
          <Text style={styles.email}>{profile.owner.email}</Text>
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
});

export default ProfilePage;
