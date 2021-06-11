import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import "firebase/firestore";

const question = [
  "오늘 기분은 어때요?",
  "저는 저번주보다 성장하였나요?",
  "저의 상태는 어떠한 가요? 달라보이는게 기분탓인가요? 아님 실제로 달라진건가요",
  "당신의 기분을 조금이라도 상하게하였다면 여기에 적고 훌훌 털어버려요.",
  "오늘날씨가 당신의 기분에 영향을 주었나요?",
];

export default function QuestionCards(props) {
  const route = useRoute(); //{ dateString: date.dateString }=route.parms
  const [item, setItem] = useState("");
  useEffect(() => {
    (async () => {
      if (!route.params || !route.params.dateString) return; // false || true =>true
      const { dateString } = route.params; //const dateString = route.params.dateString;
      const card = (await AsyncStorage.getItem(dateString)) || ""; //"" = 배열
      console.log(card);
      if (card) {
        setItem(question[parseInt(card, 10)]); // question 배열의 몇번칸인지
      }
    })();
  }, [route]); //배열안에 값이 바뀔때 useEffect첫번째 함수를 호출한다.
  //유저가 회원가입을 하는시점에 배열을 셔플로

  const [answer, setAnswer] = useState("");
  let sampleTimestamp = Date.now();
  let date = new Date(sampleTimestamp);
  let year = date.getFullYear().toString();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let reDate = year + "-" + month + "-" + day;

  const addAnswer = async () => {
    const postObj = {
      question: item,
      text: answer,
      createdAt: reDate,
      creatorId: firebase.auth().currentUser.uid,
    };
    await firebase.firestore().collection("posts").add(postObj);
    setAnswer("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.randomitem}>{item}</Text>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="짧아도 괜찮아요!"
          multiline={true}
          returnKeyType="done"
          value={answer}
          onChangeText={(textValue) => setAnswer(textValue)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText} onPress={() => addAnswer()}>
            등록
          </Text>
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
    // paddingLeft:120,
    // paddingRight:120,
    // paddingBottom:300,
    // paddingTop:200,
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
