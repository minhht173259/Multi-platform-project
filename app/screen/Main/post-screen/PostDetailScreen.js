import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  Dimensions
} from 'react-native';
import { useContext } from 'react/cjs/react.development';
import _ from 'lodash';
import { Video } from 'expo-av';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Icon, { Icons } from '../../../common/component/Icons';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import AuthenticationContext from '../../../context/auth-context/AuthenticationContext';
import { PostContext } from '../../../context/post-context/PostContext';
import Colors from '../../../constant/Colors';
import { getTime } from '../../../common/getTime';
import { LoadingContext } from '../../../context/LoadingContext';
import Popup from '../../../components/Popup';

const IMAGE_STICKER_WAIT_MESS = require('../../../assets/images/messageWait.png');

const HEIGHT_NAVIGATE = 50;
const SPACING = 16;

const DEFAULT_AVT =
  'https://images.unsplash.com/photo-1634749724963-721227794e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

const { width } = Dimensions.get('window');

const PostDetailScreen = ({ navigation, route }) => {
  const { post } = route.params;
  const [authState] = useContext(AuthenticationContext);
  const { startLoading, endLoading } = useContext(LoadingContext);
  const [postState, postContext] = useContext(PostContext);
  const [postCurrent, setPostCurrent] = useState(post);
  const [comments, setComments] = useState([]);
  const [loadingCm, setLoadingCm] = useState(false);
  const [isBlocked, setIsBlocked] = useState(post.is_blocked);

  const [valueInput, setValueInput] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [commentDelete, setCommentDelete] = useState();

  const isCurrentUser = useMemo(() => {
    if (authState && postCurrent.user_id) {
      return authState.id === postCurrent.user_id;
    }
    return false;
  }, [authState, postCurrent.id]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: false
    });
  }, [navigation]);

  useEffect(() => {
    async function loadPost() {
      if (post.id) {
        try {
          const postResponse = await postContext.getPost(post.id);
          if (postResponse.code === 1000) {
            console.log(postResponse.data);
            setPostCurrent(postResponse.data);
            setIsBlocked(postResponse.data.is_blocked);
          }
        } catch (error) {
          //
        }
      }
    }
    loadPost();
  }, [post.id]);

  useEffect(() => {
    const getListComment = async () => {
      if (postCurrent.comment > 0) {
        // call API
        setLoadingCm(true);
        try {
          const response = await postContext.getComments(postCurrent.id, 0, postCurrent.comment);
          if (response.code === 1000) {
            setComments(response.data);
            setIsBlocked(response.id_blocked);
          }
          setLoadingCm(false);
        } catch (error) {
          setLoadingCm(false);
        }
      }
    };
    getListComment();
  }, []);

  const handleChangeComment = text => {
    setValueInput(text);
  };

  const createComment = async () => {
    try {
      const response = await postContext.setComment(postCurrent.id, postCurrent.comment + 1, 10, valueInput);
      if (response.code === 1000) {
        setIsBlocked(response.is_blocked);
        const commentsResponse = response.data;
        const newComments = [...comments, ...commentsResponse];
        setComments(newComments);
        setPostCurrent({ ...postCurrent, comment: newComments.length });
        setValueInput(null);
      }
    } catch (error) {
      //
    }
  };

  const onClickNavigateBack = () => {
    navigation.goBack();
  };

  const onPressLike = useCallback(async () => {
    try {
      const response = await postContext.likePost(postCurrent.id);
      if (response.code === 1000) {
        const like = !postCurrent.is_liked;
        setPostCurrent({
          ...postCurrent,
          like: response.data.like,
          is_liked: like
        });
      }
    } catch (error) {
      //
    }
  }, []);
  const onLongPressRowComment = useCallback(comment => {
    if (comment.user_id === authState.id) {
      setOpenDelete(true);
      setCommentDelete(comment);
    }
  }, []);
  const onPressDeleteComment = useCallback(async () => {
    startLoading();
    try {
      const response = await postContext.deleteComment(commentDelete.post_id, commentDelete.id);
      if (response.code === 1000) {
        const newComments = comments.filter(item => item.id !== commentDelete.id);
        setComments(newComments);
        setPostCurrent({ ...postCurrent, comment: postCurrent.comment - 1 });
      }
      endLoading();
    } catch (error) {
      console.log('ERROR: ', error);
      endLoading();
    }
    setOpenDelete(false);
    setCommentDelete({});
  }, [commentDelete?.id, commentDelete?.post_id]);

  const onClosePopup = () => {
    setOpenDelete(false);
  };
  const onPressOpenEdit = useCallback(() => {
    setOpenEdit(true);
    setOpenDelete(false);
  }, []);

  const onCloseEditPopup = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const onPressEdit = useCallback(
    async text => {
      startLoading();
      try {
        const response = await postCurrent.editComment(commentDelete.post_id, commentDelete.id, text);
        if (response === 1000) {
          //
        } else {
          Toast.show({
            type: 'error',
            text1: `${response.code} - ${response.message}`
          });
        }
      } catch (error) {
        //
      }
      setOpenEdit(false);
      endLoading();
    },
    [commentDelete?.id, commentDelete?.post_id]
  );

  // render
  const renderHeaderPostDetail = useMemo(() => {
    const sizeOfImage = postCurrent.images.length;
    const numberOfCol = sizeOfImage !== 4 ? Math.floor(sizeOfImage / 2) + 1 : Math.floor(sizeOfImage / 2);
    const padding = 16;
    const WIDTH_ITEM = (width - padding * 2) / numberOfCol;
    const HEIGHT_ITEM = (500 - padding * 2) / numberOfCol;
    return (
      <>
        <View style={styles.contentHeader}>
          <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{
                uri: postCurrent.author?.avatar?.link ? postCurrent.author?.avatar.link : DEFAULT_AVT
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>{postCurrent?.author?.name || ''}</Text>
            <Text style={{ fontSize: 16 }}>{getTime(postCurrent.created_at)}</Text>
          </View>
          {!isCurrentUser && (
            <View style={styles.headerMess}>
              <Icon type={Icons.MaterialCommunityIcons} name="facebook-messenger" color="#32a2f8" size={24} />
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#212121' }}> Nhắn tin </Text>
            </View>
          )}
        </View>
        <View
          style={{
            width: '100%',
            height: 'auto',
            paddingHorizontal: SPACING,
            paddingBottom: SPACING
          }}
        >
          <Text
            style={{
              fontSize: 16
            }}
          >
            {postCurrent?.content}
          </Text>
        </View>

        {postCurrent?.images && postCurrent.images.length > 0 && (
          <View
            style={{
              display: 'flex',
              flexDirection: sizeOfImage === 2 ? 'row' : 'column',
              width: '100%',
              height: 500,
              flexWrap: 'wrap'
            }}
          >
            {postCurrent.images.map((img, key) => (
              <View
                style={{
                  width: WIDTH_ITEM,
                  height: sizeOfImage > 2 ? HEIGHT_ITEM : 'auto',
                  margin: 8,
                  flexGrow: 1
                }}
                key={key}
              >
                <Image
                  source={{
                    uri: img.link
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                    borderRadius: 20
                  }}
                />
              </View>
            ))}
          </View>
        )}

        {postCurrent.video?.link && (
          <Video
            source={{ uri: postCurrent.video.link }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            // shouldPlay
            // isLooping
            useNativeControls
            style={{ width: '100%', height: 500 }}
          />
        )}

        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: SPACING,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0'
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={onPressLike}>
              {postCurrent.is_liked ? (
                <Icon type={Icons.AntDesign} name="heart" size={24} color={Colors.zaloRed} />
              ) : (
                <Icon type={Icons.AntDesign} name="hearto" size={24} color="#606060" />
              )}
            </TouchableOpacity>
            <Text style={{ fontSize: 16, marginLeft: 4 }}>{`${
              postCurrent.like && postCurrent.like > 0 ? postCurrent.like : ''
            }`}</Text>
          </View>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#979ea7' }}>Xem lượt thích</Text>
            <Icon type={Icons.EvilIcon} name="chevron-right" size={24} color="#979ea7" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            paddingHorizontal: SPACING,
            paddingVertical: SPACING / 2,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0'
          }}
        >
          <Text style={{ fontSize: 14, color: '#979ea7' }}>
            {`Có ${postCurrent.comment} bình luận. Bạn chỉ xem được bình luận của bạn bè trong danh bạn`}
          </Text>
        </View>

        {postCurrent.comment === 0 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: (SPACING * 3) / 2
            }}
          >
            <Image source={IMAGE_STICKER_WAIT_MESS} style={{ width: 120, height: 80, resizeMode: 'cover' }} />
            <Text>Tham gia bình luận hoạt động này</Text>
            <Text style={{ color: '#979ea7' }}>
              Dùng Sticker để vui hơn! <Text style={{ color: '#1d91f1' }}>Xem thêm</Text>
            </Text>
          </View>
        )}
        {loadingCm && (
          <View style={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 16 }}>
            <ActivityIndicator size="small" color={COLOR_ZALO.searchBackground} />
          </View>
        )}
      </>
    );
  }, [loadingCm, postCurrent, isCurrentUser]);

  const renderItemRow = useCallback(
    ({ item }) => (
      <TouchableHighlight onLongPress={() => onLongPressRowComment(item)} underlayColor={Colors.ZaloOverlayColor}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: SPACING
          }}
        >
          <Image
            source={{
              uri: !item.poster?.avatar?.link ? DEFAULT_AVT : item.poster?.avatar?.link
            }}
            style={{ width: 40, height: 40, borderRadius: 20, marginHorizontal: SPACING }}
          />
          <View
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottomWidth: 1,
              borderBottomColor: '#ebebeb',
              paddingBottom: SPACING / 2
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '700' }}>{item.poster.name}</Text>
              {/* Content */}
              <View>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
              </View>
              <Text style={{ color: '#979ea7', fontSize: 14 }}>{getTime(item.created_at)}</Text>
            </View>
            <Icon
              type={Icons.AntDesign}
              name="hearto"
              size={20}
              color="#606060"
              style={{ marginHorizontal: SPACING }}
            />
          </View>
        </View>
      </TouchableHighlight>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <View style={styles.navigateContainer}>
        <TouchableOpacity onPress={onClickNavigateBack}>
          <Icon type={Icons.Feather} name="arrow-left" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.navigationText}> Bình luận </Text>
        <Icon type={Icons.Feather} name="more-vertical" size={28} color="#ffffff" style={{ marginLeft: SPACING }} />
      </View>
      <FlatList
        horizontal={false}
        initialNumToRender={7}
        showsVerticalScrollIndicator={false}
        data={comments}
        renderItem={renderItemRow}
        keyExtractor={(item, index) => `-${item.id}-${index}`}
        ListHeaderComponent={renderHeaderPostDetail}
        style={styles.mainContainer}
      />
      {postCurrent.can_comment && (
        <View style={styles.footerContainer}>
          <Icon type={Icons.Feather} name="smile" size={30} color="#6c6c6c" />
          <TextInput
            placeholder="Nhập bình luận"
            autoCapitalize="none"
            dataDetectorTypes="all"
            keyboardType="default"
            style={[styles.inputComment]}
            value={valueInput}
            onChangeText={handleChangeComment}
          />
          <Icon type={Icons.Ionicons} name="md-image-outline" size={30} color="#6c6c6c" />
          <TouchableOpacity onPress={createComment}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name="send-circle"
              size={34}
              style={{ marginLeft: SPACING }}
              color={valueInput ? Colors.zaloBlue : '#bed4e1'}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Popup delete comment */}
      <Popup open={openDelete} backgroundColor="rgba(52,52,52, 0.2)" closePopup={onClosePopup}>
        <View style={{ width: '90%', backgroundColor: '#FFFFFF', paddingBottom: 8 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              padding: 16,
              borderBottomColor: Colors.zaloUnderlineColor,
              borderBottomWidth: 1
            }}
          >
            {commentDelete?.comment}
          </Text>
          <TouchableHighlight
            style={{ paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}
            onPress={onPressDeleteComment}
            underlayColor={Colors.ZaloOverlayColor}
          >
            <Text>Xóa bình luận</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}
            onPress={onPressOpenEdit}
            underlayColor={Colors.ZaloOverlayColor}
          >
            <Text>Chỉnh sửa bình luận</Text>
          </TouchableHighlight>
        </View>
      </Popup>
      {/* EditComment */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={openEdit}
        onRequestClose={() => {
          setOpenEdit(false);
        }}
      >
        <View>
          <EditPost comment={commentDelete} closePopup={onCloseEditPopup} onEditComment={onPressEdit} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const EditPost = ({ closePopup, comment, onEditComment }) => {
  const [valueComment, setValueComment] = useState(comment.comment || '');

  const handleChangeComment = text => {
    setValueComment(text);
  };

  const onPressEditComment = () => {
    if (onEditComment) {
      onEditComment(valueComment);
    }
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 4
        }}
      >
        <TouchableHighlight
          style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
          underlayColor={Colors.ZaloOverlayColor}
          onPress={closePopup}
        >
          <Icon name="arrowleft" type={Icons.AntDesign} size={24} color="#000000" />
        </TouchableHighlight>
        <View
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 16, flexGrow: 1 }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="group" type={Icons.MaterialIcons} size={24} color="#767676" />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: 10, color: '#1f1f1f' }}>
              Tất cả bạn bè
            </Text>
            <Icon
              name="sort-down"
              type={Icons.FontAwesome}
              size={20}
              color="#767676"
              style={{ alignSelf: 'flex-start' }}
            />
          </View>
          <Text style={{ fontSize: 14, color: '#868b8f' }}>Xem bởi bạn bè trên Zalo</Text>
        </View>
        <TouchableHighlight
          style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
          underlayColor={Colors.ZaloOverlayColor}
          onPress={onPressEditComment}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textAlign: 'center',
              color: Colors.zaloBlue
            }}
          >
            Sửa
          </Text>
        </TouchableHighlight>
      </View>
      <TextInput
        placeholder="Nhập bình luận"
        autoCapitalize="none"
        dataDetectorTypes="all"
        keyboardType="default"
        multiline
        style={[
          {
            flexGrow: 1,
            fontSize: 20,
            paddingHorizontal: 16
          }
        ]}
        value={valueComment}
        onChangeText={handleChangeComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    height: HEIGHT_NAVIGATE,
    width: '100%',
    paddingLeft: SPACING,
    paddingRight: SPACING,
    backgroundColor: COLOR_ZALO.searchBackground
  },
  navigationText: {
    flexGrow: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: SPACING
  },

  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: HEIGHT_NAVIGATE,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: SPACING,
    borderTopWidth: 1,
    borderTopColor: '#efefef'
  },
  inputComment: {
    flexGrow: 1,
    marginLeft: SPACING,

    fontSize: 16
  },
  mainContainer: {
    // maxHeight: height - 2 * HEIGHT_NAVIGATE,
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingBottom: HEIGHT_NAVIGATE
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    flexGrow: 1,
    marginLeft: SPACING
  },
  headerMess: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderColor: '#e6e7e9'
  },
  contentImage: {
    width: '100%',
    maxHeight: 500
  }
});

export default React.memo(PostDetailScreen);
