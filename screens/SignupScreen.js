import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

const SignupScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>회원가입</Text>
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
          buttonTitle="SIGN UP"
          onPress={() => register(email, password)}
        />

        <View>
          <Text style={styles.textPrivate}>
            By registering, you comfirm that you accept our
          </Text>
          <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}>and</Text>
          <TouchableOpacity>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AABCA6",
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  navButtonText: {
    textAlign: "center",
    margin: 30,
    fontSize: 15,
    fontWeight: "500",
    color: "#2e64e5",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    color: "grey",
    textAlign: "center",
  },
});
