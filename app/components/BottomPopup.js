import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View, Animated, Dimensions, Easing } from 'react-native';

const { height } = Dimensions.get('window');

const BottomPopup = ({ open = false, showPopup, backgroundColor = '#000000AA', closePopup, children }) => {
  const translateY = useRef(new Animated.Value(height)).current;

  const renderOutsideTouchable = onTouch => {
    const view = (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 1,
          elevation: 1
        }}
      />
    );

    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Animated.timing(translateY, {
            toValue: height,
            duration: 500,
            delay: 0,
            ease: Easing.linear,
            useNativeDriver: false
          }).start();
          setTimeout(() => {
            onTouch();
          }, 500);
        }}
      >
        {view}
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    if (open) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: 0,
        ease: Easing.linear,
        useNativeDriver: false
      }).start();
    }
  }, [open]);

  return (
    <Modal transparent animationType="fade" visible={open}>
      <View style={[styles.popupContainer, { backgroundColor }]}>
        {renderOutsideTouchable(closePopup)}
        <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>{children}</Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1
  },
  content: {
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    elevation: 2,
    position: 'absolute',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: 16
  }
});

export default React.memo(BottomPopup);
