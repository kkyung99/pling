import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, googleLogin, facebookLogin, loading } =
    useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <View
          style={{
            backgroundColor: "#00000099",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 30 }}>Loading...</Text>
        </View>
      ) : null}
      <View style={styles.header}>
        <Image
          source={require("../assets/default_logo.png")}
          style={styles.logo}
        />
        <Text style={[styles.text_header, { paddingTop: 15 }]}>Pling</Text>
      </View>

      <View style={styles.footer}>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="LOGIN"
          onPress={() => login(email, password)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.btnContainer}>
          <SocialButton
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {
              facebookLogin();
            }}
          />
          <SocialButton
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {
              googleLogin();
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.navButtonText}>
            Don't have an account? Create here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AABCA6",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  footer: {
    flex: 3,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },

  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 20,
  },
  navButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: "#2e64e5",
  },
});
