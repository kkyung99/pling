import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimentions";

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#9CB399",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
