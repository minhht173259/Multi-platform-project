import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, View, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react/cjs/react.development';
import Colors from '../../../constant/Colors';
import { DEFAULT_AVT } from '../../../constant/Constants';
import { COLOR_ZALO } from '../../../constant/ColorCommon';
import UserContext from '../../../context/user-context/UserContext';
import { LoadingContext } from '../../../context/LoadingContext';

const EditInformationScreen = ({ navigation, route }) => {
  const { userId, username, phonenumber, country, description, link, avatar } = route.params;
  const [_, userContext] = useContext(UserContext);
  const { startLoading, endLoading } = useContext(LoadingContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTransparent: false,
      headerTitleStyle: {
        color: '#FFFFFF',
        fontSize: 18
      },
      headerTintColor: '#FFFFFF',
      headerTitle: 'Chỉnh sửa thông tin',
      presentation: 'transparentModal',
      headerStyle: { backgroundColor: COLOR_ZALO.searchBackground }
    });
  }, []);

  const [image, setImage] = useState({});
  const [imageURI, setImageURI] = useState(avatar?.link);
  const [usernameInput, setUsernameInput] = useState(username);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [countryInput, setCountryInput] = useState(country);
  const [linkInput, setLinkInput] = useState(link);
  const [addressInput, setAddressInput] = useState();

  const [error, setError] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: false,
      exif: false
    });

    if (!result.cancelled) {
      setImage(result);
      setImageURI(result.uri);
    }
  };

  const onSubmitUpdate = async () => {
    try {
      startLoading();
      const response = await userContext.setUserInfo(
        usernameInput,
        descriptionInput,
        countryInput,
        addressInput,
        linkInput,
        image
      );
      console.log('RESPONSE: ', response);
      if (response.code === 1000) {
        //
        navigation.navigate('Profile', {
          username: usernameInput,
          avatar,
          userId,
          description: descriptionInput,
          phonenumber
        });
      } else {
        const errMess = `${response.code} - ${response.message}`;
        setError(errMess);
      }
    } catch (error) {
      //
      console.log('ERROR EDIT: ', error);
    }
    endLoading();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: imageURI || DEFAULT_AVT
            }}
            style={styles.imagePicker}
          />
        </TouchableOpacity>
        {error && error !== '' && (
          <View>
            <Text style={{ fontSize: 14, color: Colors.zaloRed }}>{error}</Text>
          </View>
        )}
        <View style={styles.formInputContainer}>
          <InputCustom
            title="Nhập họ và tên"
            value={usernameInput}
            onChange={text => setUsernameInput(text)}
            max={30}
          />
          <InputCustom title="Mô tả" value={descriptionInput} onChange={text => setDescriptionInput(text)} max={150} />
          <InputCustom title="Quốc tịch" value={countryInput} onChange={text => setCountryInput(text)} max={100} />
          <InputCustom title="Địa chỉ" value={addressInput} onChange={text => setAddressInput(text)} max={100} />
          <InputCustom title="Link" value={linkInput} onChange={text => setLinkInput(text)} max={100} />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonOwner} onPress={onSubmitUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const InputCustom = ({ title, value, onChange, max, min }) => {
  const [focus, setFocus] = useState(false);
  const onChangeText = text => {
    onChange(text);
  };
  return (
    <View style={styles.inputContainer}>
      <Text>{title}</Text>
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: focus ? '#66AAF3' : Colors.zaloUnderlineColor
        }}
      >
        <TextInput
          placeholder={title}
          autoCapitalize="none"
          dataDetectorTypes="all"
          keyboardType="default"
          maxLength={max}
          style={[
            {
              flexGrow: 1,
              fontSize: 14
            }
          ]}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePicker: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 8,
    marginVertical: 8
  },
  formInputContainer: {
    width: '100%',
    marginTop: 16
  },
  buttonOwner: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    width: 200,
    backgroundColor: Colors.zaloBlue,

    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

export default EditInformationScreen;
