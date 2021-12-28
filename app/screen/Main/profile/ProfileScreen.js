import React, { useEffect, useContext, useRef, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Animated
} from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import AuthenticationContext from '../../../context/auth-context/AuthenticationContext';
import Icon, { Icons } from '../../../common/component/Icons';
import Colors from '../../../constant/Colors';
import UserContext from '../../../context/user-context/UserContext';

const HEIGH_NAV = 50;
const HEIGH_SB = StatusBar.currentHeight;
const HEIGH_SPACE_PADDING = 200;

const { width, height } = Dimensions.get('window');

const IMAGE_NAV_1 =
  'https://images.unsplash.com/photo-1560306843-33986aebaf12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
const IMAGE_NAV_2 =
  'https://images.unsplash.com/photo-1517997618160-6704002d51fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

export default function ProfileScreen({ navigation, route }) {
  const [authState, authContext] = useContext(AuthenticationContext);
  const [userState, userContext] = useContext(UserContext);
  const { username, avatar, userId, description, phonenumber } = route.params;
  const [user, setUser] = useState({});

  const isOwner = useMemo(() => userId === authState?.id, [userId, authState?.id]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const netInfo = useNetInfo();

  // const opacity = c;
  console.log('TOKEN: ', authState.token);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  useEffect(() => {
    let isMounted = true;
    const getInformation = async () => {
      try {
        if (userId) {
          const response = await userContext.getUserInfo(userId);
          if (response.code === 1000) {
            if (isMounted) {
              setUser(response.data);
            }
            if (isOwner) {
              authContext.refreshInformation(response.data.name, response.data.avatar.link);
            }
          }
        }
      } catch (error) {
        //
        console.log('ERROR', error);
      }
    };

    getInformation();

    return () => {
      isMounted = false;
    };
  }, [userId, username]);

  console.log('USER', user);

  const onPressAdvance = () => {
    if (isOwner) {
      navigation.push('AdvanceOwner', {
        userId,
        username: user.name || username,
        phonenumber: user.phonenumber || phonenumber,
        country: user.country,
        description: user.description || description,
        avatar: user.avatar,
        link: user.link,
        isOwner
      });
    } else {
      navigation.push('AdvanceOwner', {
        userId,
        username: user.name || username,
        phonenumber: user.phonenumber || phonenumber,
        country: user.country,
        description: user.description || description,
        avatar: user.avatar,
        link: user.link,
        isOwner
      });
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgba(52, 52, 52, 0.1)" translucent />
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: Colors.zaloBackgroundColor,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />
        <Animated.View
          style={[
            styles.navigationBar,
            {
              backgroundColor: 'rgba(255, 255, 255, 0)'
            }
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon type={Icons.Feather} name="arrow-left" size={26} color="#ffffff" />
          </TouchableOpacity>
          <Animated.View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexGrow: 1,
              opacity: 0
            }}
          >
            <Image
              source={{
                uri: user?.avatar?.link || avatar || IMAGE_NAV_2
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: 'cover',
                marginHorizontal: 16,
                borderWidth: 1,
                borderColor: Colors.zaloGrayText
              }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user?.name || username}</Text>
          </Animated.View>
          <TouchableOpacity onPress={onPressAdvance}>
            <Icon type={Icons.MaterialCommunityIcons} name="dots-horizontal" size={26} color="#ffffff" />
          </TouchableOpacity>
        </Animated.View>
        <ImageBackground source={{ uri: IMAGE_NAV_1 }} style={[styles.imageNav]} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          onScroll={event => {
            console.log(event.nativeEvent.contentOffset.y);
          }}
          style={[
            {
              paddingTop: HEIGH_SPACE_PADDING,
              zIndex: 2
            }
          ]}
        >
          <View style={[styles.container, { zIndex: 4 }]}>
            <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
              <Image
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  borderWidth: 5,
                  borderColor: '#FFFFFF'
                }}
                source={{ uri: user?.avatar?.link || avatar || IMAGE_NAV_2 }}
              />
              {/* <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: width / 2 - 55,
                  zIndex: 3,
                  elevation: 3,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: Colors.zaloUnderlineColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon name="camera" type={Icons.EvilIcon} size={20} color="#000000" />
              </View> */}
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user?.name || username}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.zaloGrayText }}>
                {user?.description || description}
              </Text>
            </View>
          </View>
          <View />
        </ScrollView>
      </View>
    </>
  );
}

const PostView = ({ post, createdDate }) => {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    height: HEIGH_NAV,
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  imageNav: {
    width: '100%',
    position: 'absolute',
    height: HEIGH_SPACE_PADDING + HEIGH_SB + HEIGH_NAV,
    resizeMode: 'contain',
    top: 0,
    left: 0,
    right: 0
  }
});
