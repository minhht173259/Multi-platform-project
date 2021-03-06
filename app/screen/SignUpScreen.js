import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, TextInput, Keyboard, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constant/Colors';
import { LoadingContext } from '../context/LoadingContext';
import AuthenticationContext from '../context/auth-context/AuthenticationContext';

const SignUpScreen = function ({ navigation }) {
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
  const [error, setError] = useState(null);

  const isSubmit = useMemo(() => phoneNumber || password, [phoneNumber, password]);

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

  const handleSignup = async () => {
    startLoading();
    try {
      console.log('PRESS');
      const response = await authContext.signup(phoneNumber, password);
      if (response.code === 1000) {
        // navigation.navigate('VerifyCode');
      }
    } catch (error) {
      console.log('ERROR: ', error);
    }
    endLoading();
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
          ????ng k??{' '}
        </Text>
      </View>
      <Text style={styles.textSupport}> Vui l??ng nh???p s??? ??i???n tho???i v?? m???t kh???u ????? ????ng k??</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="S??? ??i???n tho???i"
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
            placeholder="M???t kh???u"
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
            {`${isHiddenPassword ? 'HI???N' : '???N'}`}
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
      </View>
      <View style={styles.footer}>
        <Text style={{ opacity: isKeyboardVisible ? 0 : 1 }}>
          {' '}
          C??u h???i th?????ng g???p <AntDesign name="right" />
        </Text>

        <View style={styles.buttonNext}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="#98C5F3"
            onPress={handleSignup}
            style={[styles.buttonNext, { backgroundColor: isSubmit ? Colors.zaloBlue : '#B2B2B2' }]}
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

export default SignUpScreen;
