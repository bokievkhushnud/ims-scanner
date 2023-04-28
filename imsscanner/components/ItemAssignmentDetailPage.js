import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemAssignmentDetailPage = ({ route }) => {
  const { itemAssignment } = route.params;
  const [itemStatus, setItemStatus] = useState(itemAssignment.item.status);
  const [isLoading, setIsLoading] = useState(false);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleReportBroken = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');

  
    try {
      const response = await fetch(
        `https://inventory-ms.herokuapp.com/api/broken/items/${itemAssignment.item.id}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );
  
      if (response.ok) {
        setItemStatus('broken');
        alert('Report sent successfully');
      } else {
        // Handle error, e.g., show an alert
        alert('Failed to send report');
      }
    } catch (error) {
      // Handle error, e.g., show an alert
      console.error(error);
      alert('Error occurred while sending report');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: itemAssignment.item.image }} style={styles.itemImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{itemAssignment.item.item_name}</Text>
        <Text style={styles.infoText}>Quantity: {itemAssignment.quantity}</Text>
        <Text style={styles.infoText}>Price: {itemAssignment.item.price} {itemAssignment.item.currency}</Text>
        <Text style={styles.infoText}>Department: {itemAssignment.department.name}</Text>
        <Text style={styles.infoText}>Location: {itemAssignment.location}</Text>
        <Text style={styles.infoText}>Assigned By: {itemAssignment.done_by.first_name} {itemAssignment.done_by.last_name} ({itemAssignment.done_by.email})</Text>
        <Text style={styles.infoText}>Date: {formatDate(itemAssignment.date)}</Text>
        <Text style={styles.infoText}>Due Date: {formatDate(itemAssignment.due_date)}</Text>
        <Text style={styles.infoText}>Notes: {itemAssignment.notes}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        itemStatus !== 'broken' ? (
          <TouchableOpacity style={styles.reportBrokenButton} onPress={handleReportBroken}>
            <Text style={styles.reportBrokenButtonText}>Report Broken</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.reportedButton}>
            <Text style={styles.reportedButtonText}>Reported</Text>
          </View>
        )
      )}
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  itemImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'contain',

  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  reportBrokenButton: {
    backgroundColor: '#ff4757',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  reportBrokenButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reportedButton: {
    backgroundColor: '#747d8c',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  reportedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ItemAssignmentDetailPage;
