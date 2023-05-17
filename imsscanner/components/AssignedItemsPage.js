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
        keyExtractor={(item) => item.item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No assigned items</Text>} // Add this line
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  emptyMessage: {
      fontSize: 18,
      textAlign: 'center', // center the text
      marginTop: 20, // add some top margin
    }
});

export default AssignedItemsPage;
