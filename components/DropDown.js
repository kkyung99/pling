import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-datepicker";
import ModalDropdown from "react-native-modal-dropdown";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { date1: new Date(), date2: new Date(), item: 0, value: 0 };
  }
  render() {
    return (
      <View>
        <Text style={styles.titleText2}> 식물 입양 날</Text>
        <DatePicker
          style={styles.datepick}
          date={this.state.date1}
          mode="date"
          placeholder="select date"
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
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(index, date1) => {
            this.setState({ date1: date1 });
          }}
        />
        <Text style={styles.titleText2}> 마지막 물 준 날</Text>
        <DatePicker
          style={styles.datepick}
          date={this.state.date2}
          mode="date"
          placeholder="select date"
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
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date2) => {
            this.setState({ date2: date2 });
          }}
        />
        <Text style={styles.titleText2}> 물 주기</Text>
        <ModalDropdown
          onSelect={(value) => {
            this.setState({ selected: value });
          }}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          dropdownTextStyle={{ fontSize: 12, color: "black" }} /*Style here*/
          textStyle={{ fontSize: 18, color: "#AABCA6", left: 95 }}
          dropdownStyle={{
            width: "85%",
            paddingBottom: 10,
            borderColor: "black",
          }}

          //style={{ flex: 1, width: '100%', backgroundColor: 'yellow', justifyContent: 'center' }}
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
});
