import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screen/Main/profile/ProfileScreen';
import SettingScreen from '../screen/Main/profile/SettingScreen';
import AccountAndSecurityScreen from '../screen/Main/profile/AccountAndSecurityScreen';
import AdvanceOptionOwnerScreen from '../screen/Main/profile/AdvanceOptionOwnerScreen';
import InformationUserScreen from '../screen/Main/profile/InformationUserScreen';
import EditInformationScreen from '../screen/Main/profile/EditInfomationScreen';

const UserStack = createStackNavigator();

export default function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <UserStack.Screen name="Profile" component={ProfileScreen} />
        <UserStack.Screen name="AccountAndSecurity" component={AccountAndSecurityScreen} />
        <UserStack.Screen name="Settings" component={SettingScreen} />
        <UserStack.Screen name="AdvanceOwner" component={AdvanceOptionOwnerScreen} />
        <UserStack.Screen name="InformationUser" component={InformationUserScreen} />
        <UserStack.Screen name="EditInformation" component={EditInformationScreen} />
      </UserStack.Group>
    </UserStack.Navigator>
  );
}
