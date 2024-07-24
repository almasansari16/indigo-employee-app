import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { ForgotPasswordStyle } from './styles';
import { hp, wp } from '../../../App';
import { BASE_URL } from '../../config/apiConfig';
import Images from '../../theme/Images';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
      setMessage(response.data.message);

      if (response.data.token) {
        navigation.navigate('ResetPassword', { token: response.data.token });
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred, please try again.');
      if (email === "") {
        setMessage("Please enter your email address");
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FastImage
        source={Images.purple_background}
        style={{ flex: 1 }}
        resizeMode={FastImage.resizeMode.cover}
      >
        <Spinner />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={[ForgotPasswordStyle.center, { marginTop: hp(10) }]}>
              <Image source={Images.Logo} />
              <Text style={ForgotPasswordStyle.text}>Forgot Password</Text>
              <View style={ForgotPasswordStyle.horizontalLine} />
              <TextInput
                style={ForgotPasswordStyle.input}
                placeholder="Enter your email"
                placeholderTextColor="#EEEEEE"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity style={ForgotPasswordStyle.loginBtn} onPress={handleSubmit}>
                <Text style={ForgotPasswordStyle.btnText}>Submit</Text>
              </TouchableOpacity>
              {message ? <Text style={ForgotPasswordStyle.linkText}>{message}</Text> : null}
            </View>
          </View>
        </ScrollView>
      </FastImage>
    </SafeAreaView>
  );
};

export default ForgotPassword;
