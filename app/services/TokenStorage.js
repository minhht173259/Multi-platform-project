import AsyncStorage from '@react-native-async-storage/async-storage';

export const tokenStorage = {
  async tokenInvalid(code) {
    if (code === 9998) {
      await AsyncStorage.clear();
    }
  }
};
