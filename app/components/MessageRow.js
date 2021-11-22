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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: 1,
        width: CONSTANTS.WIDTH - 110,
        padding: 20,
        paddingLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
      }}
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text style={[styles.textName]} numberOfLines={1} ellipsizeMode="tail">
          {' '}
          Đa nền tảng{' '}
        </Text>
        <Text style={[styles.textTime]}> 2 giờ </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%'
        }}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textLastMess]}>
          {' '}
          Tin nhắn cuối Tin nhắn cuốiTin nhắn cuốiTin nhắn cuối
        </Text>
        {/* <Text> 2 giờ </Text> */}
      </View>
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
