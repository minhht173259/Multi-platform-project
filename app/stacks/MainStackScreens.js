/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MessagesScreen from '../screen/Main/MessagesScreen';
import PhoneBookScreen from '../screen/Main/PhoneBookScreen';
import PostScreen from '../screen/Main/PostScreen';
import MoreInformationScreen from '../screen/Main/MoreInformationScreen';
import Icon, { Icons } from '../common/component/Icons';
import { COLOR_ZALO } from '../constant/ColorCommon';

const TabArr = [
  {
    route: 'Message',
    label: 'Tin nhắn',
    type: Icons.Feather,
    icon: 'message-circle',
    component: MessagesScreen
  },
  {
    route: 'PhoneBook',
    label: 'Danh bạ',
    type: Icons.Feather,
    icon: 'phone',
    component: PhoneBookScreen
  },
  {
    route: 'Group',
    label: 'Nhóm',
    type: Icons.Feather,
    icon: 'users',
    component: PostScreen
  },
  {
    route: 'PostStack',
    label: 'Nhật ký',
    type: Icons.Feather,
    icon: 'clock',
    component: PostScreen
  },
  {
    route: 'More',
    label: 'Thêm',
    type: Icons.Feather,
    icon: 'grid',
    component: MoreInformationScreen
  }
];

const { width } = Dimensions.get('window');

const SIZE_ITEM = 5;
const HEIGH_TAB = 60;
const WIDTH_TAB = width;
const WIDTH_ITEM_TAB = WIDTH_TAB / SIZE_ITEM;

const MainStack = createBottomTabNavigator();

export default function MainStackScreens() {
  return (
    <MainStack.Navigator
      initialRouteName="Message"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar
      }}
    >
      {TabArr.map((item, index) => (
        <MainStack.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />
          }}
        />
      ))}
    </MainStack.Navigator>
  );
}

const TabButton = function (props) {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(new Animated.Value(0)).current;
  const textRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.timing(viewRef, {
          toValue: WIDTH_ITEM_TAB + 16,
          duration: 200,
          useNativeDriver: false
        }),

        Animated.timing(textRef, {
          toValue: 20,
          duration: 200,
          useNativeDriver: false
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(viewRef, {
          toValue: WIDTH_ITEM_TAB - 4,
          duration: 200,
          useNativeDriver: false
        }),
        Animated.timing(textRef, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Animated.View
        style={[
          styles.container,
          {
            width: viewRef
          }
        ]}
      >
        <Icon type={item.type} name={item.icon} color={focused ? COLOR_ZALO.searchBackground : 'black'} size={26} />
        <Animated.Text
          style={[
            styles.text,
            {
              height: textRef
            }
          ]}
        >
          {' '}
          {item.label}{' '}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: HEIGH_TAB,
    width: WIDTH_TAB,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fafafa'
  },

  container: {
    flexShrink: 1,
    flexGrow: 1,
    height: HEIGH_TAB,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: COLOR_ZALO.searchBackground
  }
});
