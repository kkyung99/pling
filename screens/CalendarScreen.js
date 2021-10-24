import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import * as firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { windowHeight } from '../utils/Dimentions';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';
const mark = {
  '2021-11-06': { marked: true, dotColor: '#769A6A' },
  '2021-11-11': { marked: true, dotColor: '#769A6A' },
  '2021-11-15': { marked: true, dotColor: '#769A6A' },
  '2021-11-24': { marked: true, dotColor: '#769A6A' },
  '2021-12-04': { marked: true, dotColor: '#769A6A' },
  '2021-12-07': { marked: true, dotColor: '#769A6A' },
  '2021-12-16': { marked: true, dotColor: '#769A6A' },
  '2021-12-25': { marked: true, dotColor: '#769A6A' },
  '2022-01-01': { marked: true, dotColor: '#769A6A' },
  '2022-01-05': { marked: true, dotColor: '#769A6A' },
  '2022-01-11': { marked: true, dotColor: '#769A6A' },
  '2022-01-21': { marked: true, dotColor: '#769A6A' },
  '2022-01-23': { marked: true, dotColor: '#769A6A' },
  '2022-02-03': { marked: true, dotColor: '#769A6A' },
  '2022-02-12': { marked: true, dotColor: '#769A6A' },
  '2022-02-17': { marked: true, dotColor: '#769A6A' },
  '2022-02-22': { marked: true, dotColor: '#769A6A' },
  '2022-03-05': { marked: true, dotColor: '#769A6A' },
  '2022-03-09': { marked: true, dotColor: '#769A6A' },
  '2022-03-13': { marked: true, dotColor: '#769A6A' },
  '2022-03-24': { marked: true, dotColor: '#769A6A' },
  '2022-04-01': { marked: true, dotColor: '#769A6A' },
  '2022-04-07': { marked: true, dotColor: '#769A6A' },
  '2022-04-12': { marked: true, dotColor: '#769A6A' },
  '2022-04-20': { marked: true, dotColor: '#769A6A' },
  '2022-04-30': { marked: true, dotColor: '#769A6A' },
  '2022-05-05': { marked: true, dotColor: '#769A6A' },
  '2022-05-08': { marked: true, dotColor: '#769A6A' },
  '2022-05-16': { marked: true, dotColor: '#769A6A' },
  '2022-05-27': { marked: true, dotColor: '#769A6A' },
  '2022-06-01': { marked: true, dotColor: '#769A6A' },
  '2022-06-06': { marked: true, dotColor: '#769A6A' },
  '2022-06-18': { marked: true, dotColor: '#769A6A' },
  '2022-06-23': { marked: true, dotColor: '#769A6A' },
  '2022-07-02': { marked: true, dotColor: '#769A6A' },
  '2022-07-07': { marked: true, dotColor: '#769A6A' },
  '2022-07-12': { marked: true, dotColor: '#769A6A' },
  '2022-07-22': { marked: true, dotColor: '#769A6A' },
  '2022-07-24': { marked: true, dotColor: '#769A6A' },
  '2022-07-31': { marked: true, dotColor: '#769A6A' },
  '2022-08-12': { marked: true, dotColor: '#769A6A' },
  '2022-08-15': { marked: true, dotColor: '#769A6A' },
  '2022-08-26': { marked: true, dotColor: '#769A6A' },
  '2022-09-01': { marked: true, dotColor: '#769A6A' },
  '2022-09-09': { marked: true, dotColor: '#769A6A' },
  '2022-09-12': { marked: true, dotColor: '#769A6A' },
  '2022-09-21': { marked: true, dotColor: '#769A6A' },
  '2022-09-30': { marked: true, dotColor: '#769A6A' },
  '2022-10-03': { marked: true, dotColor: '#769A6A' },
  '2022-10-15': { marked: true, dotColor: '#769A6A' },
  '2022-10-20': { marked: true, dotColor: '#769A6A' },
  '2022-10-25': { marked: true, dotColor: '#769A6A' },
  '2022-10-31': { marked: true, dotColor: '#769A6A' },
};
const indexes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
].sort(() => Math.random() - 0.5);
// AsyncStorage.clear();
Object.keys(mark).forEach(async (key, i) => {
  const item = await AsyncStorage.getItem(key);
  if (!item) {
    await AsyncStorage.setItem(key, indexes[i].toString());
  }
});

export default function CalendarScreen({ navigation }) {
  const date = new Date();

  const onDayPress = (date) => {
    if (date.dateString) {
      for (let i = 0; i < Object.keys(mark).length; i++) {
        if (Object.keys(mark).includes(date.dateString)) {
          navigation.navigate('QuestionCards', { dateString: date.dateString });
        } else {
          navigation.navigate('NoQuestionCards', {
            dateString: date.dateString,
          });
        }
      }
    }
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .where('creatorId', '==', firebase.auth().currentUser.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const postsArray = [];
        querySnapshot.docs.forEach((doc) => {
          const { question, text, createdAt, creatorId } = doc.data();
          postsArray.push({
            id: doc.id,
            question,
            text,
            createdAt,
            creatorId,
          });
        });

        setPosts(postsArray);
      });
  }, []);

  const deletePost = async (item) => {
    await firebase
      .firestore()
      .collection('posts')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  let [fontsLoaded] = useFonts({
    'notoSansKR-regular': require('../assets/fonts/NotoSansKR-Regular.ttf'),
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
    'tektonPro-bold': require('../assets/fonts/TektonPro-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ marginTop: 50 }}>
          <View style={{ alignSelf: 'center', width: '90%' }}>
            <Calendar
              current={date}
              minDate={'2021-01-01'}
              maxDate={'2022-12-31'}
              markedDates={mark}
              onDayPress={(day) => {
                let find = false;
                for (let i = 0; i < posts.length; i++) {
                  if (day.dateString === posts[i].createdAt) {
                    find = true;
                    Alert.alert(
                      '이미 게시글을 작성하였습니다!',
                      '하루에 한 게시글만 작성할 수 있습니다'
                    );
                    break;
                  }
                }
                if (!find) {
                  onDayPress(day);
                }
              }}
              onDayLongPress={(day) => {
                console.log('selected day', day);
              }}
              monthFormat={'yyyy MM'}
              onMonthChange={(month) => {
                console.log('month changed', month);
              }}
              hideArrows={false}
              hideExtraDays={false}
              disableMonthChange={true}
              firstDay={0}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={(substractMonth) => substractMonth()}
              onPressArrowRight={(addMonth) => addMonth()}
              disableArrowLeft={false}
              disableArrowRight={false}
              disableAllTouchEventsForDisabledDays={true}
              theme={{
                textSectionTitleColor: '#355F5D',
                calendarBackground: '#FFFAEF',
                selectedDayTextColor: 'white',
                todayTextColor: '#AABC6A',
                dayTextColor: '#5D746C',
                dotColor: '#355F5D',
                arrowColor: '#355F5D',
                monthTextColor: '#5D746C',
                textDayFontFamily: 'notoSansKR-regular',
                textMonthFontFamily: 'notoSansKR-bold',
                textDayHeaderFontFamily: 'notoSansKR-regular',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
              style={{
                // marginTop: 20,
                paddingBottom: 10,
                borderRadius: 15,
              }}
            />
          </View>
          <Text style={styles.timeline}>TIMELINE</Text>
          <FlatList
            keyExtractor={(item) => item.id}
            data={posts}
            renderItem={({ item }) => (
              <View>
                {item.question == '' ? (
                  <View style={styles.cardPost2}>
                    <Text style={styles.cardContent2}>{item.text}</Text>
                    <Text style={styles.cardDate}>{item.createdAt}</Text>
                    <TouchableOpacity
                      style={styles.deleteIcon}
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      onPress={() => {
                        Alert.alert(
                          '알림',
                          '정말 삭제하시겠습니까?',
                          [
                            {
                              text: '아니요',
                              onPress: () => console.log('삭제 불가'),
                              style: 'cancel',
                            },
                            { text: '네', onPress: () => deletePost(item) },
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <FontAwesome name="trash" size={15} color={'gray'} />
                    </TouchableOpacity>
                  </View>
                ) : (
                    <View style={styles.cardPost}>
                      <Text style={styles.cardTitle}>{item.question}</Text>
                      <Text style={styles.cardContent}>{item.text}</Text>
                      <Text style={styles.cardDate}>{item.createdAt}</Text>
                      <TouchableOpacity
                        style={styles.deleteIcon}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        onPress={() => {
                          Alert.alert(
                            '알림',
                            '정말 삭제하시겠습니까?',
                            [
                              {
                                text: '아니요',
                                onPress: () => console.log('삭제 불가'),
                                style: 'cancel',
                              },
                              { text: '네', onPress: () => deletePost(item) },
                            ],
                            { cancelable: false }
                          );
                        }}
                      >
                        <FontAwesome name="trash" size={15} color={'gray'} />
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAEF',
    paddingBottom: Platform.OS === 'ios' ? 70 : windowHeight * 0.112,
  },
  timeline: {
    paddingTop: 15,
    paddingBottom: 5,
    left: 20,
    color: '#6A7D36',
    fontSize: 30,
    letterSpacing: 3,
    fontFamily: 'tektonPro-bold',
  },
  cardPost: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    margin: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  cardPost2: {
    backgroundColor: '#FFF6E0',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#FFF6E0',
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    margin: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  cardTitle: {
    fontFamily: 'notoSansKR-bold',
    fontSize: 15,
    margin: 10,
  },
  cardContent: {
    fontFamily: 'notoSansKR-regular',
    fontSize: 13,
    margin: 10,
    marginTop: 0,
  },
  cardContent2: {
    fontFamily: 'notoSansKR-regular',
    fontSize: 13,
    margin: 10,
  },
  cardDate: {
    fontFamily: 'notoSansKR-regular',
    fontSize: 11,
    margin: 10,
    color: '#5D746C',
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    bottom: -60,
    height: 80,
  },
});
