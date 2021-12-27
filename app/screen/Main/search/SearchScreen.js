import React, { useEffect, useState, useRef, useCallback, useContext, useMemo } from 'react';
import {
  View,
  Animated,
  Dimensions,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import { Tabs } from '../PhoneBookScreen';
import Colors from '../../../constant/Colors';
import Icon, { Icons } from '../../../common/component/Icons';
import UserContext from '../../../context/user-context/UserContext';
import LoadingFetch from '../../../components/LoadingFetch';

const DEFAULT_AVT =
  'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
const WIDTH_ITEM = Dimensions.get('window').width;
const HEIGHT_ITEM = Dimensions.get('window').height;
const TABS_SEARCH = [
  {
    key: 1,
    title: 'Tất cả',
    ref: React.createRef()
  },
  { key: 2, title: 'Bạn bè', ref: React.createRef() },
  { key: 3, title: 'Tin nhắn', ref: React.createRef() }
];

const SearchScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const onTabPress = useCallback(itemIndex => {
    ref?.current?.scrollTo({
      x: itemIndex * WIDTH_ITEM
    });
  }, []);
  const refInput = useRef();

  const [userState, userContext] = useContext(UserContext);
  const [search, setSearch] = useState();
  const [savedSearch, setSavedSearch] = useState([]);
  const [usersResponse, setUsersResponse] = useState([]);
  const [messagesResponse, setMessagesResponse] = useState([]);
  const [totalMess, setTotalMess] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [loadingFetch, setLoadingFetch] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      statusBarStyle: {
        backgroundColor: COLOR_ZALO.searchBackground
      }
    });
    refInput.current.focus();
    return () => {
      console.log('SEARCH UNMOUNT');
    };
  }, []);

  const searchDebounce = useCallback(
    _.debounce(value => fetchSearch(value), 1000),
    []
  );

  const fetchSearch = async value => {
    setLoadingFetch(true);
    try {
      const response = await userContext.search(value);
      if (response.code === 1000) {
        console.log('RESULT: ', response);
        // setSearchResults(response);
        setTotalMess(response.data.total_mess);
        setTotalUser(response.data.total_user);
        setUsersResponse(response.data.user);
        setMessagesResponse(response.data.message);
      }
    } catch (error) {
      //
    }
    setLoadingFetch(false);
  };

  useEffect(() => {
    const getSavedSearch = async () => {
      try {
        const response = await userContext.getSavedSearch(0, 5);
        if (response.code === 1000) {
          setSavedSearch(response.data);
        }
      } catch (error) {
        //
      }
    };
    getSavedSearch();
  }, []);

  const handleSearch = text => {
    setSearch(text);
    searchDebounce(text);
  };

  const clearSearch = () => {
    setSearch(null);
  };

  const handlePressSaved = useCallback(text => {
    handleSearch(text);
  }, []);

  const handleClearSavedSearch = useCallback(
    async id => {
      const newSaved = [...savedSearch].filter(item => item.id !== id);
      setSavedSearch(newSaved);

      // try {
      //   await userContext.delSavedSearch(id, false);
      // } catch (error) {
      //   //
      // }
    },
    [savedSearch]
  );

  const onPressUserRow = useCallback(user => {
    navigation.navigate('UserProfile', {
      screen: 'Profile',
      params: {
        username: user.name,
        avatar: user.avatar?.link,
        phonenumber: user.phonenumber,
        userId: user.id,
        description: user.description
      }
    });
  }, []);

  const renderNavigation = () => (
    <View
      style={[
        styles.navTitleContainer,
        { backgroundColor: COLOR_ZALO.searchBackground, height: 50, paddingHorizontal: 16 }
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" type={Icons.AntDesign} size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={[styles.navTitle, { marginHorizontal: 16, backgroundColor: '#FFFFFF', borderRadius: 5 }]}>
        <Icon name="search" type={Icons.EvilIcon} size={20} color={Colors.zaloGrayText} />
        <TextInput
          placeholder="Tìm bạn bè, tin nhắn, ..."
          autoCapitalize="none"
          dataDetectorTypes="all"
          keyboardType="default"
          //   maxLength={max}
          ref={refInput}
          style={[
            {
              fontSize: 14,
              paddingRight: 30,
              width: WIDTH_ITEM - 130
            }
          ]}
          onFocus={() => {
            // setFocus(true);
          }}
          onBlur={() => {
            // setFocus(false);
          }}
          value={search}
          onChangeText={handleSearch}
        />
        {!!search && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1000,
              right: 5
            }}
          >
            <TouchableWithoutFeedback
              onPress={clearSearch}
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: Colors.zaloGrayText,

                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon name="clear" type={Icons.MaterialIcons} size={14} color="#FFFFFF" />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>

      <View>
        <Icon name="qrcode" type={Icons.AntDesign} size={24} color="#FFFFFF" />
      </View>
    </View>
  );

  const tabs = useMemo(
    () => [
      {
        key: 1,
        title: 'Tất cả',
        ref: React.createRef()
      },
      { key: 2, title: `Bạn bè ${totalUser !== 0 ? `(${totalUser})` : ''}`, ref: React.createRef() },
      { key: 3, title: `Tin nhắn ${totalMess !== 0 ? `(${totalMess})` : ''}`, ref: React.createRef() }
    ],
    [totalMess, totalUser]
  );

  return (
    <View style={styles.container}>
      {renderNavigation()}
      {!search ? (
        <View style={styles.nonSearchContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
              alignItems: 'flex-start'
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tìm kiếm gần đây</Text>
            <Text style={{ fontWeight: 'bold', color: Colors.zaloBlue, textTransform: 'uppercase' }}>Sửa</Text>
          </View>
          <View>
            {savedSearch.map((item, index) => (
              <SavedSearchRow
                searchValue={item}
                key={index}
                onPress={handlePressSaved}
                clearSavedSearch={handleClearSavedSearch}
              />
            ))}
          </View>
          {(!savedSearch || savedSearch.length === 0) && (
            <Text style={{ width: WIDTH_ITEM, height: 100, textAlign: 'center' }}>Không có lịch sử tìm kiếm</Text>
          )}
        </View>
      ) : (
        <>
          <Tabs scrollX={scrollX} onTabPress={onTabPress} data={tabs} />
          {loadingFetch ? (
            <LoadingFetch />
          ) : (
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
              <View style={{ width: WIDTH_ITEM, backgroundColor: Colors.zaloBackgroundColor }}>
                <AllSearchComponent
                  users={usersResponse}
                  messages={messagesResponse}
                  totalMess={totalMess}
                  totalUser={totalUser}
                  onWatchMore={onTabPress}
                />
              </View>
              <View style={{ width: WIDTH_ITEM }}>
                <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                  <View style={{ backgroundColor: '#FFFFFF' }}>
                    <Text
                      style={{ marginHorizontal: 16, fontWeight: 'bold', marginVertical: 4 }}
                    >{`Bạn bè (${totalUser})`}</Text>
                    <View>
                      {usersResponse?.length > 0 &&
                        usersResponse.map((user, index) => (
                          <UserRow user={user} key={index} onPress={() => onPressUserRow(user)} />
                        ))}
                    </View>
                    {!usersResponse ||
                      (usersResponse.length === 0 && (
                        <Text
                          style={{
                            width: WIDTH_ITEM,
                            textAlign: 'center'
                          }}
                        >
                          Không tìm thấy
                        </Text>
                      ))}
                  </View>
                </ScrollView>
              </View>
              <View style={{ width: WIDTH_ITEM }}>
                <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                  <View style={{ backgroundColor: '#FFFFFF' }}>
                    <Text
                      style={{ marginHorizontal: 16, fontWeight: 'bold', marginVertical: 4 }}
                    >{`Tin nhắn (${totalMess})`}</Text>
                    <View>
                      {messagesResponse?.length > 0 &&
                        messagesResponse.map((message, index) => <MessageRow message={message} key={index} />)}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </Animated.ScrollView>
          )}
        </>
      )}
    </View>
  );
};

const AllSearchComponent = ({ users, messages, totalMess, totalUser, onWatchMore }) => (
  <View>
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <Text style={{ marginHorizontal: 16, fontWeight: 'bold', marginVertical: 4 }}>{`Bạn bè (${totalUser})`}</Text>
      <View>{users?.length > 0 && users.map((user, index) => index < 3 && <UserRow user={user} key={index} />)}</View>
      {totalUser > 3 && (
        <TouchableOpacity onPress={() => onWatchMore(1)}>
          <Text
            style={{
              textTransform: 'capitalize',
              color: Colors.zaloBlue,
              fontSize: 12,
              marginHorizontal: 16,
              marginVertical: 8
            }}
          >
            Xem thêm
          </Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={{ backgroundColor: '#FFFFFF', marginTop: 16 }}>
      <Text style={{ marginHorizontal: 16, fontWeight: 'bold', marginVertical: 4 }}>{`Tin nhắn (${totalMess})`}</Text>
      <View>
        {messages?.length > 0 &&
          messages.map((message, index) => index < 3 && <MessageRow message={message} key={index} />)}
      </View>
      {totalMess > 3 && (
        <TouchableOpacity onPress={() => onWatchMore(2)}>
          <Text
            style={{
              textTransform: 'capitalize',
              color: Colors.zaloBlue,
              fontSize: 12,
              marginHorizontal: 16,
              marginVertical: 8
            }}
          >
            Xem thêm
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const UserRow = ({ user, onPress }) => (
  <TouchableHighlight underlayColor={Colors.ZaloOverlayColor} onPress={onPress}>
    <View
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 8, marginHorizontal: 16 }}
    >
      <Image
        source={{
          uri: user.avatar?.link || DEFAULT_AVT
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25
        }}
      />
      <Text style={{ fontSize: 14, fontWeight: '600', flex: 1, marginHorizontal: 16 }}>{user.name}</Text>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.zaloUnderlineColor
        }}
      >
        <Icon name="phone" type={Icons.FontAwesome} size={18} color={Colors.zaloBlue} />
      </View>
    </View>
  </TouchableHighlight>
);

const MessageRow = ({ message, onPress }) => (
  <TouchableHighlight underlayColor={Colors.ZaloOverlayColor}>
    <View
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 8, marginHorizontal: 16 }}
    >
      <Image
        source={{
          uri: message.sender?.avatar?.link || DEFAULT_AVT
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25
        }}
      />
      <View
        style={{ marginHorizontal: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Text style={{ fontSize: 14, fontWeight: '600' }}>{message.sender.name}</Text>
        <Text style={{ fontSize: 14, fontWeight: '600' }}>{message.message}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

const SavedSearchRow = ({ searchValue, clearSavedSearch, onPress }) => (
  <TouchableHighlight onPress={() => onPress(searchValue.keyword)} underlayColor={Colors.ZaloOverlayColor}>
    <View style={styles.savedSearchRowContainer}>
      <Icon name="search1" type={Icons.AntDesign} size={18} color="#000000" />
      <Text style={{ flex: 1, fontSize: 16, marginHorizontal: 16 }} numberOfLines={1} ellipsizeMode="tail">
        {searchValue.keyword}
      </Text>
      <TouchableHighlight
        style={{ width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}
        underlayColor={Colors.ZaloOverlayColor}
        onPress={() => clearSavedSearch(searchValue.id)}
      >
        <Icon name="clear" type={Icons.MaterialIcons} size={18} color="#000000" />
      </TouchableHighlight>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zaloBackgroundColor
  },
  navTitleContainer: {
    width: WIDTH_ITEM,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 4,
    alignItems: 'center'
  },
  navTitle: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 4,
    alignItems: 'center'
  },
  nonSearchContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  savedSearchRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8
  }
});

export default SearchScreen;
