import { Platform, StyleSheet, StatusBar } from 'react-native';

const stylesGlobal = StyleSheet.create({
  androidSafeAreaView: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});
