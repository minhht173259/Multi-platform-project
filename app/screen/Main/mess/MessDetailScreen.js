import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableHighlight } from 'react-native';
import Icon, { Icons } from '../../../common/component/Icons';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import Colors from '../../../constant/Colors';

const MessageDetailScreen = ({ navigation, route }) => {
  const { partnerId, partnerAvatar, partnerName, partnerPhone } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // getMessages
    navigation.setOptions({
      // headerShown: true,
      headerTitleAlign: 'left',
      headerTransparent: false,
      headerTitle: renderTitle,
      headerTintColor: '#FFFFFF',
      headerRight: renderRight,
      headerStyle: { backgroundColor: COLOR_ZALO.searchBackground }
    });
  }, []);

  const renderTitle = useCallback(
    () => (
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{partnerName}</Text>
      </View>
    ),
    []
  );

  const renderRight = useCallback(
    () => (
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
        <TouchableHighlight
          style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
          underlayColor={Colors.ZaloOverlayColor}
          onPress={onNavigateOption}
        >
          <Icon name="bars" type={Icons.AntDesign} size={24} color="#FFFFFF" />
        </TouchableHighlight>
      </View>
    ),
    []
  );

  const onNavigateOption = () => {
    navigation.push('MessageOption', {
      partnerId,
      partnerAvatar,
      partnerName,
      partnerPhone
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.zaloBackgroundColor }}>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator
        renderItem={({ item, index }) => (
          <View>
            <Text>Row - {index}</Text>
          </View>
        )}
        data={messages}
        key={(item, index) => `-${item.id}-${index}-`}
      />
    </View>
  );
};

export default React.memo(MessageDetailScreen);
