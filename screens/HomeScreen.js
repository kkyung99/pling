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
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
        {/* <TouchableOpacity>
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
        /> */}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("PlantSelectScreen")}
      >
        <FontAwesome name="plus-circle" color={"#AABCA6"} size={85} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
});
