import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLOR_ZALO } from '../constant/ColorCommon';

const LoadingFetch = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF'
    }}
  >
    <ActivityIndicator size="large" color={COLOR_ZALO.searchBackground} />
  </View>
);

export default LoadingFetch;
