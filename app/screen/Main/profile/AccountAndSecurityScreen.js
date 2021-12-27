import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import AuthenticationContext from '../../../context/auth-context/AuthenticationContext';
import Popup from '../../../components/Popup';
import { LoadingContext } from '../../../context/LoadingContext';

const SPACING = 16;

const AccountAndSecurityScreen = ({ navigation }) => {
  const [authState, authContext] = useContext(AuthenticationContext);
  const loadingContext = useContext(LoadingContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTransparent: false,
      headerTitleStyle: {
        color: '#FFFFFF',
        fontSize: 18
      },
      headerTintColor: '#FFFFFF',
      headerTitle: 'Tài khoản và bảo mật',
      presentation: 'containedTransparentModal',
      headerStyle: { backgroundColor: COLOR_ZALO.searchBackground }
    });
  }, []);

  const logout = async () => {
    setOpen(false);
    loadingContext.startLoading();
    try {
      await authContext.logout();
      loadingContext.endLoading();
    } catch (error) {
      console.log('ERROR: ', error);
      loadingContext.endLoading();
    }
  };

  const onPressLogout = () => {
    setOpen(true);
  };

  const onPressCloseLogout = () => {
    setOpen(false);
  };

  const DATA = [
    {
      id: 1,
      rootName: 'Tài khoản',
      rows: [
        {
          label: 'Đổi số điện thoại',
          note: authState?.phone,
          onPress: null,
          colorLabel: '#222222'
        },
        {
          label: 'Lịch sử đăng nhập',
          note: null,
          onPress: null,
          colorLabel: '#222222'
        },
        {
          label: 'Đổi số điện thoại',
          note: authState?.phone,
          onPress: 'ChangePassword',
          colorLabel: '#222222'
        }
      ]
    },
    {
      id: 2,
      rootName: 'Bảo mật',
      rows: [
        {
          label: 'Đặt mã khóa Zalo',
          note: null,
          onPress: null,
          colorLabel: '#222222'
        }
      ]
    },
    {
      id: 3,
      rootName: null,
      rows: [
        {
          label: 'Ứng dụng đã cấp quyền',
          note: null,
          onPress: null,
          colorLabel: '#222222'
        }
      ]
    },
    {
      id: 4,
      rootName: null,
      rows: [
        {
          label: 'Chuyển tài khoản',
          note: null,
          onPress: null
        },
        {
          label: 'Đăng xuất',
          note: null,
          onPress: onPressLogout,
          colorLabel: '#222222'
        }
      ]
    },
    {
      id: 5,
      rootName: null,
      rows: [
        {
          label: 'Xóa tài khoản',
          note: null,
          onPress: null,
          colorLabel: '#f15656'
        }
      ]
    }
  ];

  return (
    <>
      <SafeAreaView>
        <View>
          {DATA.map((data, index) => (
            <RowHaveRoot
              key={index}
              rootName={data.rootName}
              rows={data.rows}
              style={{ marginTop: index !== 0 ? SPACING : 0 }}
            />
          ))}
        </View>
      </SafeAreaView>
      <Popup
        open={open}
        showPopup={onPressLogout}
        closePopup={onPressCloseLogout}
        backgroundColor="rgba(52, 52, 52, 0.4)"
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={{ fontSize: 14, color: '#000000' }}>Bạn có muốn đăng xuất tài khoản này</Text>
          </View>
          <View style={styles.popupAction}>
            <Pressable onPress={onPressCloseLogout}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>Không</Text>
            </Pressable>
            <Pressable onPress={logout}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#f15656', marginLeft: SPACING }}>Đăng xuất</Text>
            </Pressable>
          </View>
        </View>
      </Popup>
    </>
  );
};

const RowHaveRoot = ({ rootName, rows = [], style, ...restProps }) => (
  <View
    style={[
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: SPACING,
        backgroundColor: '#FFFFFF'
      },
      style
    ]}
    {...restProps}
  >
    {!!rootName && <Text style={styles.rootName}>{rootName}</Text>}

    {rows.map((row, index) => (
      <RowItem
        onPress={row.onPress}
        key={index}
        label={row?.label}
        note={row?.note}
        colorLabel={row?.colorLabel}
        borderBottom={index !== rows.length - 1}
      />
    ))}
  </View>
);
const RowItem = ({ label, note, borderBottom, onPress, colorLabel = '#222222', ...restProps }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: SPACING,
        borderBottomWidth: 1,
        borderBottomColor: borderBottom ? '#ebebeb' : 'transparent'
      }}
      {...restProps}
    >
      {!!label && <Text style={[styles.label, { color: colorLabel }]}>{label}</Text>}
      {!!note && <Text style={styles.note}>{note}</Text>}
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222'
  },
  note: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#858d93'
  },
  rootName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2078b9',
    paddingTop: SPACING
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

export default AccountAndSecurityScreen;
