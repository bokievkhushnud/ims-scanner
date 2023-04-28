import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function QRScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScannerVisible, setIsScannerVisible] = useState(true);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      setIsScannerVisible(true);
    }, [])
  );

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setIsScannerVisible(false);
    navigation.navigate('ItemDetails', { itemId: data });
  };

  if (hasPermission === null) {
    return <Text style={styles.infoText}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.infoText}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isScannerVisible && isFocused && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.overlay}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.middleContainer}>
              <View style={styles.unfocusedContainer}></View>
              <View style={styles.scanner}></View>
              <View style={styles.unfocusedContainer}></View>
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
        </BarCodeScanner>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleContainer: {
    flexDirection: 'row',
  },
  unfocusedContainer: {
    flex: 1,
  },
  scanner: {
    width: 200,
    height: 200,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 4,
  },
  infoText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 16,
  },
});
