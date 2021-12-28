import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, SafeAreaView, StatusBar, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { SliderCarousel } from '../data/mainCarousel';
import { carousel } from '../constant/IntroConfig';

const { ITEM_WIDTH, ITEM_HEIGHT } = carousel;

const WelcomeScreen = function ({ navigation }) {
  const [data, setData] = useState(SliderCarousel);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={[styles.logo]}> Zalo </Text>
      <View
        style={{
          // flexShrink: 1,
          flexDirection: 'column'
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(_, index) => `_${index}_`}
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="center"
          decelerationRate="normal"
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Image source={item.uri} style={styles.itemImage} />
              <Text style={styles.itemTitle}> {item.title} </Text>
              <Text style={styles.itemContent}> {item.content} </Text>
            </View>
          )}
        />
        <View style={styles.dotContainer}>
          {data &&
            data.map((_, i) => (
              <View
                key={i}
                style={[
                  {
                    width: 8,
                    height: 8,
                    backgroundColor: '#3371FF',
                    borderRadius: 4,
                    marginHorizontal: 3
                  }
                ]}
              />
            ))}
        </View>
      </View>

      <View style={styles.groupButtons}>
        <TouchableOpacity style={styles.login} activeOpacity={0.5} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}> Đăng nhập </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.register} activeOpacity={0.5} onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.buttonText, { color: '#000' }]}> Đăng ký </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.language}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              textTransform: 'capitalize'
            }}
          >
            {' '}
            Tiếng Việt{' '}
          </Text>
          <View
            style={{
              marginTop: 1,
              borderBottomColor: '#000',
              borderBottomWidth: 1
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            textTransform: 'capitalize'
          }}
        >
          {' '}
          English{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logo: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 0,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#337AFF',
    letterSpacing: 1
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  itemImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10
  },
  itemContent: {
    width: ITEM_WIDTH * 0.9,
    textAlign: 'center'
  },
  dotContainer: {
    paddingHorizontal: 40,
    paddingTop: 50,
    paddingBottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  groupButtons: {
    flexGrow: 1,
    flexDirection: 'column',
    marginHorizontal: 80
  },
  login: {
    width: '100%',
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#339FFF',
    borderRadius: 30,
    marginBottom: 15
  },
  register: {
    width: '100%',
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 30
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#fff'
  },
  language: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 80,
    padding: 30
  }
});

export default WelcomeScreen;
