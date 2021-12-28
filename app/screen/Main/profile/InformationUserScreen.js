import React, { useEffect } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Colors from '../../../constant/Colors';

const HEIGHT_BG_IMAGE = 250 + StatusBar.currentHeight;
const IMAGE_NAV_1 =
  'https://images.unsplash.com/photo-1560306843-33986aebaf12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
const InformationUserScreen = ({ navigation, route }) => {
  const {
    userId,
    username,
    phonenumber,
    country,
    description,
    link,
    avatar,

    isFriend,

    isOwner
  } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: '#FFFFFF',
      presentation: 'transparentModal',
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  const data = [
    {
      key: 1,
      title: 'Tên Zalo',
      value: username
    },
    {
      key: 2,
      title: 'Mô tả',
      value: description
    },
    {
      key: 3,
      title: 'Quốc tịch',
      value: country
    },
    {
      key: 4,
      title: 'Link',
      value: link
    },
    {
      key: 5,
      title: 'Số điện thoại',
      value: phonenumber
    }
  ];

  const onPressChangeInformation = () => {
    navigation.push('EditInformation', {
      userId,
      username,
      phonenumber,
      country,
      description,
      link,
      avatar
    });
  };

  const onPressMess = () => {
    navigation.push('MessageDetail', {
      partnerId: userId,
      partnerAvatar: avatar?.link,
      partnerName: username,
      partnerPhone: phonenumber
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground source={{ uri: IMAGE_NAV_1 }} style={[styles.imageBackground]} />
        <View style={styles.headerInfo}>
          <Image source={{ uri: avatar?.link || IMAGE_NAV_1 }} style={styles.headerImage} />
          <Text style={styles.headerText}>{username}</Text>
        </View>
      </View>

      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#FFFFFF', paddingLeft: 16 }}>
          {data.map((item, key) => (
            <InfoUserRow title={item.title} value={item.value} border={key !== data.length - 1} key={key} />
          ))}
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
          {isOwner ? (
            <TouchableOpacity
              style={styles.buttonOwner}
              onPress={onPressChangeInformation}
              underlayColor="rgba(52,52,52,0)"
            >
              <Text style={styles.buttonText}>Đổi thông tin</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonOwner} onPress={onPressMess}>
              <Text style={styles.buttonText}>Nhắn tin</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const InfoUserRow = ({ title, value, border }) => (
  <View style={[styles.rowContainer, { borderBottomWidth: border ? 1 : 0 }]}>
    <Text style={(styles.rowText, { width: '30%' })}>{title}</Text>
    <Text style={[styles.rowText, { color: Colors.zaloGrayText, flexGrow: 1 }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zaloBackgroundColor
  },
  headerContainer: {
    width: '100%',
    height: HEIGHT_BG_IMAGE
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

    position: 'absolute'
  },
  headerInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(52, 52, 52, 0.5)'
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16
  },
  rowContainer: {
    width: '100%',
    paddingVertical: 16,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.zaloUnderlineColor
  },
  rowText: {
    fontSize: 14
  },
  buttonOwner: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.zaloBlue,

    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

export default InformationUserScreen;
