import {View, Text, SafeAreaView, ScrollView, Alert, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {AddCustomerStyle} from './styles';
import {Icon, IconInput, IconType} from '../../components';
import Button from '../../components/Button';
import {AppStyles} from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient

export default function AddCustomer({navigation}) {
  const [customer, setCustomer] = useState({
    name: '',
    contact: '',
    address: '',
    billingAddress: '',
    email: '',
    frontId: '',
  });

  const [validation, setValidation] = useState({});

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('CustomerName', customer.name);
      await AsyncStorage.setItem('CustomerContact', customer.contact);
      await AsyncStorage.setItem('CustomerEmail', customer.email);
      await AsyncStorage.setItem('CustomerAddress', customer.address);
      await AsyncStorage.setItem(
        'CustomerBillingAddress',
        customer.billingAddress,
      );
      await AsyncStorage.setItem('FrontId', customer.frontId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = () => {
    const errors = {};

    if (!customer.name) {
      errors.name = 'Customer Name is required';
    }

    if (!customer.contact) {
      errors.contact = 'Contact is required';
    }
    if (!customer.email) {
      errors.email = 'Email is required';
    }
    if (!customer.address) {
      errors.address = 'Contact is required';
    }
    if (!customer.billingAddress) {
      errors.billingAddress = 'Billing Address is required';
    }
    if (!customer.frontId) {
      errors.frontId = 'Front ID is required';
    }
    setValidation(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      saveData()
      navigation.navigate('BarcodeScan');
    }
  
  };

  // const handleCamera = () => {
  //   navigation.navigate("CameraPage")
  // }
  return (
    <SafeAreaView style={[AppStyles.container]}>
        <LinearGradient
        colors={['#ba6b4d', '#f9f1da', '#ba6b4d']}
        style={{flex:1}}
        start={{x: 0.3, y: 0}}
        end={{x: 1, y: 1}}
      >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[AddCustomerStyle.center]}>
          <IconInput
            icon={
              <Icon
                type={IconType.FontAwesome5}
                name={'user'}
                color="#282561"
                style={{margin: 15}}
              />
            }
            placeholder={'Name'}
            placeholderTextColor={'#282561'}
            onChangeText={name => setCustomer({...customer, name})}
            value={customer.name}
            style={AddCustomerStyle.input}
            error={validation.name}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Feather}
                name={'phone'}
                color="#282561"
                style={{margin: 15}}
              />
            }
            placeholder={'Contact'}
            placeholderTextColor={'#282561'}
            keyboardType={'number-pad'}
            onChangeText={contact => setCustomer({...customer, contact})}
            value={customer.contact}
            style={AddCustomerStyle.input}
            error={validation.contact}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Ionicons}
                name={'location-outline'}
                color="#282561"
                style={{margin: 15}}
              />
            }
            placeholder={'Address'}
            placeholderTextColor={'#282561'}
            onChangeText={address => setCustomer({...customer, address})}
            value={customer.address}
            style={AddCustomerStyle.input}
            error={validation.address}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Ionicons}
                name={'location-outline'}
                color="#282561"
                style={{margin: 15}}
              />
            }
            placeholder={'Billing Address'}
            placeholderTextColor={'#282561'}
            onChangeText={billingAddress =>
              setCustomer({...customer, billingAddress})
            }
            value={customer.billingAddress}
            style={AddCustomerStyle.input}
            error={validation.billingAddress}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.MaterialCommunityIcons}
                name={'email-outline'}
                color="#282561"
                style={{margin: 15}}
              />
            }
            placeholder={'Email'}
            placeholderTextColor={'#282561'}
            keyboardType={'email-address'}
            onChangeText={email => setCustomer({...customer, email})}
            value={customer.email}
            style={AddCustomerStyle.input}
            error={validation.email}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Feather}
                name={'camera'}
                color="#282561"
                style={{margin: 15}}
              />
            }
            placeholder={'Front ID'}
            placeholderTextColor={'#282561'}
            onChangeText={frontId => setCustomer({...customer, frontId})}
            value={customer.frontId}
            style={AddCustomerStyle.input}
            error={validation.frontId}
          />
        </View>
        <View style={AddCustomerStyle.btnView}>
          <Button title={'Save'} onPress={handleSave} style={AddCustomerStyle.btn} textStyle={AddCustomerStyle.text}/>
        </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
