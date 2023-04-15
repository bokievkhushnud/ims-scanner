import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssignedItemsPage = () => {
  const [assignedItems, setAssignedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAssignedItems = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('http://192.168.1.184:8080/api/items/', {
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
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.item_name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>location: {item.location}</Text>
            <Text>Assigned By: {item.done_by.first_name} {item.done_by.last_name}</Text>
          </View>
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
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
});

export default AssignedItemsPage;
