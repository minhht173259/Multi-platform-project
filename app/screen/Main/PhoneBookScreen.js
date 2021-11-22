import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableHighlight } from 'react-native';
import SearchZalo from '../../components/SearchZalo';
import Icon, { Icons } from '../../common/component/Icons';
import { COLOR_ZALO } from '../../constant/ColorCommon';

export default function PhoneBookScreen() {
  return (
    <SafeAreaView>
      <SearchZalo>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          >
            <Icon type={Icons.Ionicons} name="md-person-add-outline" color="#ffffff" />
          </TouchableHighlight>
        </View>
      </SearchZalo>
      <ScrollView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
