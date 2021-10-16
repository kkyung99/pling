import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const question = [
  '이번주 당신을 위한 한가지 소확행을 해 보세요! 당신은 그걸 왜 좋아하는지, 어떻게 좋아하게 되었는지 들려주세요.',
  '요즘 당신은 어떤 일에 관심이 많나요?',
  '최근 놀러간 곳은 어디인가요? 그곳은 어땠는지 제게 들려주세요.',
  ' 이번 주에 가장 잘했던 일은 어떤 건가요?',
  "'식물'이라는 단어를 새롭게 정의한다면 무엇이라 할 수 있을까요?",
  '오늘 나를 어떨 때 떠올렸나요?',
  '저와 함께한 오늘 하루는 어땠어요?',
  '아무리 힘들어도 건강 챙기기! 이번주에 실천한 운동은 어떤 것이 있나요?           (만약 운동하는 것이 없다면 다른 사소한 일을 적어보아요)',
  '저의 분갈이 시기를 잊지 않으셨죠? ',
  '당신만의 마음을 다스리는 방법은 무엇인가요?',
  '지금 당신을 웃게 한 건 뭔가요? 사소한 것이라도 좋아요.',
  '이번달에 피는 꽃은 무엇일까요? 당신의 이번 달 목표는 무엇인가요?',
  '당신의 행복한 일상 속에 나는 얼마나 많은 비중을 차지하나요?',
  '오늘도 고생했어요. 사람들은 스트레스에 매운 음식을 먹는다던데, 당신은 오늘 뭘 먹었나요?',
  '당신을 식물에 비유한다면 어떤 식물과 가장 유사할까요?',
  '오늘은 어떤 일상을 보내고 싶나요?',
  '오늘 나의 흙 상태는 촉촉한가요, 건조한가요?',
  '오늘 저의 상태는 어떤가요?',
  '올 해, 꼭 이루고자 하는 것 세가지는 무엇인가요? 잘 이루어나가고 있나요?',
  '나는 얼마나 성장했나요? 당신도 내가 성장한 만큼 성장하였나요',
  '오늘 날씨는 어때요? 제가 햇빛을 쬐기에 좋은가요? 당신의 마음의 날씨는 어떤가요',
  '나만 챙기는 거 아니죠? 당신의 건강을 위해 어떤 노력을 하나요',
  '요즘 좋아하는 음식은 무엇인가요? 자꾸 생각나는 것 없어요? 제게도 들려주세요.',
  '남에게 말하지 못하는 비밀이 있다면 저에게만 이야기해 보고 훌훌 털어버려요.',
  '오늘은 자신을 칭찬하는 날! 조그마한 것이라도 좋아요, 칭찬 두가지를 해 보세요.',
  '계절마다 저를 어떻게 관리해 주나요? 당신만의 노하우를 알려주세요. 어떻게 알게 된 방법인지 시행착오도 좋아요.',
  '이번 주 당신을 웃게 한 일은 무엇인가요?',
  '가장 행복하다고 느낄 때는 언제인가요?',
  '저는 지금 얼마만큼 큰 것 같나요? 궁금하지 않나요?',
  '오늘 하루 감사한 일을 세가지만 꼽아보라면 어떤 것이 있을까요?',
  '오늘 저는 햇빛을 많이 받았나요?',
  '제가 가장 좋아하는 온도는 몇 도인가요, 오늘 당신의 마음의 온도는 어땠어요?',
  '오늘의 저를 형용사로 묘사한다면 어떻게 표현할 수 있을까요??',
  '오늘 내 잎의 상태는 어떤가요? 끝이 노랗게 타진 않았나요?',
  '(하루를 마무리하며)오늘 당신의 계획은 무엇이었나요? 계획을 다 이행했나요?',
  '일에만 지쳐있는 당신, 잠시 주변을 둘러보세요. 당신의 취미는 무엇인가요? 어떤 걸 좋아하나요.',
  '오늘 당신이 한 제일 잘 한 일과 제일 부족한 일은 무엇이었나요? 제게 털어놓아보아요.',
  '나와 함께하고 당신에겐 어떤 변화가 있었나요, 새로운 습관이 생겼나요?',
  '오늘 당신은 하루 세끼 잘 챙겼나요? 누구를 만나고 무엇을 먹었나요.',
  '요즘 도전해보고 싶은 취미가 있나요?',
  '이번 주 당신이 환경을 위해 노력한 일에 대해 제게 들려주세요.',
  '나와 함께한 뒤 당신의 공간은 어떻게 바뀌었나요, 이 공간이 당신에게 주는 의미에 내가 온기를 더했을까요?',
  '오늘 저의 건강상태를 상세히 알려주세요.',
  '오늘 기분 상한 일이 있었나요? 저에게 이야기하고 잊어버려요.',
  "'행복'이라는 단어를 새롭게 정의한다면 뭐라고 할 수 있을까요?",
  '오늘 나는 어떤가요? 나에게 일어난 일이 당신에게는 어떤 영향을 주었나요?',
  '당신이 가장 좋아하는 꽃은 무엇인가요? 그 꽃의 꽃말은 무엇인가요.',
  '당신이 가장 좋아하는 꽃을 알 수 있어좋네요. 그 꽃을 좋아하게된 이유도 알려주세요. ',
  '지금까지 나와 함께 한 시간 중 가장 기억에 남는 순간이 언제인가요.',
  '당신이 생각하는 당신의 매력포인트는 무엇인가요? (세가지정도)',
  '오늘 저는 저를 위해 열심히 영양분을 섭취했어요. 당신도 당신을 위해 요리를 해보는거 어때요?',
  '이제는 저를 어떻게 키우는지 감이 오나요?아님 아직 어려운가요?',
];

export default function QuestionCards({ navigation }) {
  const route = useRoute(); //{ dateString: date.dateString }=route.parms
  const [item, setItem] = useState('');

  useEffect(() => {
    (async () => {
      if (!route.params || !route.params.dateString) return; // false || true =>true
      const { dateString } = route.params; //const dateString = route.params.dateString;
      const card = (await AsyncStorage.getItem(dateString)) || ''; //"" = 배열
      console.log(card);
      if (card) {
        setItem(question[parseInt(card, 10)]); // question 배열의 몇번칸인지
      }
    })();
  }, [route]); //배열안에 값이 바뀔때 useEffect첫번째 함수를 호출한다.
  //유저가 회원가입을 하는시점에 배열을 셔플로

  const [post, setPost] = useState('');

  const addPost = async () => {
    if (post.length > 1) {
      const postObj = {
        question: item,
        text: post,
        createdAt: route.params.dateString,
        creatorId: firebase.auth().currentUser.uid,
      };
      await firebase
        .firestore()
        .collection('posts')
        .add(postObj)
        .then(() => {
          Alert.alert('등록완료', '게시글이 등록되었습니다!');
          setPost(''); //입력칸 초기화
          navigation.navigate('Calendar');
        });
    } else {
      Alert.alert('미작성', '오늘의 기록을 작성해주세요!');
    }
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
        <View style={styles.header}>
          <Image
            style={{
              position: 'absolute',
              width: windowWidth,
              top: -45,
            }}
            source={require('../assets/write5.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.footer}>
          <KeyboardAwareScrollView behavior="padding" enabled>
            <View>
              <View style={styles.title}>
                <Text style={styles.randomitem}>{item}</Text>
              </View>
              <View style={styles.title2}>
                <TextInput
                  style={styles.input}
                  placeholder="오늘 하루를 플링과 마무리해보세요!"
                  multiline={true}
                  keyboardType="web-search"
                  returnKeyType="done"
                  value={post}
                  scrollEnabled={true}
                  onChangeText={(textValue) => setPost(textValue)}
                />
              </View>
              <TouchableOpacity style={styles.Button}>
                <Text style={styles.ButtonText} onPress={() => addPost()}>
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E5D5',
  },
  header: {
    flex: 0.5,
  },
  footer: {
    position: 'absolute',
    width: windowWidth,
    height: '100%',
    top: windowHeight * 0.11,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 30,
    paddingBottom: 15,
  },
  randomitem: {
    alignSelf: 'center',
    textAlign: 'center',
    width: windowWidth * 0.8,
    padding: 25,
    fontSize: 16,
    fontFamily: 'notoSansKR-regular',
  },
  title: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#F7DA8C',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    top: 10,
  },
  title2: {
    borderRadius: 30,
    marginTop: windowHeight * 0.05,
    backgroundColor: '#FDF0D0',
    width: '80%',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 20,
  },
  input: {
    alignSelf: 'center',
    textAlignVertical: 'top',
    width: '100%',
    height: windowHeight * 0.35,
    padding: 20,
    paddingTop: 20,
    color: 'black',
    fontSize: 14,
    borderRadius: 30,
    fontSize: 16,
    fontFamily: 'notoSansKR-light',
  },
  Button: {
    alignSelf: 'center',
    width: 200,
    marginTop: windowHeight * 0.1,
    borderRadius: 30,
    paddingVertical: 14,
    backgroundColor: '#355F5D',
    color: 'white',
  },
  ButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'notoSansKR-bold',
  },
});
