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
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon, { Icons } from '../../../common/component/Icons';
import Colors from '../../../constant/Colors';

const SPACING = 16;

const { width } = Dimensions.get('window');

const AddPostScreen = ({ submit, closePopup }) => {
  const [content, setContent] = useState();
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState();

  const isSubmit = (!!content && content !== '') || images.length > 0 || video;

  const onSubmitCreatePost = () => {
    console.log('PRESS');
    if (isSubmit) {
      submit(images, video, content);
      closePopup();
    }
  };

  const onChangeText = text => {
    setContent(text);
  };

  const onChangeImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: false,
      exif: false
    });

    if (!result.cancelled) {
      const newImages = [...images, result];
      setImages(newImages);
    }
  };

  const onChangeVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: false,
      exif: false,
      videoMaxDuration: 10
    });

    if (!result.cancelled) {
      setVideo(result);
    }
  };

  const renderHeaderTitle = useCallback(() => <HeaderTitle />, []);

  const renderImagesShow = () => {
    const size = images.length;
    if (!size || size === 0) {
      return null;
    }

    const numberOfCol = Math.round(size / 2);
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
          <Image source={{ uri: images[0].uri }} style={{ width: WIDTH_ITEM, height: 300, resizeMode: 'cover' }} />
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 4,
          backgroundColor: '#FFFFFF'
        }}
      >
        <TouchableOpacity onPress={closePopup}>
          <Icon name="arrowleft" type={Icons.AntDesign} size={20} color="#000000" />
        </TouchableOpacity>
        <View style={{ flexGrow: 1, marginLeft: 16 }}>{renderHeaderTitle()}</View>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSubmitCreatePost}>
          <Text style={{ color: isSubmit ? '#0c85fd' : '#87c8fc' }}>ĐĂNG</Text>
        </TouchableOpacity>
      </View>
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
        <Icon name="emotsmile" type={Icons.SimpleLineIcons} size={30} style={{ flexGrow: 1 }} color={Colors.zaloBlue} />
        <TouchableOpacity onPress={onChangeImages}>
          <Icon
            name="ios-images"
            type={Icons.Ionicons}
            size={30}
            color={Colors.zaloBlue}
            style={{ marginHorizontal: 16 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onChangeVideo}>
          <Icon name="video" type={Icons.Entypo} size={30} color={Colors.zaloBlue} />
        </TouchableOpacity>
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
