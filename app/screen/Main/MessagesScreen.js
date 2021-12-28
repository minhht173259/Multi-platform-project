import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Text,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import SearchZalo from '../../components/SearchZalo';
import Icon, { Icons } from '../../common/component/Icons';
import { COLOR_ZALO } from '../../constant/ColorCommon';
import MessageRow from '../../components/MessageRow';
import MessageContext from '../../context/message-context/MessageContext';
import LoadingFetch from '../../components/LoadingFetch';
import Colors from '../../constant/Colors';
import UserContext from '../../context/user-context/UserContext';
import { LoadingContext } from '../../context/LoadingContext';

const DEFAULT_AVT =
  'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

export default function MessagesScreen({ navigation }) {
  const [messageState, messageContext] = useContext(MessageContext);
  const [userState, userContext] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { startLoading, endLoading } = useContext(LoadingContext);

  const [refreshControl, setRefreshControl] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await messageContext.getConversations(10);
        await userContext.getSuggestFriends(10);
        await userContext.getRequestFriends(10);

        if (response.code !== 1000) {
          // do something error
        }
        setLoading(false);
      } catch (error) {
        console.log('ERR MESS: ', error);
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  const onPressRow = useCallback(item => {
    navigation.push('MessageDetail', {
      partnerId: item.partner.id,
      partnerAvatar: item.partner.avatar || null,
      partnerName: item.partner.username,
      partnerPhone: item.partner?.phonenumber
    });
  }, []);

  const onLongPressRow = useCallback(item => {
    console.log('LONG PRESS');
  }, []);

  const handleAcceptFriend = async (userId, isAccept) => {
    startLoading();
    try {
      const response = await userContext.setAcceptFriend(userId, isAccept);
      if (response.code === 1000) {
        Toast.show({
          type: 'success',
          text1: 'Kết bạn thành công.'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Kiểm tra lại mạng.'
        });
      }
    } catch (error) {
      //
    }
    endLoading();
  };

  const handleClearSuggestFriend = userId => {
    startLoading();
    try {
      userContext.delSuggestFriend(userId);
    } catch (error) {
      //
    }
    endLoading();
  };
  const handleRequestFriend = async userId => {
    startLoading();
    try {
      const response = await userContext.setRequestFriend(userId);
      if (response.code === 1000) {
        //
      }
    } catch (error) {
      //
    }
    endLoading();
  };

  const handleRefresh = async () => {
    setRefreshControl(true);
    try {
      const response = await messageContext.getConversations(10);
      await userContext.getSuggestFriends(10);
      await userContext.getRequestFriends(10);

      if (response.code !== 1000) {
        // do something error
      }
      setLoading(false);
    } catch (error) {
      console.log('ERR MESS: ', error);
      setLoading(false);
    }
    setRefreshControl(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <SearchZalo>
        <View>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          >
            <Icon type={Icons.Ionicons} name="add" size={28} color="#ffffff" />
          </TouchableHighlight>
        </View>
      </SearchZalo>
      {loading ? (
        <LoadingFetch />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={() => {
                handleRefresh();
              }}
            />
          }
        >
          {/* todo */}
          <View style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {messageState.conversations.map((row, index) => (
              <MessageRow
                key={index}
                isGroup={false}
                item={row}
                onPresRow={onPressRow}
                onLongPressRow={onLongPressRow}
              />
            ))}
          </View>
          <View style={{ backgroundColor: '#FFFFFF', marginTop: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 4, marginHorizontal: 16 }}>
              Gợi ý kết bạn
            </Text>
            {userState.suggestFriends.map((item, index) => (
              <SuggestFriendRow
                friend={item}
                key={index}
                requestFriend={handleRequestFriend}
                deleteRequestFriend={handleClearSuggestFriend}
              />
            ))}
            {userState.requestFriends.length > 0 && (
              <TouchableHighlight
                style={{ width: '100%', paddingHorizontal: 16, paddingVertical: 16 }}
                underlayColor={Colors.ZaloOverlayColor}
                onPress={() => {}}
              >
                <Text style={{ color: Colors.zaloBlue }}>Xem thêm</Text>
              </TouchableHighlight>
            )}
          </View>
          <View
            style={{
              paddingVertical: 16,
              width: '100%',
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopColor: Colors.zaloUnderlineColor,
              borderTopWidth: 1
            }}
          >
            <Text style={{ color: '#858d92' }}>Dễ dàng tìm kiếm và trò chuyện với bạn bè</Text>
            <TouchableHighlight
              style={{
                height: 40,
                marginTop: 16,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLOR_ZALO.searchBackground,
                paddingHorizontal: 30,
                borderRadius: 20
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Tìm thêm bạn</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const SuggestFriendRow = ({ friend, requestFriend, deleteRequestFriend, ...restProps }) => {
  const name = friend.username ? friend.username : friend.phonenumber;
  const suggestText =
    friend.same_friends !== 0 && friend.same_friends ? `Có ${friend.same_friends} bạn chung` : 'Có thể bạn sẽ quen';

  return (
    <TouchableHighlight
      underlayColor={Colors.ZaloOverlayColor}
      // onPress={() => onPresRow(item)}
      // onLongPress={() => onLongPressRow(item)}
    >
      <View style={styles.messRowContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: friend.avatar?.link ? friend.avatar.link : DEFAULT_AVT
          }}
        />
        <View style={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{name}</Text>
          {friend.description && <Text style={{ color: Colors.zaloGrayText }}>{friend.description}</Text>}
          <Text style={{ color: Colors.zaloGrayText }} numberOfLines={1} ellipsizeMode="tail">
            {suggestText}
          </Text>
        </View>
        <TouchableHighlight
          style={{
            paddingVertical: 4,
            width: 80,
            borderRadius: 40,
            backgroundColor: Colors.zaloBlue,
            marginRight: 16
          }}
          onPress={() => requestFriend(friend.id)}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textAlign: 'center',
              textTransform: 'uppercase'
            }}
          >
            Kết bạn
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => deleteRequestFriend(friend.id)}
          underlayColor={Colors.ZaloOverlayColor}
        >
          <Icon name="clear" type={Icons.MaterialIcons} size={20} color={Colors.zaloGrayText} />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zaloBackgroundColor,
    paddingBottom: 60
  },
  suggestAddFriend: {
    marginTop: 20
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
  },
  textName: {
    fontSize: 16,
    fontWeight: '600'
  },
  textTime: {
    fontSize: 14,
    color: '#858d92'
  },
  textLastMess: {
    fontSize: 14,
    color: '#858d92'
  },
  messRowContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomColor: Colors.zaloUnderlineColor,
    borderBottomWidth: 1
  }
});
