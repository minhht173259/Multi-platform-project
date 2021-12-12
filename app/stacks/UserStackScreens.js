import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screen/Main/profile/ProfileScreen';
import SettingScreen from '../screen/Main/profile/SettingScreen';
import AccountAndSecurityScreen from '../screen/Main/profile/AccountAndSecurityScreen';

const UserStack = createStackNavigator();

export default function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Profile" component={ProfileScreen} />
      <UserStack.Screen name="Settings" component={SettingScreen} />
      <UserStack.Screen name="AccountAndSecurity" component={AccountAndSecurityScreen} />
    </UserStack.Navigator>
  );
}
