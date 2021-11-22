import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon, { Icons } from '../common/component/Icons';
import { COLOR_ZALO } from '../constant/ColorCommon';

const { width } = Dimensions.get('window');

const SearchZalo = ({ onPressHandler = () => {}, children, ...restProps }) => {
  const handlerOnPress = () => {
    onPressHandler();
  };
  return (
    <TouchableWithoutFeedback onPress={handlerOnPress}>
      <View style={styles.searchContainer} {...restProps}>
        <Icon type={Icons.AntDesign} name="search1" color="#ffffff" size={22} />
        <Text style={styles.text}> Tìm bạn bè, tin nhắn ... </Text>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width,
    backgroundColor: COLOR_ZALO.searchBackground,
    padding: 10,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    marginLeft: 20,
    fontSize: 18,
    color: COLOR_ZALO.searchTextColor,
    flexGrow: 1
  }
});

export default SearchZalo;
