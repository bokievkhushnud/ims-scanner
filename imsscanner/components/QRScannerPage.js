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
            <View style={styles.topOverlay}></View>
            <View style={styles.row}>
              <View style={styles.sideOverlay}></View>
              <View style={styles.scanner}></View>
              <View style={styles.sideOverlay}></View>
            </View>
            <View style={styles.bottomOverlay}></View>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
  },
  scanner: {
    width: 200,
    height: 200,
    borderColor: '#fff',
    borderWidth: 4,
  },

});
