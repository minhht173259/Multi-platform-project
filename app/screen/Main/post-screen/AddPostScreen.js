import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import Icon, { Icons } from '../../../common/component/Icons';

const SPACING = 16;

const { width } = Dimensions.get('window');

const AddPostScreen = ({ navigation }) => {
  const [content, setContent] = useState();
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);

  const isSubmit = (!!content && content !== '') || images.length > 0 || video.length > 0;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTransparent: false,
      headerTitle: () => renderHeaderTitle(),
      headerRight: () => renderHeaderRight(isSubmit),
      presentation: 'modal',
      headerStyle: { backgroundColor: '#fafafa' }
    });
  }, [navigation, isSubmit]);

  const onSubmitCreatePost = () => {
    console.log('Press');
  };

  const onChangeText = text => {
    setContent(text);
  };

  const onChangeImages = () => {};

  const onChangeVideo = () => {};

  const renderHeaderTitle = useCallback(() => <HeaderTitle />, []);

  const renderHeaderRight = useCallback(
    value => (
      <TouchableOpacity style={{ marginRight: 10 }} onPress={value ? onSubmitCreatePost : undefined}>
        <Text style={{ color: value ? '#0c85fd' : '#87c8fc' }}>ĐĂNG</Text>
      </TouchableOpacity>
    ),
    []
  );

  const renderImagesShow = () => {
    const size = images.length;
    if (size || size === 0) {
      return null;
    }

    const numberOfCol = Math.round(size / 2) + 1;
    const padding = SPACING;
    const WIDTH_ITEM = (width - padding * 2) / numberOfCol;

    return (
      <View
        style={{
          width: '100%',
          height: 500,
          // backgroundColor: 'red',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: SPACING
        }}
      >
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> Content </Text>
        </View>
        <TouchableWithoutFeedback>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ebeff2'
            }}
          >
            <Icon name="add-outline" type={Icons.Ionicons} size={60} color="#767676" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBar />
      <ScrollView>
        <TextInput
          editable
          multiline
          style={{
            width: '100%',
            height: 'auto',
            padding: SPACING,
            fontSize: 18
          }}
          placeholder="Hãy viết điều bạn suy nghĩ"
          value={content}
          onChangeText={text => onChangeText(text)}
        />
        {renderImagesShow()}
      </ScrollView>
      <View style={{ width: '100%', padding: SPACING, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="sticker-emoji" type={Icons.MaterialCommunityIcons} size={30} style={{ flexGrow: 1 }} />
        <Icon name="sticker-emoji" type={Icons.MaterialCommunityIcons} size={30} />
        <Icon name="sticker-emoji" type={Icons.MaterialCommunityIcons} size={30} />
        <Icon name="sticker-emoji" type={Icons.MaterialCommunityIcons} size={30} />
      </View>
    </SafeAreaView>
  );
};

function HeaderTitle() {
  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="group" type={Icons.MaterialIcons} size={24} color="#767676" />
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: 10, color: '#1f1f1f' }}>Tất cả bạn bè</Text>
        <Icon name="sort-down" type={Icons.FontAwesome} size={20} color="#767676" style={{ alignSelf: 'flex-start' }} />
      </View>
      <Text style={{ fontSize: 14, color: '#868b8f' }}>Xem bởi bạn bè trên Zalo</Text>
    </>
  );
}

const styles = StyleSheet.create({});

export default AddPostScreen;
