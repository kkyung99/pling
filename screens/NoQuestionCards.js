import React, { useState } from 'react';
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
import * as firebase from 'firebase';
import 'firebase/firestore';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function NoQuestionCards({ navigation }) {
  const route = useRoute();

  const [post, setPost] = useState('');

  const addPost = async () => {
    if (post.length > 1) {
      const postObj = {
        question: '',
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
          setPost('');
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
              top: -10,
            }}
            source={require('../assets/write5.png')}
            resizeMode="contain"
          />
        </View>

        <View style={styles.footer}>
          <KeyboardAwareScrollView behavior="padding" enabled>
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
    top: windowHeight * 0.15,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 30,
    paddingBottom: 30,
  },
  title2: {
    borderRadius: 30,
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
    height: windowHeight * 0.4,
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
    marginTop: windowHeight * 0.13,
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
