import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Text } from 'react-native';
import SearchZalo from '../../components/SearchZalo';
import Icon, { Icons } from '../../common/component/Icons';
import { COLOR_ZALO } from '../../constant/ColorCommon';
import { MessageRow } from '../../components/MessageRow';

export default function MessagesScreen() {
  return (
    <SafeAreaView>
      <SearchZalo>
        <View>
          <TouchableHighlight
            underlayColor={COLOR_ZALO.highlightButton}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          >
            <Icon type={Icons.Ionicons} name="add" size={28} color="#ffffff" />
          </TouchableHighlight>
        </View>
      </SearchZalo>
      <ScrollView>
        {/* todo */}
        <View style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((row, index) => (
            <MessageRow key={index} />
          ))}
          <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 16 }}> Xem thêm </Text>
        </View>
        <View style={styles.suggestAddFriend}>
          <Text> Gợi ý kết bạn </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  suggestAddFriend: {
    marginTop: 20
  }
});
