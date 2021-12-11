import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView
} from 'react-native';

const HEIGH_NAV = 50;
const HEIGH_SPACE = 200;

const { width, height } = Dimensions.get('window');

const IMAGE_NAV_1 =
  'https://images.unsplash.com/photo-1560306843-33986aebaf12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
const IMAGE_NAV_2 =
  'https://images.unsplash.com/photo-1517997618160-6704002d51fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

export default function ProfileScreen({ navigator }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={{ uri: IMAGE_NAV_1 }} style={[styles.imageNav, {}]} />
      <ScrollView>
        <View />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageNav: {
    position: 'absolute',
    width: '100%',
    height: HEIGH_NAV + HEIGH_SPACE,
    resizeMode: 'contain',
    top: 0
  }
});
