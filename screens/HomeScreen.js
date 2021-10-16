import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as firebase from 'firebase';
import Carousel from 'react-native-snap-carousel';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import { AuthContext } from '../navigation/AuthProvider';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const ref = useRef();

  const [plants, setPlants] = useState([]);

  const { setCheck } = useContext(AuthContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection('plants')
      .where('creatorId', '==', firebase.auth().currentUser.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const plantsArray = [];
        querySnapshot.docs.forEach((doc) => {
          const {
            creatorId,
            lastWater,
            nickname,
            plantDay,
            plantPicture,
            type,
            waterCycle,
            createdAt,
          } = doc.data();
          plantsArray.push({
            id: doc.id,
            creatorId,
            plantPicture,
            type,
            nickname,
            plantDay,
            lastWater,
            waterCycle,
            createdAt,
          });
        });

        setPlants(plantsArray);
        setCheck(plantsArray);
      });
  }, []);

  const deletePlant = async (item) => {
    await firebase
      .firestore()
      .collection('plants')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  const updatePlant = async (item, reDate) => {
    await firebase.firestore().collection('plants').doc(item.id).update({
      lastWater: reDate,
    });
  };

  const idToImageMap = {
    1: require('../assets/1.png'),
    2: require('../assets/2.png'),
    3: require('../assets/3.png'),
    4: require('../assets/4.png'),
    5: require('../assets/5.png'),
  };

  const calDay = (item) => {
    let fday = new Date(item.lastWater).toDateString();
    let dday = new Date(fday).getTime();

    dday += item.waterCycle * 1000 * 60 * 60 * 24;
    let waterDay = dday - Date.now();
    waterDay = Math.floor(waterDay / (1000 * 60 * 60 * 24));

    let date = new Date(dday);

    let year = date.getFullYear().toString();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let reDate = year + '-' + month + '-' + day;

    if (waterDay == 0) {
      waterDay = 'day';
      return waterDay;
    } else if (waterDay < 0) {
      updatePlant(item, reDate);
    } else {
      return waterDay;
    }
  };

  const totalCheck = [
    ...plants,
    ...(plants.length == 0 ? [{ isPlus: true }] : []),
  ];

  let [fontsLoaded] = useFonts({
    'notoSansKR-regular': require('../assets/fonts/NotoSansKR-Regular.ttf'),
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Carousel
          index={index}
          inactiveSlideOpacity={0.5}
          itemWidth={windowWidth * 0.9}
          onSnapToItem={(index) => setIndex(index)}
          sliderWidth={windowWidth}
          data={totalCheck}
          renderItem={({ item }) =>
            item.isPlus ? (
              <View
                style={{
                  height: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: 'lightgray',
                    fontFamily: 'notoSansKR-regular',
                  }}
                >
                  + 버튼을 눌러
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'lightgray',
                    fontFamily: 'notoSansKR-regular',
                  }}
                >
                  식물을 등록해주세요!
                </Text>
              </View>
            ) : (
              <View style={styles.cardPlant}>
                <Image
                  source={idToImageMap[item.plantPicture]}
                  style={{
                    width: '100%',
                    height: windowHeight * 0.65,
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    position: 'absolute',
                    top: windowHeight * 0.632,
                    alignSelf: 'center',
                  }}
                >
                  <Text style={{ fontFamily: 'notoSansKR-bold', fontSize: 20 }}>
                    {item.nickname}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#355F5D',
                    right: windowWidth * 0.5,
                    bottom: windowHeight * 0.01,
                    width: 140,
                    borderRadius: 30,
                    elevation: 2,
                    shadowOffset: { width: 0, height: 2 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                  }}
                >
                  <Text style={styles.plantDay}>D - {calDay(item)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      '알림',
                      "'" + item.nickname + "'" + ' 식물을 삭제하시겠습니까?',
                      [
                        {
                          text: '아니요',
                          onPress: () => console.log('삭제 불가'),
                          style: 'cancel',
                        },
                        { text: '네', onPress: () => deletePlant(item) },
                      ],
                      { cancelable: false }
                    );
                  }}
                  style={styles.delete}
                >
                  <Text style={styles.deletetxt}>삭제하기</Text>
                </TouchableOpacity>
              </View>
            )
          }
          ref={ref}
        />
      </SafeAreaView>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    alignItems: 'center',
    padding: windowHeight * 0.04,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  cardPlant: {
    borderRadius: 15,
    textAlign: 'center',
    height: windowHeight * 0.75,
    overflow: 'hidden',
  },
  delete: {
    position: 'absolute',
    backgroundColor: '#355F5D',
    left: windowWidth * 0.5,
    bottom: windowHeight * 0.01,
    width: 140,
    borderRadius: 30,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  plantDay: {
    margin: 15,
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'notoSansKR-bold',
  },
  deletetxt: {
    margin: 15,
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'notoSansKR-bold',
  },
});
