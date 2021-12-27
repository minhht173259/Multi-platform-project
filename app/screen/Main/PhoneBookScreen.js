/* eslint-disable react/display-name */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import SearchZalo from '../../components/SearchZalo';
import Icon, { Icons } from '../../common/component/Icons';
import { COLOR_ZALO } from '../../constant/ColorCommon';
import Colors from '../../constant/Colors';
import UserContext from '../../context/user-context/UserContext';
import LoadingFetch from '../../components/LoadingFetch';

const WIDTH_ITEM = Dimensions.get('window').width;
const HEIGHT_ITEM = Dimensions.get('window').height;

const DEFAULT_AVT =
  'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

const TABS = [
  {
    key: 1,
    title: 'Danh bạ',
    ref: React.createRef()
  },
  { key: 2, title: 'Official Account', ref: React.createRef() },
  { key: 3, title: 'Nhóm', ref: React.createRef() }
];

const IMG_FRIEND = require('../../assets/images/friend_request.png');
const IMG_PHONE = require('../../assets/images/phone.png');

export default function PhoneBookScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const [userState, userContext] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const ref = useRef();
  const onTabPress = useCallback(itemIndex => {
    ref?.current?.scrollTo({
      x: itemIndex * WIDTH_ITEM
    });
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        await userContext.getFriends(10);
      } catch (error) {
        // error
      }
    };
    getFriends();
  }, []);

  const onPressRow = useCallback(item => {
    navigation.push('MessageDetail', {
      partnerId: item.id,
      partnerName: item.name,
      partnerPhone: item.phonenumber,
      partnerAvatar: item.avatarLink
    });
  }, []);

  const renderOfficialAccount = () => (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 16, width: '80%', textAlign: 'center' }}>
        Tìm thêm Official Account để nhận thông tin mới nhất mà bạn quan tâm
      </Text>
      <TouchableHighlight
        style={{
          width: 150,
          paddingVertical: 8,
          backgroundColor: Colors.zaloBlue,
          borderRadius: 75,
          marginTop: 20
        }}
      >
        <Text
          style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, textTransform: 'uppercase', color: '#FFFFFF' }}
        >
          Bắt đầu
        </Text>
      </TouchableHighlight>
    </View>
  );

  const renderPhoneBook = () => (
    <Animated.ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={10}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } }
          }
        ],
        {
          useNativeDriver: false
        }
      )}
    >
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <Image source={IMG_FRIEND} style={{ width: 50, height: 50, resizeMode: 'cover', marginRight: 20 }} />
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Lời mời kết bạn</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <Image source={IMG_PHONE} style={{ width: 50, height: 50, resizeMode: 'cover', marginRight: 20 }} />
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Bạn từ danh bạ máy</Text>
        </View>
      </View>
      <View style={{ marginTop: 16, backgroundColor: '#FFFFFF', flex: 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginLeft: 16,
            paddingRight: 16,
            paddingVertical: 8,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: Colors.zaloUnderlineColor
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '700' }}>Tất cả danh bạ</Text>
          <Text style={{ fontSize: 14, fontWeight: '700', textTransform: 'uppercase', color: Colors.zaloBlue }}>
            Cập nhật
          </Text>
        </View>
        <View style={{ flexGrow: 1 }}>
          {loading && <LoadingFetch />}
          {userState.friends.map((item, index) => (
            <RowFriend friend={item} key={index} onPressRow={onPressRow} />
          ))}
        </View>
      </View>
    </Animated.ScrollView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingBottom: 60 }}>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <SearchZalo>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          >
            <Icon type={Icons.Ionicons} name="md-person-add-outline" color="#ffffff" />
          </TouchableHighlight>
        </View>
      </SearchZalo>
      <Tabs scrollX={scrollX} onTabPress={onTabPress} data={TABS} />
      <Animated.ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } }
            }
          ],
          {
            useNativeDriver: false
          }
        )}
      >
        <View style={{ width: WIDTH_ITEM, backgroundColor: Colors.zaloBackgroundColor }}>{renderPhoneBook()}</View>
        <View style={{ width: WIDTH_ITEM, height: HEIGHT_ITEM }}>{renderOfficialAccount()}</View>
        <View style={{ width: WIDTH_ITEM, height: HEIGHT_ITEM }}>
          <Text>Nhóm</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const RowFriend = ({ friend, onPressRow }) => {
  const name = friend.name ? friend.name : friend.phonenumber;

  return (
    <TouchableHighlight underlayColor={Colors.ZaloOverlayColor} onPress={() => onPressRow(friend)}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 8,
          alignItems: 'center'
        }}
      >
        <Image
          source={{
            uri: friend?.avatarLink || DEFAULT_AVT
          }}
          style={styles.userImage}
        />
        <Text style={{ flexGrow: 1, fontSize: 18, fontWeight: '600' }}>{name}</Text>
        <Icon
          name="md-call-outline"
          type={Icons.Ionicons}
          size={24}
          color={Colors.zaloGrayText}
          style={{ marginRight: 16 }}
        />
        <Icon name="md-videocam-outline" type={Icons.Ionicons} size={24} color={Colors.zaloGrayText} />
      </View>
    </TouchableHighlight>
  );
};

export const Tabs = ({ data, scrollX, onTabPress, scrollY, top, position }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();
  useEffect(() => {
    const m = [];
    data.forEach(item => {
      item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
        m.push({
          x,
          y,
          width,
          height
        });
        if (m.length === data.length) {
          setMeasures(m);
        }
      });
    });
  }, []);

  return (
    <View
      style={{
        // position: position || 'absolute',
        // top: top || 50,
        width: WIDTH_ITEM,
        borderBottomColor: Colors.zaloUnderlineColor,
        borderBottomWidth: 1,
        height: 50,
        zIndex: 2,
        backgroundColor: '#FFFFFF'
        // transform: [{ translateY: -50 }]
      }}
    >
      <View
        style={{ flex: 1, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}
        ref={containerRef}
      >
        {data.map((item, index) => (
          <Tab key={item.key} item={item} ref={item.ref} onTabPress={() => onTabPress(index)} />
        ))}
      </View>
      {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
    </View>
  );
};

export const Tab = React.forwardRef(({ item, onTabPress }, ref) => (
  <TouchableHighlight
    onPress={onTabPress}
    style={{ height: '100%', justifyContent: 'center', paddingHorizontal: 16 }}
    underlayColor={Colors.ZaloOverlayColor}
  >
    <View ref={ref}>
      <Text style={{ fontSize: 14, fontWeight: '600', textTransform: 'uppercase', textAlign: 'center' }}>
        {item.title}
      </Text>
    </View>
  </TouchableHighlight>
));

export const Indicator = ({ measures, scrollX }) => {
  const inputRange = TABS.map((_, i) => i * WIDTH_ITEM);
  const indicatorWith = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width)
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x)
  });
  return (
    <Animated.View
      style={{
        height: 1,
        width: indicatorWith,
        position: 'absolute',
        backgroundColor: '#000000',
        bottom: 0,
        transform: [
          {
            translateX
          }
        ]
      }}
    />
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
  }
});
