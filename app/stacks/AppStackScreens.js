/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppContext } from '../context/AppContext';
import MainStackScreens from './MainStackScreens';
import LoadingScreenStartApp from '../screen/LoadingScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import LoginScreen from '../screen/LoginScreen';
import AuthenticationContext from '../context/auth-context/AuthenticationContext';
import PostDetailScreen from '../screen/Main/post-screen/PostDetailScreen';
import PostZoomInScreen from '../screen/Main/post-screen/PostZoomInScreen';
import AddPostScreen from '../screen/Main/post-screen/AddPostScreen';
import UserStackScreen from './UserStackScreens';
import MessageStackScreen from './MessageStackScreen';
import MessDetailScreen from '../screen/Main/mess/MessDetailScreen';
import MessageOptionScreen from '../screen/Main/mess/MessageOptionScreen';
import SearchScreen from '../screen/Main/search/SearchScreen';

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
      ) : authState?.token ? (
        <AppStack.Screen name="Main" component={MainStackScreens} options={{ headerShown: false }} />
      ) : (
        <>
          <AppStack.Screen name="Welcome" component={WelcomeScreen} />
          <AppStack.Screen name="Login" component={LoginScreen} />
        </>
      )}
      {authState?.token && authState.token !== '' && (
        <>
          <AppStack.Group screen screenOptions={{ presentation: 'transparentModal' }}>
            <AppStack.Screen name="PostDetail" component={PostDetailScreen} />
            <AppStack.Screen name="PostZoomIn" component={PostZoomInScreen} />
            <AppStack.Screen name="PostCreate" component={AddPostScreen} />
          </AppStack.Group>

          <AppStack.Group screen screenOptions={{ presentation: 'transparentModal', headerShown: true }}>
            <AppStack.Screen name="MessageDetail" component={MessDetailScreen} />
            <AppStack.Screen name="MessageOption" component={MessageOptionScreen} />
          </AppStack.Group>
          <AppStack.Group screen screenOptions={{ presentation: 'transparentModal', headerShown: true }}>
            <AppStack.Screen name="Search" component={SearchScreen} />
          </AppStack.Group>

          {/* <AppStack.Screen name="MessageScreen" component={MessageStackScreen} /> */}
          <AppStack.Screen name="UserProfile" component={UserStackScreen} />
        </>
      )}
    </AppStack.Navigator>
  );
}
