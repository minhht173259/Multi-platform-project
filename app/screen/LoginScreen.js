import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableHighlight
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AuthenticationContext from '../context/auth-context/AuthenticationContext';
import { LoadingContext } from '../context/LoadingContext';

const LoginScreen = function ({ navigation }) {
  const [authState, authContext] = useContext(AuthenticationContext);
  const { startLoading, endLoading } = useContext(LoadingContext);
  const [focus, setFocus] = useState({
    phone: false,
    password: false
  });

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const KeyboardListenerShow = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const KeyboardListenerHidden = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      KeyboardListenerShow.remove();
      KeyboardListenerHidden.remove();
    };
  }, []);

  const handleLogin = async () => {
    startLoading();
    try {
      await authContext.signIn(phoneNumber, password);
      endLoading();
    } catch (error) {
      endLoading();
      console.log('Error: ', error);
    }
  };

  const handleChangePhoneNumber = text => {
    setPhoneNumber(text);
  };

  const handleChangePassword = text => {
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3083DC" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableHighlight
          activeOpacity={0.5}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20
          }}
          underlayColor="#98C5F3"
          onPress={() => navigation.navigate('Welcome')}
        >
          <AntDesign name="arrowleft" size={26} color="#fff" />
        </TouchableHighlight>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#fff',
            marginLeft: 20
          }}
        >
          {' '}
          Đăng nhập{' '}
        </Text>
      </View>
      <Text style={styles.textSupport}> Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Số điện thoại"
          autoCapitalize="none"
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
          style={[styles.inputPhone, { borderBottomColor: focus.phone ? '#66AAF3' : '#B2B2B2' }]}
          onFocus={({ nativeEvent }) => {
            setFocus({
              ...focus,
              phone: true
            });
          }}
          onBlur={({ nativeEvent }) => {
            setFocus({
              ...focus,
              phone: false
            });
          }}
          maxLength={10}
          value={phoneNumber}
          onChangeText={handleChangePhoneNumber}
        />
        <View>
          <TextInput
            secureTextEntry={isHiddenPassword}
            placeholder="Mật khẩu"
            style={[styles.inputPassword, { borderBottomColor: focus.password ? '#66AAF3' : '#B2B2B2' }]}
            onFocus={({ nativeEvent }) => {
              setFocus({
                ...focus,
                password: true
              });
            }}
            onBlur={({ nativeEvent }) => {
              setFocus({
                ...focus,
                password: false
              });
            }}
            value={password}
            onChangeText={handleChangePassword}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              right: 0,
              fontSize: 18,
              fontWeight: '700',
              color: '#B2B2B2',
              width: 50,
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
            onPress={() => {
              setIsHiddenPassword(!isHiddenPassword);
            }}
          >
            {`${isHiddenPassword ? 'HIỆN' : 'ẨN'}`}
          </Text>
        </View>
        {authState?.error && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'normal',
              color: '#f15656',
              marginTop: 10
            }}
          >
            {authState.error}
          </Text>
        )}
        <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={0.7}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#3083DC'
            }}
          >
            {' '}
            Lấy lại mật khẩu{' '}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{ opacity: isKeyboardVisible ? 0 : 1 }}>
          {' '}
          Câu hỏi thường gặp <AntDesign name="right" />
        </Text>

        <View style={styles.buttonNext}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="#98C5F3"
            onPress={handleLogin}
            style={styles.buttonNext}
          >
            <AntDesign name="arrowright" size={26} color="#fff" />
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#66AAF3',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textSupport: {
    fontSize: 14,
    padding: 10,
    backgroundColor: '#E3E4E5',
    color: '#B2B2B2'
  },
  form: {
    flexGrow: 1,
    marginTop: 20,
    marginHorizontal: 10
  },
  inputPhone: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,

    borderBottomColor: '#B2B2B2',
    borderBottomWidth: 2,
    marginBottom: 10
  },
  inputPassword: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    fontSize: 18,

    borderBottomColor: '#B2B2B2',
    borderBottomWidth: 2
  },
  footer: {
    padding: 10,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonNext: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C7D5E7',

    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;
