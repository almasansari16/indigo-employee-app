import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppStyles} from '../../theme/AppStyles';
import {LoginStyle} from './styles';
import Images from '../../theme/Images';
import {InputField} from '../../components';
import {hp, wp} from '../../../App';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

// mock server functions
const verifyUserCredentials = payload => {
  // make an HTTP request to the server and verify user credentials
  return {userId: '123456'};
};

const sendPublicKeyToServer = publicKey => {
  // make an HTTP request to the server and save the `publicKey` on the user's entity
  console.log({publicKey});
};

const verifySignatureWithServer = async ({signature, payload}) => {
  // make an HTTP request to the server and verify the signature with the public key.

  return {status: 'success'};
};


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function Login({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignin = () => {
    if (form.email != '' && form.password != '') {
      Alert.alert('fill the input fields');
    } else {
      Alert.alert('Signin Sucessfully');
      navigation.navigate('Dashboard');
    }
  };
  return (
    <SafeAreaView style={[AppStyles.container]}>
    <ImageBackground source={Images.purple_background} style={{width:wp(100), height:hp(100)}}>
      <View>
        <View style={[LoginStyle.center, {marginTop: hp(10)}]}>
          <Image source={Images.Logo} />
          <Text style={LoginStyle.text}>Login</Text>
          <View style={[LoginStyle.horizontalLine]}/>
        </View>
        <View style={[LoginStyle.center, {marginTop: hp(5)}]}>
          <InputField
            label={'Email'}
            placeholder={'Enter your email'}
            placeholderTextColor={'#EEEEEE'}
            keyboardType={'email-address'}
            onChangeText={email => setForm({...form, email})}
            value={form.email}
            style={LoginStyle.input}
          />
          <InputField
            label={'Password'}
            placeholder={'Enter your password'}
            placeholderTextColor={'#EEEEEE'}
            keyboardType={'password'}
            onChangeText={password => setForm({...form, password})}
            value={form.password}
            secureTextEntry={true}
            style={LoginStyle.input}
          />
        </View>
        <TouchableOpacity
          onPress={handleSignin}
          style={[LoginStyle.loginBtn, LoginStyle.center]}>
          <Text style={[LoginStyle.btnText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const {userId} = await verifyUserCredentials(form);

            // handle onPress
            const rnBiometrics = new ReactNativeBiometrics();

            const {available, biometryType} =
              await rnBiometrics.isSensorAvailable();

            if (available && biometryType === BiometryTypes.FaceID) {
              Alert.alert(
                'Face ID',
                'Would you like to enable Face ID authentication for the next time?',
                [
                  {
                    text: 'Yes please',
                    onPress: async () => {
                      const {publicKey} = await rnBiometrics.createKeys();

                      await sendPublicKeyToServer(publicKey);

                      // save `userId` in the local storage to use it during Face ID authentication
                      await AsyncStorage.setItem('userId', userId);
                    },
                  },
                  {text: 'Cancel', style: 'cancel'},
                ],
              );
            }
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const rnBiometrics = new ReactNativeBiometrics();
            const {available, biometryType} =
              await rnBiometrics.isSensorAvailable();

            if (!available || biometryType !== BiometryTypes.FaceID) {
              Alert.alert('Oops!', 'Face ID is not available on this device.');
              return;
            }

            const userId = await AsyncStorage.getItem('userId');

            if (!userId) {
              Alert.alert(
                'Oops!',
                'You have to sign in using your credentials first to enable Face ID.',
              );
              return;
            }

            const timestamp = Math.round(
              new Date().getTime() / 1000,
            ).toString();
            const payload = `${userId}__${timestamp}`;

            const {success, signature} = await rnBiometrics.createSignature({
              promptMessage: 'Sign in',
              payload,
            });

            if (!success) {
              Alert.alert(
                'Oops!',
                'Something went wrong during authentication with Face ID. Please try again.',
              );
              return;
            }

            const {status, message} = await verifySignatureWithServer({
              signature,
              payload,
            });

            if (status !== 'success') {
              Alert.alert('Oops!', message);
              return;
            }

            Alert.alert('Success!', 'You are successfully authenticated!');
          }}
          style={[LoginStyle.loginBtn, LoginStyle.center]}>
          <Text style={[LoginStyle.btnText]}>Face Scan</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
