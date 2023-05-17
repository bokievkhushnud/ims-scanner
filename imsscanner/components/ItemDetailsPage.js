import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ItemDetailsPage({ route }) {

    const [itemDetails, setItemDetails] = useState(null);
    const [itemStatus, setItemStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { itemId } = route.params;

    useEffect(() => {
        const fetchItemDetails = async () => {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`https://inventory-ms.herokuapp.com/api/item/${itemId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setItemDetails(data);
                setItemStatus(data.status);
            } else {
                setError(true);
            }
            setIsLoading(false);
        };
        fetchItemDetails();
    }, [itemId]);

    const handleReportBroken = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');

        try {
            const response = await fetch(
                `https://inventory-ms.herokuapp.com/api/broken/items/${itemId}/`,
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
                alert('Failed to send report');
            }
        } catch (error) {
            console.error(error);
            alert('Error occurred while sending report');
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.invalidItemContainer}>
                <Text style={styles.invalidItemText}>Invalid Item ID or item not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: itemDetails.image }} style={styles.itemImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.itemName}>{itemDetails.item_name}</Text>
                <Text style={styles.fieldName}>Department:</Text>
                <Text style={styles.fieldValue}>{itemDetails.department.name}</Text>
                <Text style={styles.fieldName}>Holder(s):</Text>
                {itemDetails.holder.map((user, index) => (
                    <Text style={styles.fieldValue} key={index}>{user.email}</Text>
                ))}
                <Text style={styles.fieldName}>Price:</Text>
                <Text style={styles.fieldValue}>{itemDetails.price} {itemDetails.currency}</Text>
                <Text style={styles.fieldName}>Category:</Text>
                <Text style={styles.fieldValue}>{itemDetails.category.name}</Text>
                <Text style={styles.fieldName}>Item Code:</Text>
                <Text style={styles.fieldValue}>{itemDetails.item_code}</Text>
                <Text style={styles.fieldName}>Quantity:</Text>
                <Text style={styles.fieldValue}>{itemDetails.quantity} {itemDetails.quantity_unit}</Text>
                <Text style={styles.fieldName}>Location:</Text>
                <Text style={styles.fieldValue}>{itemDetails.location}</Text>
                <Text style={styles.fieldName}>Description:</Text>
                <Text style={styles.fieldValue}>{itemDetails.description}</Text>
                <Text style={styles.fieldName}>Expiration Date:</Text>
                <Text style={styles.fieldValue}>{itemDetails.expiration_date}</Text>
                <Text style={styles.fieldName}>Status:</Text>
                <Text style={styles.fieldValue}>{itemStatus}</Text>
                <Text style={styles.fieldName}>Notes:</Text>
                <Text style={styles.fieldValue}>{itemDetails.notes}</Text>
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
}

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
    invalidItemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    invalidItemText: {
        fontSize: 18,
        color: '#444',
    },
    fieldName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 2,
    },
    fieldValue: {
        fontSize: 16,
        color: '#444',
        marginBottom: 15,
        paddingLeft: 0,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});