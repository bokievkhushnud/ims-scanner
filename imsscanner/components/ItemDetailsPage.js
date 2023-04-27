import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ItemDetailsPage({ route }) {
    const [itemDetails, setItemDetails] = useState(null);
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
            } else {
                setItemDetails(null);
            }
        };

        fetchItemDetails();
    }, [itemId]);

    if (itemDetails === null) {
        return <Text>Invalid Item ID or item not found.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.itemName}>{itemDetails.item_name}</Text>
            <Text>Price: {itemDetails.price}</Text>
            {/* Add more fields as needed */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
