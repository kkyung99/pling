import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function PlantSelectScreen({ navigation }) {
  const [imageData, setImageData] = useState([
    {
      id: 1,
      title: '선인장',
      image: require('../assets/1.png'),
    },
    {
      id: 2,
      title: '넝쿨',
      image: require('../assets/2.png'),
    },
    {
      id: 3,
      title: '몬스테라',
      image: require('../assets/3.png'),
    },
    {
      id: 4,
      title: '꽃',
      image: require('../assets/4.png'),
    },
    {
      id: 5,
      title: '야자수',
      image: require('../assets/5.png'),
    },
  ]);

  const clickHandler = (item) => {
    const title = item.title;
    const id = item.id;
    navigation.navigate('PlantSelectDetailScreen', {
      plantTitle: title,
      plantSrc: id,
    });
  };

  let [fontsLoaded] = useFonts({
    'notoSansKR-regular': require('../assets/fonts/NotoSansKR-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.footer}>
          <FlatList
            data={imageData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => clickHandler(item)}>
                <View>
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.item}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
  item: {
    backgroundColor: '#F2F2F2',
    color: '#000000',
    fontFamily: 'notoSansKR-regular',
    padding: 70,
    fontSize: 20,
    paddingLeft: 150,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden', //필요
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    left: 40,
    top: 35,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    zIndex: 1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
});
