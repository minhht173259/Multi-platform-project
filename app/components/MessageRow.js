import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { CONSTANTS } from '../constant/Constants';

const G_IMAGE_1 =
  'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=383&q=80';
const G_IMAGE_2 =
  'https://images.unsplash.com/photo-1621317911081-f123294e86c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80';
const G_IMAGE_3 =
  'https://images.unsplash.com/photo-1612422659019-0d1456e66bca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80';
const G_IMAGE_4 =
  'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

export const MessageRow = ({ isGroup = false, props }) => {
  const renderImageGroup = () => {
    const viewGroup = (
      <View style={styles.groupImages}>
        <Image
          source={{
            uri: G_IMAGE_1
          }}
          style={[
            styles.groupImage,
            {
              top: 0,
              left: 0,
              zIndex: 5
            }
          ]}
        />
        <Image
          source={{
            uri: G_IMAGE_2
          }}
          style={[
            styles.groupImage,
            {
              bottom: 0,
              left: 0,
              zIndex: 4
            }
          ]}
        />
        <Image
          source={{
            uri: G_IMAGE_3
          }}
          style={[
            styles.groupImage,
            {
              top: 0,
              right: 0,
              zIndex: 3
            }
          ]}
        />
        <View
          style={[
            styles.groupImage,
            {
              bottom: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#cdd5e3',
              zIndex: 2
            }
          ]}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>66</Text>
        </View>
      </View>
    );

    return viewGroup;
  };

  return (
    <View style={styles.messRowContainer}>
      {!isGroup ? (
        <Image
          style={styles.userImage}
          source={{
            uri: G_IMAGE_4
          }}
        />
      ) : (
        renderImageGroup()
      )}
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
};

const styles = StyleSheet.create({
  messRowContainer: {
    width: CONSTANTS.WIDTH,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 20
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
  },
  groupImages: {
    height: 60,
    width: 60,
    marginHorizontal: 20,
    position: 'relative'
  },

  groupImage: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 19
  }
});
