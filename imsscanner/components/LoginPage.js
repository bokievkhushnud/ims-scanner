import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showError, setShowError] = useState(false);



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
        setShowError(true);
        return;
      }

      const data = await response.json();

      await AsyncStorage.setItem("token", data.access);

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };


  const openRegistrationPage = () => {
    const registrationUrl = "https://inventory-ms.herokuapp.com/register";
    Linking.openURL(registrationUrl);
  };
  // imsscanner/assets/imslogo.png

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const closeModal = () => {
    setShowError(false);
  };

  const openForgotPasswordPage = () => {
    const forgotPasswordUrl = "https://inventory-ms.herokuapp.com/password_reset";
    Linking.openURL(forgotPasswordUrl);
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Modal animationType="fade" transparent visible={showError}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login Failed</Text>
            <Text style={styles.modalMessage}>
              Incorrect email or password. Please try again.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Icon name="cubes" size={100} color="#007AFF" style={styles.logo} />
      <Text style={styles.title}>Inventory Management System</Text>
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.passwordVisibilityToggle}
            onPress={togglePasswordVisibility}
          >
            <Icon
              name={passwordVisible ? "eye-slash" : "eye"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={openRegistrationPage}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openForgotPasswordPage}>
        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#333',
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: "#ccc",
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
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    color: '#007AFF',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  passwordVisibilityToggle: {
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordLink: {
    marginTop: 5,
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#007AFF",
  },
});


export default LoginPage;
