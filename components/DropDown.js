import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-datepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), item: 0 };
  }
  render() {
    return (
      <View>
        <Text style={styles.titleText2}> 식물 입양 날</Text>
        <DatePicker
          style={styles.datepick}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2021-01-01"
          maxDate="2023-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({ date: date });
          }}
        />
        <Text style={styles.titleText2}> 마지막 물 준 날</Text>
        <DatePicker
          style={styles.datepick}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2021-01-01"
          maxDate="2023-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({ date: date });
          }}
        />
        <Text style={styles.titleText2}> 물 주기</Text>
        <DropDownPicker
          style={styles.droppick}
          items={[
            { label: "1일", value: "1", selected: true },
            { label: "2일", value: "2" },
            { label: "3일", value: "3" },
            { label: "4일", value: "4" },
            { label: "5일", value: "5" },
            { label: "6일", value: "6" },
            { label: "7일", value: "7" },
            { label: "8일", value: "8" },
            { label: "9일", value: "9" },
            { label: "10일", value: "10" },
            { label: "11일", value: "11" },
            { label: "12일", value: "12" },
            { label: "13일", value: "13" },
            { label: "14일", value: "14" },
            { label: "15일", value: "15" },
            { label: "16일", value: "16" },
            { label: "17일", value: "17" },
            { label: "18일", value: "18" },
            { label: "19일", value: "19" },
            { label: "20일", value: "20" },
            { label: "21일", value: "21" },
            { label: "22일", value: "22" },
            { label: "23일", value: "23" },
            { label: "24일", value: "24" },
            { label: "25일", value: "25" },
            { label: "26일", value: "26" },
            { label: "27일", value: "27" },
            { label: "28일", value: "28" },
            { label: "29일", value: "29" },
            { label: "30일", value: "30" },
            { label: "31일", value: "31" },
          ]}
          defaultIndex={0}
          //containerStyle={{height: 40}}
          onChangeItem={(item) => {
            this.setState({ item: item });
          }}
          //onChangeItem={item => console.log(item.label, item.value)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titleText2: {
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 25,
    fontSize: 18,
    color: "#AABCA6",
    fontWeight: "bold",
  },
  datepick: {
    width: 200,
    left: 70,
    marginTop: 20,
  },
  droppick: {
    borderRadius: 20,
    height: 50,
    width: 250,
    left: 52,
  },
});
