/* eslint-disable global-require */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import TextStyles from '../../components/Text';
import SearchZalo from '../../components/SearchZalo';
import Icon, { Icons } from '../../common/component/Icons';
import { COLOR_ZALO } from '../../constant/ColorCommon';

const postOptions = [{ label: 'Đăng hình' }, { label: 'Đăng video' }, { label: 'Hình nền' }];

export default function PostScreen({ navigation }) {
  const onClickWatchDetail = () => {
    navigation.navigate('PostDetail');
  };

  const onClickZoomInImage = () => {
    navigation.navigate('PostZoomIn');
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
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={styles.upload_post_container}>
          <View style={styles.upload_post_search}>
            <Image
              source={require('../../assets/favicon.png')}
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
                navigation.navigate('PostCreate');
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

        {[1, 2, 3].map((item, index) => (
          <View style={styles.post_element_container} key={index}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                paddingBottom: 0
              }}
            >
              <Image
                source={require('../../assets/favicon.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'cover',
                  marginRight: 20,
                  borderRadius: 50
                }}
              />
              <View>
                <TextStyles heavy size="14px">
                  {' '}
                  Hoàng Minh{' '}
                </TextStyles>
                <TextStyles> 28/10 lúc 11:24 </TextStyles>
              </View>
            </View>
            <TextStyles large bold padding="10px 10px 10px 0px">
              {' '}
              Hôm nay ăn món gì đây ?
            </TextStyles>
            <TouchableWithoutFeedback onPress={onClickZoomInImage}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=710&q=80'
                }}
                style={{
                  height: 500,
                  resizeMode: 'cover'
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 10
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity>
                  <AntDesign name="hearto" size={24} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickWatchDetail}>
                  <AntDesign name="message1" size={24} color="black" style={{ marginLeft: 30 }} />
                </TouchableOpacity>
              </View>
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

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
