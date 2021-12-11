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

export default function MoreInformationScreen({ navigation }) {
  const [authState] = useContext(AuthenticationContext);

  const onClickNavigateSetting = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const onClickNavigateProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <SearchZalo>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{ marginRight: 20, width: 30, height: 30, borderRadius: 15 }}
          >
            <Icon type={Icons.Ionicons} name="qr-code-outline" color="#ffffff" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15
            }}
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
              uri: 'https://reactnative.dev/img/tiny_logo.png'
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
      </ScrollView>
    </SafeAreaView>
  );
}

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
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333333'
  },
  notes: {
    color: '#868b8b',
    fontSize: 14
  }
});
