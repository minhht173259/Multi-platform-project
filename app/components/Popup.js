import React from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const Popup = ({ open = false, showPopup, backgroundColor = '#000000AA', closePopup, children }) => {
  const renderOutsideTouchable = onTouch => {
    const view = (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
      />
    );

    if (!onTouch) return view;

    return <TouchableWithoutFeedback onPress={onTouch}>{view}</TouchableWithoutFeedback>;
  };

  return (
    <Modal transparent animationType="fade" visible={open}>
      <View style={[styles.popupContainer, { backgroundColor }]}>
        {renderOutsideTouchable(closePopup)}
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Popup;
