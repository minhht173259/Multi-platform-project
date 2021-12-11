import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from '../common/component/Icons';
import { COLOR_ZALO } from '../constant/ColorCommon';

const HEIGHT = 50;
const SPACING = 16;

const RowSetting = ({ item, borderBottom, ...restProps }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: SPACING,
      height: HEIGHT,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}
    {...restProps}
  >
    <Icon type={item.type} name={item.icon} size={item.size} color={item.color} />
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        borderBottomWidth: borderBottom ? 1 : 0,
        borderBottomColor: COLOR_ZALO.underLineColor,
        flexGrow: 1,
        marginLeft: SPACING
      }}
    >
      <Text
        style={{
          fontSize: 16
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.label}
      </Text>
    </View>
  </View>
);

export default RowSetting;
