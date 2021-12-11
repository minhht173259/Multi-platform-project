import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image
} from 'react-native';
import Icon, { Icons } from '../../../common/component/Icons';
import { COLOR_ZALO } from '../../../constant/ColorCommon';

const IMAGE_STICKER_WAIT_MESS = require('../../../assets/images/messageWait.png');

const HEIGHT_NAVIGATE = 50;
const SPACING = 16;
// const { height } = Dimensions.get('window');

const PostDetailScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState('');

  // TODO: Route with information of POST: postId, postContent, PostImage

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: false,
      presentation: 'modal'
    });
  }, [navigation]);

  const handleChangeComment = text => {
    setComment(text);
  };

  const onClickNavigateBack = () => {
    navigation.goBack();
  };

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
      <ScrollView style={styles.mainContainer}>
        <View style={styles.contentHeader}>
          <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1634749724963-721227794e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>User name</Text>
            <Text style={{ fontSize: 16 }}>13:18 Hôm qua</Text>
          </View>
          <View style={styles.headerMess}>
            <Icon type={Icons.MaterialCommunityIcons} name="facebook-messenger" color="#32a2f8" size={24} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#212121' }}> Nhắn tin </Text>
          </View>
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
            {/* TODO */}
            Content Của bài viết ZALO . Hãy tạo lên những điều mới mẻ OKOK
          </Text>
        </View>

        <View style={styles.contentImage}>
          {/* TODO */}
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1634748210255-af588c16652a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

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
          {/* TODO */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* <Icon type={Icons.AntDesign} name="heart" size={24} color="red" /> */}
            <Icon type={Icons.AntDesign} name="hearto" size={24} color="#606060" />
            <Text style={{ fontSize: 16, marginLeft: 4 }}> 22 </Text>
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
          {/* TODO */}
          <Text style={{ fontSize: 14, color: '#979ea7' }}>
            Có 9 bình luận. Bạn chỉ xem được bình luận của bạn bè trong danh bạn{' '}
          </Text>
        </View>

        {/* TODO: List Comment */}
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
      </ScrollView>
      <View style={styles.footerContainer}>
        <Icon type={Icons.Feather} name="smile" size={30} color="#6c6c6c" />
        <TextInput
          placeholder="Nhập bình luận"
          autoCapitalize="none"
          dataDetectorTypes="all"
          keyboardType="default"
          style={[styles.inputComment]}
          value={comment}
          onChangeText={handleChangeComment}
        />
        <Icon type={Icons.Ionicons} name="md-image-outline" size={30} color="#6c6c6c" />
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="send-circle"
          size={34}
          style={{ marginLeft: SPACING }}
          color="#bed4e1"
        />
      </View>
    </SafeAreaView>
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
    height: 500
  }
});

export default React.memo(PostDetailScreen);
