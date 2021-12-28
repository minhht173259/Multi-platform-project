/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable
} from 'react-native';
import { io } from 'socket.io-client';
import ParsedText from 'react-native-parsed-text';
import Icon, { Icons } from '../../../common/component/Icons';
import { getTime } from '../../../common/getTime';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import Colors from '../../../constant/Colors';
import AuthenticationContext from '../../../context/auth-context/AuthenticationContext';
import MessageContext from '../../../context/message-context/MessageContext';
import { chatConstant } from '../../../constant/ChatConstant';
import Popup from '../../../components/Popup';
import LoadingFetch from '../../../components/LoadingFetch';
import { LoadingContext } from '../../../context/LoadingContext';

const DEFAULT_AVT =
  'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

const MessageDetailScreen = ({ navigation, route }) => {
  const { partnerId, partnerAvatar, partnerName, partnerPhone } = route.params;
  const [messState, messageContext] = useContext(MessageContext);
  // structor message : {senderId, receiverId, messagesId, content, created}
  const [messages, setMessages] = useState([]);

  const [receiverName, setReceiverName] = useState(partnerName);
  const [receiverAvatar, setReceiverAvatar] = useState(partnerAvatar);

  const { startLoading, endLoading } = useContext(LoadingContext);

  const [authState, _] = useContext(AuthenticationContext);
  // const { socket } = useSocketIo();
  const socketIO = useRef();

  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);
  const [indexPage, setIndexPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

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

  useEffect(() => {
    const initMess = async () => {
      await getConversation(0, 20);
    };
    initMess();
    return () => {
      setMessages([]);
    };
  }, []);

  useEffect(() => {
    const dataJoin = {
      sender: {
        id: authState.id
      },
      receiver: {
        id: partnerId
      }
    };

    const url = 'https://chat-zalo-group15.herokuapp.com';
    const { token } = authState;
    const socket = io(url, {
      auth: { token }
    });
    socketIO.current = socket;

    socketIO.current.emit(chatConstant.JOIN_CHAT, dataJoin);

    socketIO.current.on(chatConstant.ON_MESSAGE, data => {
      handleListenSocket(data);
    });
    return () => {
      socketIO.current.disconnect();
    };
  }, []);

  const handleListenSocket = data => {
    const { sender, receiver } = data;
    const newMessage = {
      senderId: sender.id,
      receiverId: receiver.id,
      messageId: data.message_id,
      message: data.content,
      created: data.created
    };

    setMessages(prev => [newMessage, ...prev]);
  };

  const getConversation = async (indexCurrent, count) => {
    try {
      setLoading(true);
      const response = await messageContext.getConversation(partnerId, indexCurrent, count);
      if (response.code === 1000) {
        const conversations = response.data.conversation || [];
        const newMessages = conversations.map(conversation => ({
          senderId: conversation.from_id,
          receiverId: conversation.to_id,
          messageId: conversation.message_id,
          message: conversation.message,
          created: conversation.created_at
        }));
        setIndexPage(indexCurrent);
        setMessages(newMessages);
      }
    } catch (error) {
      //
      console.log('ERROR: ', error);
    }
    setLoading(false);
  };

  const getMore = async () => {
    if (!loadingMore) {
      // try {
      //   setLoadingMore(prev => true);
      //   const response = await messageContext.getConversation(partnerId, indexPage + 1, 1);
      //   if (response.code === 1000) {
      //     const conversations = response.data.conversation || [];
      //     const newMessages = conversations.map(conversation => ({
      //       senderId: conversation.from_id,
      //       receiverId: conversation.to_id,
      //       messageId: conversation.message_id,
      //       message: conversation.message,
      //       created: conversation.created_at
      //     }));
      //     console.log('NEW LOAD MORE : ', newMessages);
      //     setIndexPage(prev => prev + 1);
      //     // setMessages(prev => [...prev, ...newMessages]);
      //   }
      // } catch (error) {
      //   //
      //   console.log('ERROR: ', error);
      // }
    }

    setLoadingMore(prev => false);
  };

  const renderTitle = useCallback(
    () => (
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{receiverName}</Text>
      </View>
    ),
    [receiverName]
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

  const handleChangeText = text => {
    setInputValue(text);
  };

  const onSendMessage = () => {
    try {
      const dataSend = {
        sender: {
          id: authState.id
        },
        receiver: {
          id: partnerId
        },
        content: inputValue
      };
      socketIO.current.emit(chatConstant.SEND, dataSend);
      setInputValue(null);
    } catch (error) {
      console.log('ERROR SEND MESS: ', error);
    }
  };

  const onDeleteMessage = useCallback(async message => {
    const dataDelete = {
      sender: {
        id: authState.id
      },
      receiver: {
        id: partnerId
      },
      message_id: message.messageId,
      content: null
    };
    try {
      startLoading();
      const response = await messageContext.deleteMessage(message.messageId);
      if (response.code === 1000) {
        setMessages(prev => [...prev].filter(mess => mess.messageId !== message.messageId));
      }
    } catch (error) {
      //
      console.log('error: ', error);
    }
    endLoading();
    socketIO.current.emit(chatConstant.DELETE_MESSAGE, dataDelete);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.zaloBackgroundColor }}>
      {loading ? (
        <LoadingFetch />
      ) : (
        <>
          <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({ item, index }) => (
              <Message onDeleteMess={onDeleteMessage} item={item} key={index} receiverAvatar={receiverAvatar} />
            )}
            keyExtractor={item => `${item.messageId}`}
            inverted
            onEndReachedThreshold={0.5}
            onEndReached={getMore}
            ListFooterComponent={() =>
              loadingMore && (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="small" color={COLOR_ZALO.searchBackground} />
                </View>
              )
            }
          />
          {(messages.length === 0 || !messages) && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Hãy bắt đầu trò chuyện</Text>
            </View>
          )}
        </>
      )}

      <View style={styles.footerContainer}>
        <Icon type={Icons.Feather} name="smile" size={30} color="#6c6c6c" />
        <TextInput
          placeholder="Nhập bình luận"
          autoCapitalize="none"
          dataDetectorTypes="all"
          keyboardType="default"
          style={[styles.inputComment]}
          value={inputValue}
          onChangeText={handleChangeText}
        />
        <Icon type={Icons.Ionicons} name="md-image-outline" size={30} color="#6c6c6c" />
        <TouchableOpacity onPress={onSendMessage}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="send-circle"
            size={34}
            style={{ marginLeft: 16 }}
            color={inputValue ? Colors.zaloBlue : '#bed4e1'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Message = ({ item, onDeleteMess, receiverAvatar }) => {
  const { senderId, message, created, messageId } = item;
  const [authState] = useContext(AuthenticationContext);

  const [open, setOpen] = useState(false);

  const isUser = senderId === authState.id;
  const ref = useRef();

  const handleLongPress = () => {
    if (isUser) {
      setOpen(true);
    }
  };

  const handleUrlPress = (url, matchIndex) => {
    Linking.openURL(url);
  };

  const handlePhonePress = (phone, matchIndex) => {};

  const onDelete = () => {
    if (onDeleteMess) {
      onDeleteMess(item);
    }
    setOpen(false);
  };

  return (
    <Pressable onLongPress={handleLongPress}>
      <View
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: isUser ? 'row-reverse' : 'row',
          width: '100%',
          marginHorizontal: 8,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        {!isUser && (
          <Image
            source={{ uri: receiverAvatar || DEFAULT_AVT }}
            style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#FFFFFF' }}
          />
        )}
        <View
          style={{
            marginHorizontal: 8,
            marginVertical: 8,
            padding: 8,
            backgroundColor: isUser ? '#d5f1ff' : '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: 10
          }}
        >
          <ParsedText
            style={{ fontSize: 14 }}
            parse={[
              { type: 'url', style: styles.url, onPress: handleUrlPress },
              { type: 'phone', style: styles.phone, onPress: handlePhonePress }
            ]}
            childrenProps={{ allowFontScaling: false }}
          >
            {message}
          </ParsedText>
          <Text style={{ fontSize: 10, alignSelf: 'flex-start', color: Colors.zaloGrayText, marginTop: 4 }}>
            {getTime(created)}
          </Text>
        </View>
        <Popup open={open} closePopup={() => setOpen(false)}>
          <View style={{ backgroundColor: '#FFFFFF' }}>
            <Text style={{ fontSize: 16, padding: 16 }}>Bạn có muốn xóa tin nhắn này ?</Text>
            <Pressable onPress={onDelete} style={{ alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 4 }}>
              <Text style={{ color: Colors.zaloRed }}>Có</Text>
            </Pressable>
          </View>
        </Popup>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#efefef'
  },
  inputComment: {
    flexGrow: 1,
    marginLeft: 16,

    fontSize: 16
  },
  scrollViewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  url: {
    color: Colors.zaloBlue,
    textDecorationLine: 'underline'
  }
});

export default React.memo(MessageDetailScreen);
