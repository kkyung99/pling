import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
export default function PlantSelectScreen({ navigation }) {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const handlechange = () => {
    if (
      checked === true &&
      checked1 === false &&
      checked2 === false &&
      checked3 === false &&
      checked4 === false &&
      checked5 === false
    ) {
      navigation.navigate("PlantSelectDetailScreen");
    } else if (
      checked === false &&
      checked1 === true &&
      checked2 === false &&
      checked3 === false &&
      checked4 === false &&
      checked5 === false
    ) {
      navigation.navigate("PlantSelectDetailScreen");
    } else if (
      checked === false &&
      checked1 === false &&
      checked2 === true &&
      checked3 === false &&
      checked4 === false &&
      checked5 === false
    ) {
      navigation.navigate("PlantSelectDetailScreen");
    } else if (
      checked === false &&
      checked1 === false &&
      checked2 === false &&
      checked3 === true &&
      checked4 === false &&
      checked5 === false
    ) {
      navigation.navigate("PlantSelectDetailScreen");
    } else if (
      checked === false &&
      checked1 === false &&
      checked2 === false &&
      checked3 === false &&
      checked4 === true &&
      checked5 === false
    ) {
      navigation.navigate("PlantSelectDetailScreen");
    } else if (
      checked === false &&
      checked1 === false &&
      checked2 === false &&
      checked3 === false &&
      checked4 === false &&
      checked5 === true
    ) {
      navigation.navigate("PlantSelectDetailScreen");
    } else if (
      checked === false &&
      checked1 === false &&
      checked2 === false &&
      checked3 === false &&
      checked4 === false &&
      checked5 === false
    ) {
      Alert.alert("식물을 선택하지 않았습니다!");
    } else {
      Alert.alert("하나만 선택해 주세요!");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.footer}>
        <ScrollView>
          <Text style={styles.titleText}>식물 등록하기</Text>
          <Text style={styles.titleText1}>당신의 식물을 등록해주세요.</Text>
          <View>
            <View style={styles.checkbox}>
              <RadioButton
                name="check"
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text>Is CheckBox selected: {checked ? "👍" : "👎"}</Text>
            </View>
            <View style={styles.checkbox}>
              <RadioButton
                name="check"
                status={checked1 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked1(!checked1);
                }}
              />
              <Text>Is CheckBox selected1: {checked1 ? "👍" : "👎"}</Text>
            </View>
            <View style={styles.checkbox}>
              <RadioButton
                name="check"
                status={checked2 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked2(!checked2);
                }}
              />
              <Text>Is CheckBox selected2: {checked2 ? "👍" : "👎"}</Text>
            </View>
            <View style={styles.checkbox}>
              <RadioButton
                name="check"
                status={checked3 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked3(!checked3);
                }}
              />
              <Text>Is CheckBox selected3: {checked3 ? "👍" : "👎"}</Text>
            </View>
            <View style={styles.checkbox}>
              <RadioButton
                name="check"
                status={checked4 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked4(!checked4);
                }}
              />
              <Text>Is CheckBox selected4: {checked4 ? "👍" : "👎"}</Text>
            </View>
            <View style={styles.checkbox}>
              <RadioButton
                name="check"
                status={checked5 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked5(!checked5);
                }}
              />
              <Text>Is CheckBox selected5: {checked5 ? "👍" : "👎"}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlechange}>
              <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  checkbox: {
    borderWidth: 0.2,
    borderColor: "black",
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 20,
    marginBottom: 70,
  },
  button: {
    marginBottom: 10,
    left: 70,
    width: 200,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#AABCA6",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
