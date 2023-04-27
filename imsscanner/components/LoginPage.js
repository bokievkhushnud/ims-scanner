import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://inventory-ms.herokuapp.com/api/auth/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        // Handle error response from the server
        const errorData = await response.json();
        Alert.alert(
          "Error",
          errorData.non_field_errors
            ? errorData.non_field_errors[0]
            : "Login failed"
        );
        return;
      }

      const data = await response.json();

      // Save the received authentication token
      await AsyncStorage.setItem("token", data.access);

      // Navigate to the Profile page
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      // Handle network or other errors
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  const openRegistrationPage = () => {
    const registrationUrl = "https://inventory-ms.herokuapp.com/register";
    Linking.openURL(registrationUrl);
  };
  // imsscanner/assets/imslogo.png
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/imslogo.png')} // Replace with the correct path to your logo
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openRegistrationPage}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  logo: {
    width: 200, // Set your logo width
    height: 100, // Set your logo height
    alignSelf: 'center',
    marginBottom: 40,
    resizeMode: 'contain',
  },
});

export default LoginPage;
