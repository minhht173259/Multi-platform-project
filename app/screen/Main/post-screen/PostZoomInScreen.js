import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import Icon, { Icons } from '../../../common/component/Icons';

const SPACING = 16;
const COLOR_BLACK = '#000000';
const COLOR_WHITE = '#FFFFFF';
const HEIGHT_BAR = 50;
const { height } = Dimensions.get('window');

const PostZoomInScreen = ({ navigation }) => {
  const opacityRef = useRef(new Animated.Value(0)).current;
  const [opacityState, setOpacityState] = useState(undefined);

  const onClickWatchDetail = () => {
    navigation.navigate('PostDetail');
  };

  useEffect(() => {
    if (opacityState === undefined) {
      Animated.timing(opacityRef, {
        toValue: 1,
        delay: 1000,
        useNativeDriver: true
      }).start();
    } else if (opacityState) {
      Animated.timing(opacityRef, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(opacityRef, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    }
  }, [opacityState]);

  const onClickImage = () => {
    setOpacityState(!opacityState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden backgroundColor={COLOR_BLACK} />
      <Animated.View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: HEIGHT_BAR,
          paddingHorizontal: SPACING,
          opacity: opacityRef
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon type={Icons.Feather} name="arrow-left" size={26} color={COLOR_WHITE} />
        </TouchableOpacity>
        <View style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: SPACING }}>
          <Text style={{ color: COLOR_WHITE, fontSize: 18, fontWeight: 'bold' }}>User Name</Text>
          <Text style={{ color: COLOR_WHITE, fontSize: 16 }}>21/11/2021</Text>
        </View>
        <Icon type={Icons.AntDesign} name="message1" size={28} color={COLOR_WHITE} />
        <Icon type={Icons.Feather} name="more-vertical" size={28} color={COLOR_WHITE} style={{ marginLeft: SPACING }} />
      </Animated.View>
      <View style={{ height: height - HEIGHT_BAR * 2, width: '100%', justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={onClickImage}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1634748210255-af588c16652a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            }}
            style={{
              width: '100%',
              height: 500
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: HEIGHT_BAR,
          paddingHorizontal: SPACING,
          opacity: opacityRef
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Icon type={Icons.AntDesign} name="hearto" size={24} color={COLOR_WHITE} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickWatchDetail}>
            <Icon
              type={Icons.AntDesign}
              name="message1"
              size={24}
              color={COLOR_WHITE}
              style={{ marginLeft: SPACING * 2 }}
            />
          </TouchableOpacity>
        </View>
        <Icon type={Icons.Feather} name="more-vertical" size={28} color={COLOR_WHITE} style={{ marginLeft: SPACING }} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }
});

export default PostZoomInScreen;
