import React, { useCallback, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import AuthenticationContext from '../../context/auth-context/AuthenticationContext';
import SearchZalo from '../../components/SearchZalo';
import Icon, { Icons } from '../../common/component/Icons';
import { COLOR_ZALO } from '../../constant/ColorCommon';

const H_BAR = 40;
const SPACING = 16;

export default function MoreInformationScreen({ navigation }) {
  const [authState] = useContext(AuthenticationContext);

  const onClickNavigateSetting = useCallback(() => {
    navigation.navigate('UserProfile', { screen: 'Settings' });
  }, [navigation]);

  const onClickNavigateProfile = useCallback(() => {
    navigation.navigate('UserProfile', {
      screen: 'Profile',
      params: {
        userId: authState.id,
        username: authState.username,
        avatar: authState.avatar
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <SearchZalo>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{
              width: H_BAR,
              height: H_BAR,
              borderRadius: H_BAR / 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon type={Icons.Ionicons} name="qr-code-outline" color="#ffffff" />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: H_BAR,
              height: H_BAR,
              borderRadius: H_BAR / 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            underlayColor={COLOR_ZALO.highlightButton}
            onPress={onClickNavigateSetting}
          >
            <Icon type={Icons.Ionicons} name="ios-settings-outline" color="#ffffff" />
          </TouchableHighlight>
        </View>
      </SearchZalo>
      <ScrollView>
        <View style={styles.accountContainer}>
          <Image
            style={styles.userImage}
            source={{
              uri: authState?.avatar ? authState.avatar : 'https://reactnative.dev/img/tiny_logo.png'
            }}
          />
          <TouchableWithoutFeedback onPress={onClickNavigateProfile}>
            <View style={styles.accountInfo}>
              <Text style={styles.username}>{!authState.username ? 'Chưa đặt tên' : authState.username} </Text>
              <Text style={styles.notes}>Bấm để xem trang cá nhân</Text>
            </View>
          </TouchableWithoutFeedback>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="account-convert-outline"
            size={24}
            color={COLOR_ZALO.iconOutline}
          />
        </View>
        <View style={{ marginTop: SPACING }}>
          <RowItemProfile
            key={1}
            iconName="wallet"
            iconType={Icons.Entypo}
            iconColor="#437ed6"
            contentOne="Ví QR"
            contentTwo="Lưu trữ và xuất trình các mã QR quan trọng"
          />
        </View>
        <View style={{ marginTop: SPACING }}>
          <RowItemProfile
            key={2}
            iconName="cloud-done-outline"
            iconType={Icons.Ionicons}
            iconColor="#27acc9"
            contentOne="Cloud của tôi"
            contentTwo="Lưu trữ các tin nhắn quan trọng"
          />
        </View>
        <View style={{ marginTop: SPACING }}>
          <RowItemProfile
            key={3}
            iconName="security"
            iconType={Icons.MaterialIcons}
            iconColor="#437ed6"
            contentOne="Tài khoản và bảo mật"
            borderBottom
            redirect={() => {
              navigation.navigate('UserProfile', {
                screen: 'AccountAndSecurity'
              });
            }}
          />
          <RowItemProfile
            key={4}
            iconName="lock"
            iconType={Icons.MaterialIcons}
            iconColor="#437ed6"
            contentOne="Quyền riêng tư"
            redirect={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const RowItemProfile = ({
  iconName,
  iconType,
  iconColor,
  contentOne,
  contentTwo,
  redirect = null,
  borderBottom = false,
  ...restProps
}) => (
  <TouchableWithoutFeedback onPress={redirect}>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SPACING,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF'
      }}
      {...restProps}
    >
      {iconName && <Icon name={iconName} size={30} type={iconType} color={iconColor} />}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          alignItems: 'center',
          marginLeft: SPACING,
          paddingVertical: SPACING,
          paddingRight: 20,
          borderBottomWidth: 1,
          borderBottomColor: borderBottom ? '#ebebeb' : '#FFFFFF'
        }}
      >
        <View
          style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '90%' }}
        >
          {contentOne && <Text style={{ fontSize: 18, fontWeight: '600' }}>{contentOne}</Text>}
          {contentTwo && <Text style={styles.notes}>{contentTwo}</Text>}
        </View>
        {redirect && <Icon name="chevron-right" type={Icons.Entypo} color="#757575" size={26} />}
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    paddingVertical: SPACING * 2,
    backgroundColor: '#ffffff'
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  accountInfo: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333'
  },
  notes: {
    color: '#868b8b',
    fontSize: 16
  }
});
