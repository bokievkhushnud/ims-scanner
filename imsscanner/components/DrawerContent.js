import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const DrawerContent = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.184:8080/api/profile/');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      {userData && (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: userData.profile_picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 18, marginTop: 10 }}>{userData.name}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>{userData.email}</Text>
        </View>
      )}
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={() => props.navigation.navigate('Logout')}>
        <Text style={{ margin: 16, fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
