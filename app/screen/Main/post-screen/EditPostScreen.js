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
  Image,
  TouchableHighlight
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Icon, { Icons } from '../../../common/component/Icons';
import Colors from '../../../constant/Colors';

const SPACING = 16;

const { width } = Dimensions.get('window');

const EditPostScreen = ({ onEditPost, closePopup, contentOld }) => {
  const [content, setContent] = useState(contentOld);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState();

  const [error, setError] = useState();

  const isSubmit = (!!content && content !== '') || images.length > 0 || video;

  const onSubmitCreatePost = () => {
    if (isSubmit) {
      onEditPost(content);
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
      if (video) {
        setVideo(null);
      }
      if (images.length + 1 > 4) {
        setError('Số lượng ảnh không được vượt quá 4');
      } else {
        console.log(result);
        const newImages = [...images, result];
        setImages(newImages);
      }
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
      setImages([]);
      setVideo(result);
    }
  };

  const clearImage = image => {
    const newList = [...images].filter(item => item.uri !== image.uri);
    setImages(newList);
  };

  const renderHeaderTitle = useCallback(() => <HeaderTitle />, []);

  const renderImagesShow = () => {
    const size = images.length;
    if (!size || size === 0) {
      return null;
    }

    const numberOfCol = size !== 4 ? Math.floor(size / 2) + 1 : Math.floor(size / 2);
    const padding = SPACING;
    const WIDTH_ITEM = (width - padding * 2) / numberOfCol;
    const HEIGHT_ITEM = (500 - padding * 2) / numberOfCol;

    return (
      <View
        style={{
          width: '100%',
          height: 'auto',
          // backgroundColor: 'red',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: SPACING
        }}
      >
        <View
          style={{
            flexGrow: 1,
            height: 500,
            alignItems: 'center',
            display: 'flex',
            flexDirection: size === 2 ? 'row' : 'column',
            width,
            flexWrap: 'wrap'
          }}
        >
          {images.map((image, index) => (
            <View
              style={{ width: WIDTH_ITEM, height: size > 2 ? HEIGHT_ITEM : 'auto', margin: 8, flexGrow: 1 }}
              key={index}
            >
              <Image
                source={{ uri: image.uri }}
                style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }}
              />
              <View style={{ position: 'absolute', zIndex: 1000, right: 10, top: 10 }}>
                <TouchableHighlight
                  onPress={() => clearImage(image)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.zaloGrayText,

                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  underlayColor={Colors.ZaloOverlayColor}
                >
                  <Icon name="clear" type={Icons.MaterialIcons} size={24} color="#FFFFFF" />
                </TouchableHighlight>
              </View>
            </View>
          ))}
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
          <Text style={{ color: isSubmit ? '#0c85fd' : '#87c8fc' }}>Sửa</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
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

export default EditPostScreen;
