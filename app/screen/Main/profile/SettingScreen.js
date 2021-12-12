import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Pressable,
  StatusBar
} from 'react-native';
import Icon, { Icons } from '../../../common/component/Icons';
import Popup from '../../../components/Popup';
import RowSetting from '../../../components/RowSetting';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import { SETTING_ONE, SETTING_THREE, SETTING_TWO } from '../../../data/settings';

const SPACING = 16;
const HEIGH_BAR = 50;

const SettingScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      presentation: 'modal'
    });
  }, []);

  const onClickNavigateBack = () => {
    navigation.goBack();
  };

  const onPressLogout = () => {
    setOpen(true);
  };

  const onPressCloseLogout = () => {
    setOpen(false);
  };

  const onPressRow = useCallback(key => {
    if (key === 'LOGOUT') {
      onPressLogout();
    }
  }, []);

  const onActionLogout = () => {
    // console.log('ACTION');
    onPressCloseLogout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={onClickNavigateBack}>
          <Icon type={Icons.Feather} name="arrow-left" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', flexGrow: 1, marginLeft: SPACING }}>
          Cài đặt
        </Text>
      </View>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false} alwaysBounceVertical>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          {SETTING_ONE.map((item, index) => (
            <TouchableWithoutFeedback key={index}>
              <RowSetting item={item} borderBottom={index !== SETTING_ONE.length - 1} />
            </TouchableWithoutFeedback>
          ))}
        </View>

        <View style={{ backgroundColor: '#FFFFFF', marginTop: SPACING }}>
          {SETTING_TWO.map((item, index) => (
            <TouchableWithoutFeedback key={index}>
              <RowSetting item={item} borderBottom={index !== SETTING_TWO.length - 1} />
            </TouchableWithoutFeedback>
          ))}
        </View>

        <View style={{ backgroundColor: '#FFFFFF', marginTop: SPACING }}>
          {SETTING_THREE.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => onPressRow(item.key)}>
              <RowSetting item={item} borderBottom={index !== SETTING_THREE.length - 1} />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
      <Popup open={open} showPopup={onPressLogout} closePopup={onPressCloseLogout}>
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={{ fontSize: 14, color: '#000000' }}>Bạn có muốn đăng xuất tài khoản này</Text>
          </View>
          <View style={styles.popupAction}>
            <Pressable onPress={onPressCloseLogout}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR_ZALO.searchBackground }}>Không</Text>
            </Pressable>
            <Pressable onPress={onActionLogout}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000', marginLeft: SPACING }}>Có</Text>
            </Pressable>
          </View>
        </View>
      </Popup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: COLOR_ZALO.searchBackground,
    height: HEIGH_BAR,
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SPACING
  },
  popupContainer: {
    width: 300,
    height: 92,
    backgroundColor: '#FFFFFF',

    paddingVertical: SPACING / 2,
    paddingHorizontal: SPACING,
    borderRadius: 5
  },
  popupContent: {
    paddingVertical: 16
  },
  popupAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default SettingScreen;
