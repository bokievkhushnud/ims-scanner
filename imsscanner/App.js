import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import AssignedItemsPage from './components/AssignedItemsPage';
import QRScannerPage from './components/QRScannerPage'; // Import the QRScannerPage
import ItemDetailsPage from './components/ItemDetailsPage'; // Import the ItemDetailsPage
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemAssignmentDetailPage from './components/ItemAssignmentDetailPage'; // Import the ItemAssignmentDetailPage
import ChangePasswordScreen from './components/ChangePasswordScreen';
enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Assigned Items"
        component={AssignedItemsPage}
        options={{
          tabBarLabel: 'Assigned Items',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="QRScanner"
        component={QRScannerPage}
        options={{
          tabBarLabel: 'QR Scanner',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={AppTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsPage}  options={{ title: 'Item Details' }} />
        <Stack.Screen name="ItemAssignmentDetail" component={ItemAssignmentDetailPage}  options={{ title: 'Item Details' }}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
