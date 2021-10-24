import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { windowHeight } from '../utils/Dimentions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const slides = [
  {
    key: '1',
    image: require('../assets/onboarding-img1.jpg'),
  },
  {
    key: '2',
    image: require('../assets/onboarding-img2.jpg'),
  },
  {
    key: '3',
    image: require('../assets/onboarding-img3.jpg'),
  },
  {
    key: '4',
    image: require('../assets/onboarding-img4.jpg'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    'notoSansKR-bold': require('../assets/fonts/NotoSansKR-Bold.ttf'),
    'notoSansKR-regular': require('../assets/fonts/NotoSansKR-Regular.ttf'),
  });
  const renderItem = ({ item }) => {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.slide}>
          <ImageBackground source={item.image} style={styles.image}>
            {item.key == '4' && (
              <TouchableOpacity
                style={{
                  zIndex: 10,
                  position: 'absolute',
                  top: '85%',
                  alignSelf: 'center',
                  borderRadius: 50,
                  padding: 10,
                  width: 250,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#355F5D',
                }}
                onPress={() => navigation.navigate('Login')}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontFamily: 'notoSansKR-bold',
                  }}
                >
                  시작하기
                </Text>
              </TouchableOpacity>
            )}
          </ImageBackground>
        </View>
      );
    }
  };

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>다음</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.doneButtonWrapper}>
        <Text style={styles.doneButtonText}>완료</Text>
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>이전</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        showPrevButton
        onDone={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    bottom: windowHeight * 0.045,
  },
  dotStyle: {
    backgroundColor: 'lightgray',
  },
  activeDotStyle: {
    backgroundColor: '#769A6A',
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rightText: {
    color: '#769A6A',
    fontSize: 14,
    fontFamily: 'notoSansKR-regular',
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  leftText: {
    color: '#769A6A',
    fontSize: 14,
    fontFamily: 'notoSansKR-regular',
  },
  doneButtonWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  doneButtonText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#769A6A',
    fontFamily: 'notoSansKR-regular',
  },
});
