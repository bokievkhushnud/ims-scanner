import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssignedItemsPage = ({ navigation }) => {
  const [assignedItems, setAssignedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAssignedItems = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('https://inventory-ms.herokuapp.com/api/items/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setAssignedItems(data);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAssignedItems().then(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchAssignedItems();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={assignedItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ItemAssignmentDetail', { itemAssignment: item })}>
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.item.image }} style={styles.itemImage} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemName}>{item.item.item_name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.item.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
});

export default AssignedItemsPage;
