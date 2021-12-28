import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { AppContext } from '../context/AppContext';

const IMAGE_LOADING = require('../assets/Loadingv1.png');

export default function LoadingScreenStartApp({ navigator }) {
  const [auth, setAuth] = useContext(AppContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAuth({ ...auth, isLoadingStartApp: false });
    }, 600);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={IMAGE_LOADING} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
