import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function PlantSelectDetails({ navigation }) {
  const route = useRoute();
  const title = route.params.plantTitle;
  const image = route.params.plantSrc;

  const [plantName, setPlantName] = useState('');
  const [value, setValue] = useState('0');

  // Platform === 'ios
  const [idate1, setIdate1] = useState(new Date());
  const [idate2, setIdate2] = useState(new Date());
  const mode = 'date';

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || idate1;
    setIdate1(currentDate);
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || idate2;
    setIdate2(currentDate);
  };

  function getFormatDate(date) {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  const addPlantIos = async () => {
    if (plantName == '' || value == null) {
      Alert.alert('등록불가', '입력하지 않은 사항이 존재합니다!');
    } else {
      const plantObj = {
        nickname: plantName,
        type: title,
        plantPicture: image,
        plantDay: getFormatDate(idate1),
        lastWater: getFormatDate(idate2),
        waterCycle: value + 1,
        creatorId: firebase.auth().currentUser.uid,
        createdAt: new Date(),
      };

      await firebase
        .firestore()
        .collection('plants')
        .add(plantObj)
        .then(() => {
          Alert.alert('등록완료', '식물이 등록되었습니다!');
          setPlantName('');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'Home' }],
            })
          );
        });
    }

    console.log(plantObj);
  };

  // Platform === "android"
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = formatDate(month);
  let day = date.getDate();
  day = formatDate(day);

  function formatDate(num) {
    let result = '';
    num = Number(num);
    if (num < 10) {
      result = '0' + num;
    } else {
      result = num;
    }

    return result;
  }

  const currentDate = year + '-' + month + '-' + day;

  const [adate2, setAdate2] = useState(currentDate);
  const [adate1, setAdate1] = useState(currentDate);

  const addPlant = async () => {
    if (plantName == '' || value == null) {
      Alert.alert('등록불가', '입력하지 않은 사항이 존재합니다!');
    } else {
      const plantObj = {
        nickname: plantName,
        type: title,
        plantPicture: image,
        plantDay: adate1,
        lastWater: adate2,
        waterCycle: value + 1,
        creatorId: firebase.auth().currentUser.uid,
        createdAt: new Date(),
      };

      await firebase
        .firestore()
        .collection('plants')
        .add(plantObj)
        .then(() => {
          Alert.alert('등록완료', '식물이 등록되었습니다!');
          setPlantName('');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        });
    }

    console.log(plantObj);
  };

  let [fontsLoaded] = useFonts({
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
    'notoSansKR-regular': require('../assets/fonts/NotoSansKR-Regular.ttf'),
    'notoSansKR-light': require('../assets/fonts/NotoSansKR-Light.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.footer}>
          <ScrollView style={{ padding: 1 }}>
            <View>
              <View>
                <Text style={styles.titleText}>식물 등록하기</Text>
                <Text style={styles.titleText1}>
                  당신의 식물을 등록해주세요.
                </Text>
                <Text style={styles.titleText2}>식물 이름</Text>
                <TextInput
                  style={styles.input}
                  placeholder="식물이름을 입력해 주세요"
                  value={plantName}
                  onChangeText={(plantNameValue) =>
                    setPlantName(plantNameValue)
                  }
                />

                <Text style={styles.titleText2}> 식물 입양 날</Text>
                {Platform.OS === 'android' ? (
                  <DatePicker
                    style={styles.datepick}
                    value={adate1}
                    mode="date"
                    placeholder={adate1}
                    format="YYYY-MM-DD"
                    minDate="2021-01-01"
                    maxDate="2023-12-31"
                    confirmBtnText="확인"
                    cancelBtnText="취소"
                    customStyles={{
                      dateIcon: {
                        justifyContent: 'center',
                      },
                      dateInput: {
                        alignItems: 'center',
                      },
                    }}
                    onDateChange={(adate1) => {
                      setAdate1(adate1);
                    }}
                    useNativeDriver={true}
                  />
                ) : (
                    true && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        style={styles.datepick}
                        value={idate1}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange1}
                        locale="KO"
                        useNativeDriver={true}
                      />
                    )
                  )}
                <Text style={styles.titleText2}> 마지막 물 준 날</Text>
                {Platform.OS === 'android' ? (
                  <DatePicker
                    style={styles.datepick}
                    value={adate2}
                    mode="date"
                    placeholder={adate2}
                    minDate="2021-01-01"
                    maxDate="2023-12-31"
                    confirmBtnText="확인"
                    cancelBtnText="취소"
                    customStyles={{
                      dateIcon: {
                        justifyContent: 'center',
                      },
                      dateInput: {
                        alignItems: 'center',
                      },
                    }}
                    onDateChange={(adate2) => {
                      setAdate2(adate2);
                    }}
                    useNativeDriver={true}
                  />
                ) : (
                    true && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        style={styles.datepick}
                        value={idate2}
                        mode={mode}
                        format="YYYY-MM-DD"
                        is24Hour={true}
                        display="default"
                        onChange={onChange2}
                        locale="KO"
                        useNativeDriver={true}
                      />
                    )
                  )}
                <Text style={styles.titleText3}> 물 주기</Text>
                <ModalDropdown
                  onSelect={(value) => {
                    setValue(value);
                  }}
                  options={[
                    '1 일',
                    '2 일',
                    '3 일',
                    '4 일',
                    '5 일',
                    '6 일',
                    '7 일',
                    '8 일',
                    '9 일',
                    '10 일',
                    '12 일',
                    '12 일',
                    '13 일',
                    '14 일',
                    '15 일',
                    '16 일',
                    '17 일',
                    '18 일',
                    '19 일',
                    '20 일',
                    '21 일',
                    '22 일',
                    '23 일',
                    '24 일',
                    '25 일',
                    '26 일',
                    '27 일',
                    '28 일',
                    '29 일',
                    '30 일',
                    '31 일',
                  ]}
                  style={{
                    marginTop: 25,
                    alignItems: 'center',
                  }}
                  dropdownTextStyle={{
                    fontSize: 12,
                    color: 'black',
                    textAlign: 'center',
                  }}
                  textStyle={{
                    fontSize: 18,
                    color: 'gray',
                    fontFamily: 'notoSansKR-regular',
                  }}
                  defaultValue={'물 주기 선택..'}
                  dropdownStyle={{
                    width: 100,
                    borderColor: 'black',
                  }}
                />
              </View>
              <TouchableOpacity style={styles.Button}>
                <Text
                  style={styles.ButtonText}
                  onPress={() =>
                    Platform.OS === 'android' ? addPlant() : addPlantIos()
                  }
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCE6DD',
  },
  header: {
    flex: 0.5,
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: 22,
    color: '#355F5D',
    fontFamily: 'notoSansKR-bold',
  },
  titleText1: {
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'notoSansKR-regular',
    fontSize: 14,
    color: '#355F5D',
  },
  titleText2: {
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 25,
    fontSize: 18,
    color: '#355F5D',
    fontFamily: 'notoSansKR-bold',
  },
  input: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    fontFamily: 'notoSansKR-light',
  },
  Button: {
    width: 200,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 14,
    backgroundColor: '#355F5D',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  titleText3: {
    paddingTop: 25,
    fontSize: 18,
    color: '#355F5D',
    fontFamily: 'notoSansKR-bold',
  },
  datepick: {
    width: '50%',
    marginTop: 20,
    alignSelf: 'center',
  },
});
