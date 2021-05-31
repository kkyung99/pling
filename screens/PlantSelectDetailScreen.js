import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Dropdown from "../components/DropDown";
import { ScrollView } from "react-native-gesture-handler";

export default function PlantSelectDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.footer}>
        <View>
          <ScrollView>
            <View style={styles.footerch}>
              <Text style={styles.titleText}>식물 등록하기</Text>
              <Text style={styles.titleText1}>당신의 식물을 등록해주세요.</Text>
              <Text style={styles.titleText2}>식물 이름</Text>
              <TextInput
                style={styles.input}
                placeholder="식물이름을 입력해 주세요"
              />
              <Dropdown />
            </View>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.ButtonText}>등록</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AABCA6",
  },
  header: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  footerch: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  titleText: {
    fontSize: 22,
    color: "#AABCA6",
    fontWeight: "bold",
  },
  titleText1: {
    marginBottom: 20,
    fontSize: 14,
    color: "#AABCA6",
  },
  titleText2: {
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 25,
    fontSize: 18,
    color: "#AABCA6",
    fontWeight: "bold",
  },
  input: {
    marginTop: 10,
    marginBottom: 14,
    borderRightWidth: -10,
    borderLeftWidth: -10,
    borderTopWidth: -10,
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    fontSize: 18,
    borderRadius: 20,
  },
  Button: {
    left: 79,
    width: 200,
    borderRadius: 30,
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#AABCA6",
    color: "white",
  },
  ButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
