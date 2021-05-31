import React from "react";
import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FormButton from "../components/FormButton";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />
      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <Icon
            name="sunny"
            color={"#63C9EF"}
            size={30}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>

        <Icon
          name="water"
          color={"#63C9EF"}
          size={30}
          style={{ marginRight: 15 }}
        />
      </View>

      <FormButton
        buttonTitle="등록하기"
        onPress={() => navigation.navigate("PlantSelectScreen")}
      />

      {/* <Text style={styles.text}>Welcome</Text> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
});
