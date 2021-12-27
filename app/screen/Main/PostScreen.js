/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable global-require */
import React, { useCallback, useContext, useEffect, useState, useMemo, useCallBack } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  FlatList,
  Dimensions,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Video } from 'expo-av';
import Toast from 'react-native-toast-message';
import TextStyles from '../../components/Text';
import SearchZalo from '../../components/SearchZalo';
import Icon, { Icons } from '../../common/component/Icons';
import { COLOR_ZALO } from '../../constant/ColorCommon';
import AuthenticationContext from '../../context/auth-context/AuthenticationContext';
import { PostContext } from '../../context/post-context/PostContext';
import Colors from '../../constant/Colors';
import { getTimeAndDate } from '../../common/getTimeAndDate';
import BottomPopup from '../../components/BottomPopup';
import { OPTIONS_KEY, OPTIONS_SHOW, OPTION_POST, OPTION_REPORT, OPTION_REPORT_KEY } from '../../constant/PostConstant';
import Popup from '../../components/Popup';
import AddPostScreen from './post-screen/AddPostScreen';
import { LoadingContext } from '../../context/LoadingContext';

const postOptions = [{ label: 'Đăng hình' }, { label: 'Đăng video' }, { label: 'Hình nền' }];

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1637722873821-3196d8c0f74f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

export default function PostScreen({ navigation }) {
  const [authState, _] = useContext(AuthenticationContext);
  const { startLoading, endLoading } = useContext(LoadingContext);
  const [postState, postContext] = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(postState.posts);

  // const { posts } = postState;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      setPosts(postState.posts);
    });

    return unsubscribe;
  }, [navigation]);

  const [openAdvance, setOpenAdvance] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openReasonReport, setOpenReasonReport] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const [reportPost, setReportPost] = useState({});

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function getPosts() {
      setLoading(true);
      try {
        const postsResponse = await postContext.getListPosts(10);
        if (postsResponse.code === 1000) {
          if (isMounted) {
            setPosts(postState.posts);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error: ', error);
      }
    }
    getPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoadMore = async () => {
    if (hasScroll) {
      try {
        const postsResponse = await postContext.getListPosts(10);
        if (postsResponse.code === 1000) {
          //
          setPosts(postState.posts);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  };

  const onClickWatchDetail = post => {
    navigation.navigate('PostDetail', {
      post
    });
  };

  const onClickZoomInImage = post => {
    navigation.navigate('PostZoomIn', {
      post
    });
  };

  const onPressLike = async id => {
    try {
      await postContext.likePost(id);
    } catch (error) {
      //
    }
  };

  const onPressOpenAdvance = report => {
    setReportPost(report);
    setOpenAdvance(true);
  };

  const onPressOpenReport = () => {
    setOpenReport(true);
  };

  const onPressCloseReport = () => {
    setOpenReport(false);
  };

  const handlePressAdvanceRow = key => {
    if (key === OPTIONS_KEY.DELETE) {
      // delete
      setOpenDeletePost(true);
    }
    if (key === OPTIONS_KEY.EDIT) {
      // edit
    }
    if (key === OPTIONS_KEY.REPORT) {
      // report
      onPressOpenReport();
    }
    setOpenAdvance(false);
  };

  const onPressAdvanceRow = useCallback(key => {
    handlePressAdvanceRow(key);
  }, []);

  const handlePressReportRow = key => {
    switch (key) {
      case OPTION_REPORT_KEY.SPAM: {
        handleReport(key, null);
        break;
      }
      case OPTION_REPORT_KEY.SENSITIVE_CONTENT: {
        handleReport(key, null);

        break;
      }
      case OPTION_REPORT_KEY.CHEAT: {
        handleReport(key, null);

        break;
      }
      case OPTION_REPORT_KEY.OTHER_REASON: {
        setOpenReasonReport(true);
        break;
      }
      default:
        break;
    }

    setOpenReport(false);
  };

  const onPressReportRow = useCallback(key => {
    handlePressReportRow(key);
  }, []);

  const handleReport = async (key, reason) => {
    try {
      const response = await postContext.reportPost(reportPost.id, key, reason);
      if (response.code === 1000) {
        // toasts
        Toast.show({
          type: 'success',
          text1: 'Báo cáo hoạt động thành công'
        });
        console.log('SUCCESS REPORT ', reportPost.id, key, reason);
      }
    } catch (error) {
      console.log('ERROR REPORT: ', error);
    }
  };

  const onSubmitReasonReport = useCallback(
    value => {
      handleReport(OPTION_REPORT_KEY.OTHER_REASON, value);
      setOpenReasonReport(false);
    },
    [reportPost]
  );

  const handleDeletePost = async () => {
    try {
      const response = await postContext.deletePost(reportPost.id);
      if (response.code === 1000) {
        Toast.show({
          type: 'success',
          text1: 'Xóa hoạt động thành công'
        });
        console.log('DELETE POST SUCCESS');
      }
    } catch (error) {
      console.log('ERROR DELETE POST: ', error);
    }
  };

  const onSubmitDeletePost = useCallback(() => {
    handleDeletePost();
    setOpenDeletePost(false);
  }, [reportPost]);

  const handleSubmitCreatePost = async (images, video, described) => {
    // handle 1 image or 1 video
    // console.log('CRATE: ', images, video, described);
    try {
      startLoading();
      const response = await postContext.addPost(described, images, video);
      if (response.code === 1000) {
        Toast.show({
          type: 'success',
          text1: 'Tạo mới hoạt động thành công'
        });
        const postResponse = await postContext.getPost(response.data.id);
        if (postResponse.code === 100) {
          // OK
          // TODO: wrong
          const newPosts = [postResponse.data, ...posts];
          setPosts(newPosts);
        }
      }
    } catch (error) {
      //
      console.log('ERROR, ', error);
    }
    endLoading();
  };

  const onSubmitCreatePost = useCallback((images, video, described) => {
    handleSubmitCreatePost(images, video, described);
  }, []);
  const renderHeaderFlatView = useCallback(
    () => (
      <View style={styles.upload_post_container}>
        <View style={styles.upload_post_search}>
          <Image
            source={{
              uri: authState?.avatar ? authState.avatar : DEFAULT_AVATAR
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              borderRadius: 20,
              marginRight: 20
            }}
          />
          <TouchableHighlight
            underlayColor="red"
            activeOpacity={0.6}
            onPress={() => {
              setOpenCreate(true);
            }}
            style={{
              width: '100%',
              padding: 5
            }}
          >
            <Text style={{ opacity: 0.5, fontSize: 16 }}> Hôm nay bạn thế nào? </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.upload_post_options}>
          {postOptions.map((item, index) => (
            <TouchableHighlight
              underlayColor="#e7e7e7"
              key={index}
              style={{
                borderRightWidth: index === postOptions.length - 1 ? 0 : 1,
                borderRightColor: '#e7e7e7'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10
                }}
              >
                <Image
                  source={require('../../assets/favicon.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    marginRight: 5
                  }}
                />
                <Text> {item.label} </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    ),
    []
  );

  const renderVideo = item => {
    if (!item || !item?.video || !item.video?.link) {
      return;
    }

    return (
      <Video
        source={{ uri: item.video.link }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        style={{ width: '100%', height: 500 }}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    if (item.is_blocked) {
      return <View />;
    }
    return (
      <TouchableWithoutFeedback onPress={() => onClickWatchDetail(item)}>
        <View style={styles.post_element_container} key={index}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('UserProfile', {
                screen: 'Profile',
                params: {
                  userId: item.author.id,
                  username: item.author.name,
                  avatar: item.author.avatar?.link,
                  description: item.author?.description,
                  phonenumber: item.author?.phonenumber
                }
              });
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                paddingBottom: 0
              }}
            >
              <Image
                source={{
                  uri: item.author.avatar?.link ? item.author.avatar.link : DEFAULT_AVATAR
                }}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'cover',
                  marginRight: 20,
                  borderRadius: 50
                }}
              />
              <View style={{ flexGrow: 1 }}>
                <TextStyles heavy size="14px">
                  {item.author.name}
                </TextStyles>
                <TextStyles>{getTimeAndDate(item.created_at)}</TextStyles>
              </View>
              <TouchableHighlight
                style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                underlayColor={Colors.ZaloOverlayColor}
                onPress={() => onPressOpenAdvance(item)}
              >
                <Entypo name="dots-three-horizontal" size={24} color={Colors.zaloGrayText} />
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>

          <Text style={{ fontSize: 16, padding: 16 }}>{item.content}</Text>
          {item?.images && item.images.length > 0 && (
            <TouchableWithoutFeedback onPress={() => onClickZoomInImage(item)}>
              <Image
                source={{
                  uri: item.images[0].link
                }}
                style={{
                  height: 500,
                  width: '100%',
                  resizeMode: 'contain'
                }}
              />
            </TouchableWithoutFeedback>
          )}

          {renderVideo(item)}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 10
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => onPressLike(item.id)}>
                {item.is_liked ? (
                  <Icon type={Icons.AntDesign} name="heart" size={24} color={Colors.zaloRed} />
                ) : (
                  <Icon type={Icons.AntDesign} name="hearto" size={24} color="#606060" />
                )}
              </TouchableOpacity>
              <Text style={{ fontWeight: '600', paddingHorizontal: 8, fontSize: 16 }}>{item.like}</Text>
              <TouchableOpacity onPress={() => onClickWatchDetail(item)}>
                <AntDesign name="message1" size={24} color="black" style={{ marginLeft: 30 }} />
              </TouchableOpacity>
              <Text style={{ fontWeight: '600', paddingHorizontal: 8, fontSize: 16 }}>{item.comment}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <SearchZalo>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{ marginRight: 20, width: 30, height: 30, borderRadius: 15 }}
          >
            <Icon type={Icons.Ionicons} name="images-outline" size={24} color="#ffffff" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          >
            <Icon type={Icons.SimpleLineIcons} name="bell" size={24} color="#ffffff" />
          </TouchableHighlight>
        </View>
      </SearchZalo>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={postState.posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `-${item.id}-${index}`}
        ListHeaderComponent={renderHeaderFlatView}
        initialNumToRender={7}
        ListFooterComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLOR_ZALO.searchBackground} />
          </View>
        )}
        onScroll={() => setHasScroll(true)}
        onEndReached={handleLoadMore}
        onEndThreshold={0}
      />
      <BottomPopup open={openAdvance} closePopup={() => setOpenAdvance(false)}>
        <AdvanceView reportPost={reportPost} userId={authState.id} onPressRow={onPressAdvanceRow} />
      </BottomPopup>
      <Popup open={openReport} closePopup={onPressCloseReport}>
        <ReportView onPressRow={onPressReportRow} />
      </Popup>
      <Popup open={openReasonReport} closePopup={() => setOpenReasonReport(false)}>
        <ReasonReport onSubmit={onSubmitReasonReport} onClose={() => setOpenReasonReport(false)} />
      </Popup>
      <Popup open={openDeletePost} closePopup={() => setOpenReasonReport(false)}>
        <DeletePost onSubmit={onSubmitDeletePost} onCancel={() => setOpenDeletePost(false)} />
      </Popup>
      <Modal visible={openCreate} presentationStyle="overFullScreen">
        <AddPostScreen submit={onSubmitCreatePost} closePopup={() => setOpenCreate(false)} />
      </Modal>
    </View>
  );
}

const DeletePost = ({ onSubmit, onCancel }) => (
  <View style={{ backgroundColor: '#FFFFFF', width: '90%', paddingBottom: 8 }}>
    <Text
      style={{
        padding: 16,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'left',
        borderBottomColor: Colors.zaloUnderlineColor,
        borderBottomWidth: 1
      }}
    >
      Xóa hoạt động này ?
    </Text>
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: 16, marginTop: 8 }}>
      <TouchableHighlight
        style={{ width: 60, height: 40, justifyContent: 'center', alignItems: 'center' }}
        underlayColor={Colors.ZaloOverlayColor}
        onPress={onCancel}
      >
        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>Không</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{ width: 60, height: 40, justifyContent: 'center', alignItems: 'center' }}
        underlayColor={Colors.ZaloOverlayColor}
        onPress={onSubmit}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: Colors.zaloRed
          }}
        >
          Xóa
        </Text>
      </TouchableHighlight>
    </View>
  </View>
);

const ReasonReport = ({ onSubmit, onClose }) => {
  const [value, setValue] = useState();
  const onSubmitReason = () => {
    if (value) {
      onSubmit(value);
    }
  };
  return (
    <View style={{ backgroundColor: '#FFFFFF', width: '90%', paddingBottom: 8 }}>
      <Text
        style={{
          padding: 16,
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'left',
          borderBottomColor: Colors.zaloUnderlineColor,
          borderBottomWidth: 1
        }}
      >
        Lý do khác
      </Text>
      <View
        style={[
          {
            padding: 16,
            minHeight: 150,
            borderBottomWidth: 1,
            borderBottomColor: Colors.zaloUnderlineColor
          }
        ]}
      >
        <TextInput
          placeholder="Lý do khác"
          autoCapitalize="none"
          dataDetectorTypes="all"
          keyboardType="default"
          value={value}
          onChangeText={text => setValue(text)}
        />
      </View>

      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: 16, marginTop: 8 }}
      >
        <TouchableHighlight
          style={{ width: 60, height: 40, justifyContent: 'center', alignItems: 'center' }}
          underlayColor={Colors.ZaloOverlayColor}
          onPress={onClose}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>Hủy</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ width: 60, height: 40, justifyContent: 'center', alignItems: 'center' }}
          underlayColor={Colors.ZaloOverlayColor}
          onPress={onSubmitReason}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: Colors.zaloBlue,
              opacity: value ? 1 : 0.3
            }}
          >
            Gửi
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const ReportView = ({ onPressRow }) => (
  <View style={{ backgroundColor: '#FFFFFF', width: '90%', paddingBottom: 8 }}>
    <Text
      style={{
        padding: 16,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        borderBottomColor: Colors.zaloUnderlineColor,
        borderBottomWidth: 1
      }}
    >
      Lý do báo xấu
    </Text>
    {OPTION_REPORT.map(option => (
      <ReportItem row={option} onPressRow={onPressRow} key={option.key} />
    ))}
  </View>
);

const ReportItem = ({ row, onPressRow }) => (
  <TouchableHighlight underlayColor={Colors.ZaloOverlayColor} onPress={() => onPressRow(row.key)} key={row.key}>
    <Text key={row.key} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      {row.title}
    </Text>
  </TouchableHighlight>
);

const AdvanceView = ({ reportPost, userId, onPressRow }) => {
  const isOwner = useMemo(() => reportPost?.user_id === userId, [reportPost?.user_id, userId]);
  const optionShow = useMemo(() => {
    if (isOwner) {
      return OPTION_POST.filter(option => option.author !== OPTIONS_SHOW.OTHER);
    }
    return OPTION_POST.filter(option => option.author !== OPTIONS_SHOW.OWNER);
  }, [isOwner]);

  return (
    <View>
      {optionShow.map(option => (
        <AdvanceItemRow row={option} posterName={reportPost.author?.name} onPress={onPressRow} key={option.key} />
      ))}
    </View>
  );
};

const AdvanceItemRow = ({ row, posterName, onPress }) => (
  <TouchableHighlight
    underlayColor={Colors.ZaloOverlayColor}
    onPress={() => {
      onPress(row.key);
    }}
  >
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }} key={row.key}>
      <Icon name={row.iconName} type={row.icon} size={24} color={Colors.zaloGrayText} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          alignItems: 'flex-start',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: Colors.zaloUnderlineColor
        }}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16 }}>
          {row.key === OPTIONS_KEY.HIDDEN_POST ? `${row.title} của ${posterName}` : row.title}
        </Text>
        {row.explain && (
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 14, color: Colors.zaloGrayText }}>
            {row.explain}
          </Text>
        )}
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ced6e1',
    paddingBottom: 60
  },
  upload_post_container: {
    backgroundColor: '#ffffff'
  },
  upload_post_search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1
  },
  upload_post_options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
    // padding: 10,
  },
  post_element_container: {
    marginTop: 15,
    backgroundColor: '#ffffff'
  }
});
