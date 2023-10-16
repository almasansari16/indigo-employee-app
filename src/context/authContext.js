import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config/config';
import { Alert } from 'react-native';
import { navigateToDashboard, navigateToLogin } from '../utils/navigationUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children , navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, email, password, contact) => {
    setIsLoading(true);
  
    axios
      .post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
        contact,
      })
      .then((res) => {
        console.log('Server Response:', res.data.msg);
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        Alert.alert(userInfo.msg);
        navigateToLogin(navigation)
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          // The request was made, but the server responded with an error
          Alert.alert('Registration Error', error.response.data.message);
          if (error.response.status === 400) {
            const validationErrors = error.response.data.errors;
            // Display validation errors in your form or alert
            console.log(validationErrors);}
        } else if (error.request) {
          // The request was made, but no response was received
          Alert.alert('Network Error', 'Check your internet connection and try again.');
        } 
      });
  };

  const login = (email, password) => {
    setIsLoading(true);
  
    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log('Server Response:', res.data.msg);
        let userInfo = res.data;
        setUserInfo(userInfo);
        Alert.alert(res.data.msg)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        navigateToDashboard(navigation)
      })
      .catch((error) => {
        console.log(error,"ycvhgvgv")
        setIsLoading(false);
        if (error.response) {
          // The request was made, but the server responded with an error
          Alert.alert('Login Error', error.response.data.message);
          console.log(error)
        } else if (error.request) {
          // The request was made, but no response was received
          Alert.alert('Network Error', 'Check your internet connection and try again.');
        } 
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.access_token}` },
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};