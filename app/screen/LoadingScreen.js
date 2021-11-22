import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function LoadingScreenStartApp({ navigator }) {
  const [auth, setAuth] = useContext(AppContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAuth({ ...auth, isLoadingStartApp: false });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={styles.container}>
      <Text> Zalo App Loading </Text>
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
