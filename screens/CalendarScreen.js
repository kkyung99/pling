import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";

export default function calendar({ navigation }) {
  const date = new Date();
  const [items, setItems] = useState({});
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 8; i += 3) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          for (let j = 0; j < 1; j++) {
            items[strTime].push({
              name: strTime + " 오늘의 기록",
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("QuestionCards")}
        style={{ marginRight: 25, marginLeft: 15, marginTop: 69 }}
      >
        <Card>
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 30,
              paddingBottom: 100,
            }}
          >
            <View>
              <Text style={{}}>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={date}
        renderItem={renderItem}
        pastScrollRange={50}
        futureScrollRange={50}
        theme={{
          agendaTodayColor: "#AABCA6",
          backgroundColor: "white",
          calendarBackground: "white",
          textSectionTitleColor: "#AABCA6",
          selectedDayBackgroundColor: "#AABC6A",
          selectedDayTextColor: "white",
          dotColor: "#AABC6A",
          selectedDotColor: "#5D746C",
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
    </View>
  );
}
