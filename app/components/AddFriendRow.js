import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { CONSTANTS } from '../constant/Constants';

export const MessageRow = ({ props }) => (
  <View style={styles.messRowContainer}>
    <Image
      style={styles.userImage}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png'
      }}
    />
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingLeft: 0,
        flexGrow: 1
      }}
    >
      <Text style={[styles.textName]} numberOfLines={1} ellipsizeMode="tail">
        {' '}
        Hoàng Trọng Minh{' '}
      </Text>
      <Text style={[styles.textTime]}> Từ số điện thoại </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textLastMess]}>
        {' '}
        "Xin chào"
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  messRowContainer: {
    width: CONSTANTS.WIDTH,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 20
  },
  textName: {
    fontSize: 20,
    fontWeight: '600'
  },
  textTime: {
    fontSize: 14,
    color: '#858d92'
  },
  textLastMess: {
    fontSize: 16,
    color: '#858d92'
  }
});
