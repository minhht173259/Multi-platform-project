import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, Animated, StyleSheet, Image, StatusBar, TouchableHighlight, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Icon, { Icons } from '../../../common/component/Icons';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import Colors from '../../../constant/Colors';
import Popup from '../../../components/Popup';
import MessageContext from '../../../context/message-context/MessageContext';
import { LoadingContext } from '../../../context/LoadingContext';

const DEFAULT_AVT =
  'https://images.unsplash.com/photo-1612422659019-0d1456e66bca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80';

const { width } = Dimensions.get('window');

const OPTIONS = [
  {
    label: 'Tìm',
    label_2: 'tin nhắn',
    icon: Icons.EvilIcon,
    name: 'search'
  },
  {
    label: 'Trang',
    label_2: 'cá nhân',
    icon: Icons.EvilIcon,
    name: 'user'
  },
  {
    label: 'Tắt',
    label_2: 'thông báo',
    icon: Icons.EvilIcon,
    name: 'bell'
  }
];

const MessageOptionScreen = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const { partnerId, partnerAvatar, partnerName, partnerPhone, conversationId } = route.params;
  const [messageState, messageContext] = useContext(MessageContext);
  const { startLoading, endLoading } = useContext(LoadingContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      // headerTransparent: false,
      headerTitle: renderTitle,
      headerTintColor: '#FFFFFF',
      headerStyle: { backgroundColor: COLOR_ZALO.searchBackground }
    });
  }, []);

  const renderTitle = useCallback(
    () => (
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>Tuỳ chọn</Text>
      </View>
    ),
    []
  );

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = useCallback(() => {
    setOpen(false);
  }, []);

  const onDeleteConversation = async () => {
    try {
      startLoading();
      const response = await messageContext.deleteConversation(partnerId, conversationId);
      if (response.code === 1000) {
        Toast.show({
          type: 'success',
          text1: 'Xóa cuộc trò chuyện thành công'
        });
        navigation.navigate('Main', {
          screen: 'Message'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: `${response.code} - ${response.message}`
        });
      }
    } catch (error) {
      //
    }
    setOpen(false);
    endLoading();
  };

  return (
    <View style={[styles.container]}>
      <StatusBar translucent />
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: 16,
            backgroundColor: '#FFFFFF'
          }}
        >
          <Image source={{ uri: partnerAvatar || DEFAULT_AVT }} style={{ width: 80, height: 80, borderRadius: 40 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 16 }}>{partnerName}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
            {OPTIONS.map((item, index) => (
              <View
                key={index}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#f3f4f8',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5
                  }}
                >
                  <Icon name={item.name} type={item.icon} size={28} color="#000000" />
                </View>

                <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '600' }}>
                  {item.label}
                </Text>
                <Text numberOfLines={2}>{item.label_2}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', marginTop: 10 }}>
          <TouchableHighlight underlayColor={Colors.ZaloOverlayColor} onPress={openPopup}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingVertical: 16,
                paddingHorizontal: 16,
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <Icon name="delete-outline" type={Icons.MaterialCommunityIcons} size={24} color={Colors.zaloRed} />
              <Text style={{ marginLeft: 16, color: Colors.zaloRed }}>Xóa lịch sử trò chuyện</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Popup open={open} closePopup={closePopup} backgroundColor={Colors.ZaloOverlayColor}>
        <View style={{ backgroundColor: '#FFFFFF', width: width * 0.9 }}>
          <Text
            style={{
              padding: 16,
              fontSize: 18,
              fontWeight: 'bold',
              borderBottomWidth: 1,
              borderBottomColor: Colors.zaloUnderlineColor
            }}
          >
            Xóa trò chuyện này
          </Text>
          {/* <View style={{ marginVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.zaloUnderlineColor }} /> */}
          <Text
            style={{
              padding: 16,
              fontSize: 14
            }}
          >
            Bạn sẽ không thể xem lại nội dung của cuộc trò chuyện này
          </Text>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingBottom: 16,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <TouchableHighlight
              style={{ width: 50, height: 30, alignItems: 'center', justifyContent: 'center', marginRight: 30 }}
              onPress={closePopup}
              underlayColor={Colors.ZaloOverlayColor}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                Hủy
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ width: 40, height: 30, alignItems: 'center', justifyContent: 'center' }}
              underlayColor={Colors.ZaloOverlayColor}
              onPress={onDeleteConversation}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: Colors.zaloRed
                }}
              >
                Xóa
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Popup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zaloBackgroundColor
  }
});

export default MessageOptionScreen;
