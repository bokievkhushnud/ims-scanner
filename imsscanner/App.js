import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import AssignedItemsPage from './components/AssignedItemsPage';
import QRScannerPage from './components/QRScannerPage'; // Import the QRScannerPage
import ItemDetailsPage from './components/ItemDetailsPage'; // Import the ItemDetailsPage

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="AssignedItems" component={AssignedItemsPage} />
      <Tab.Screen name="QRScanner" component={QRScannerPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={AppTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
