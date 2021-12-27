import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Colors from '../../../constant/Colors';
import { COLOR_ZALO } from '../../../constant/ColorCommon';

// const ADVANCE_OWNER_OPTIONS_KEY = [{}];

// const ADVANCE_OWNER_OPTIONS = [
//   {
//     key: ''
//   }
// ];

const AdvanceOptionOwnerScreen = ({ navigation, route }) => {
  const {
    userId,
    username,
    phonenumber,
    country,
    description,
    link,
    avatar,

    isOwner
  } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTransparent: false,
      headerTitleStyle: {
        color: '#FFFFFF',
        fontSize: 18
      },
      headerTintColor: '#FFFFFF',
      headerTitle: username,
      presentation: 'transparentModal',
      headerStyle: { backgroundColor: COLOR_ZALO.searchBackground }
    });
  }, [username]);

  const onPressInformation = () => {
    navigation.push('InformationUser', {
      userId,
      username,
      phonenumber,
      country,
      description,
      link,
      avatar,
      isOwner
    });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.rowContainer}
        underlayColor={Colors.ZaloOverlayColor}
        onPress={onPressInformation}
      >
        <Text style={styles.rowText}>Thông tin</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zaloBackgroundColor
  },
  rowContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  rowText: {
    fontSize: 14,
    fontWeight: '600'
  }
});

export default React.memo(AdvanceOptionOwnerScreen);
