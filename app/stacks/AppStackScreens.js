/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppContext } from '../context/AppContext';
import MainStackScreens from './MainStackScreens';
import LoadingScreenStartApp from '../screen/LoadingScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import LoginScreen from '../screen/LoginScreen';
import AuthenticationContext from '../context/auth-context/AuthenticationContext';
import AuthLoadingScreen from '../screen/AuthLoadingScreen';
import PostDetailScreen from '../screen/Main/post-screen/PostDetailScreen';
import PostZoomInScreen from '../screen/Main/post-screen/PostZoomInScreen';
import SettingScreen from '../screen/Main/profile/SettingScreen';
import ProfileScreen from '../screen/Main/profile/ProfileScreen';
import AddPostScreen from '../screen/Main/post-screen/AddPostScreen';

export const AppStack = createStackNavigator();

export default function AppStackScreens() {
  const [appContext] = useContext(AppContext);
  const [authState] = useContext(AuthenticationContext);
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {appContext.isLoadingStartApp ? (
        <AppStack.Screen name="Loading" component={LoadingScreenStartApp} />
      ) : authState?.isLoading ? (
        <AppStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      ) : authState?.token ? (
        <AppStack.Screen name="Main" component={MainStackScreens} options={{ headerShown: false }} />
      ) : (
        <>
          <AppStack.Screen name="Welcome" component={WelcomeScreen} />
          <AppStack.Screen name="Login" component={LoginScreen} />
        </>
      )}

      <AppStack.Group screen>
        <AppStack.Screen name="PostDetail" component={PostDetailScreen} />
        <AppStack.Screen name="PostZoomIn" component={PostZoomInScreen} />
        <AppStack.Screen name="PostCreate" component={AddPostScreen} />
        <AppStack.Screen name="Settings" component={SettingScreen} />
        <AppStack.Screen name="Profile" component={ProfileScreen} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
}
