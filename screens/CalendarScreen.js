import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  onPress,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocaleConfig } from "react-native-calendars";
import { Calendar } from "react-native-calendars";
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";
const mark = {
  "2021-06-04": { marked: true, dotColor: "#AABC6A" },
  "2021-06-09": { marked: true, dotColor: "#AABC6A" },
  "2021-06-25": { marked: true, dotColor: "#AABC6A" },
  "2021-06-30": { marked: true, dotColor: "#AABC6A" },
  "2021-07-02": { marked: true, dotColor: "#AABC6A" },
};
const indexes = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5); //질문의 순서를 섞음
Object.keys(mark).forEach(async (key, i) => {
  const item = await AsyncStorage.getItem(key);
  if (!item) {
    await AsyncStorage.setItem(key, indexes[i].toString()); //없다는 것은 처음가입한것이므로 새롭게 넣어주는 것.
  }
});
export default function calendar({ navigation }) {
  const date = new Date();

  const onDayPress = (date) => {
    if (date.dateString) {
      for (let i = 0; i < Object.keys(mark).length; i++) {
        if (Object.keys(mark).includes(date.dateString)) {
          navigation.navigate("QuestionCards", { dateString: date.dateString }); // { dateString: date.dateString } 가 route.parms안에 들어간다.
        } else {
          Alert.alert("질문카드가 없어요!");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Initially visible month. Default = Date()
        current={date}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2021-01-01"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2022-12-31"}
        markedDates={mark}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          onDayPress(day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        //renderArrow={(direction) => (<Arrow/>)}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(substractMonth) => substractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        /** Replace default month and year title with custom one. the function receive a date as parameter. */
        //renderHeader={(date) => {/*Return JSX*/}}
        theme={{
          textSectionTitleColor: "#AABC6A",
          selectedDayTextColor: "white",
          todayTextColor: "#B6D5CD",
          dayTextColor: "#5D746C",
          dotColor: "#AABC6A",
          arrowColor: "#AABC6A",
          monthTextColor: "#5D746C",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
      <Text style={styles.timeline}>TIMELINE</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "white",
  },
  timeline: {
    paddingTop: 35,
    left: 20,
    color: "#AABC6A",
    fontSize: 20,
    fontFamily: "sans-serif",
  },
});
