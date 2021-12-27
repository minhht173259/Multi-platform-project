import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessDetailScreen from '../screen/Main/mess/MessDetailScreen';
import MessageOptionScreen from '../screen/Main/mess/MessageOptionScreen';

const MessageStack = createStackNavigator();

export default function MessageStackScreen() {
  return (
    <MessageStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <MessageStack.Screen name="MessageDetail" component={MessDetailScreen} />
      <MessageStack.Screen name="MessageOption" component={MessageOptionScreen} />
    </MessageStack.Navigator>
  );
}
