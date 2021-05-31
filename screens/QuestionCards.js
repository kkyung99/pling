import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function QuestionCards(props) {
  const question = [
    "오늘의 기분은 어때요?",
    "저는 저번주보다 성장하였나요?",
    "저의 상태는 어떠한 가요? 달라보이는게 기분탓인가요? 아님 실제로 달라진건가요",
    "당신의 기분을 조금이라도 상하게하였다면 여기에 적고 훌훌 털어버려요.",
  ];
  const randomItem = (a) => {
    return a[Math.floor(Math.random() * a.length)];
  };
  return (
    <View style={styles.container}>
      <Text style={styles.randomitem}>{randomItem(question)}</Text>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="짧아도 괜찮아요!"
          multiline={true}
          returnKeyType="done"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  randomitem: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 0.92,
    marginVertical: 40,
    borderWidth: 1,
    borderLeftWidth: -1,
    borderRightWidth: -1,
    width: 380,
    //paddingTop:30,
    borderColor: "black",
    color: "black",
    // paddingLeft:120,
    // paddingRight:120,
    // paddingBottom:300,
    // paddingTop:200,
    fontSize: 14,
    borderRadius: 10,
  },
  header: {
    color: "black",
  },
  Button: {
    left: 10,
    width: 200,
    borderRadius: 30,
    marginTop: -50,
    marginBottom: 30,
    paddingVertical: 14,
    //paddingHorizontal:10,
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
