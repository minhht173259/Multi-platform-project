import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function AuthLoadingScreen() {
  return (
    <View style={styles.container}>
      <Text> Authentication Loading </Text>
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
