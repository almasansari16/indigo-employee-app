import {View, Text, SafeAreaView, ScrollView, Alert, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {AddCollectionStyle} from './styles';
import {Icon, IconInput, IconType} from '../../components';
import Button from '../../components/Button';
import {AppStyles} from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';


export default function AddCollection() {
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
      saveData();
      navigation.navigate('BarcodeScan');
    } else {
      Alert.alert('plz fill the fields');
    }
  };

  // const handleCamera = () => {
  //   navigation.navigate("CameraPage")
  // }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground source={Images.orange_background} style={{width:wp(100), height:hp(100)}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[AddCollectionStyle.center]}>
          <IconInput
            icon={
              <Icon
                type={IconType.FontAwesome5}
                name={'user'}
                color="#282561"
                style={{margin: 15}}
              />
            }
            placeholder={'Article Name'}
            placeholderTextColor={'#282561'}
            onChangeText={name => setCustomer({...customer, name})}
            value={customer.name}
            style={AddCollectionStyle.input}
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
            placeholder={'Finish Type'}
            placeholderTextColor={'#282561'}
            keyboardType={'number-pad'}
            onChangeText={contact => setCustomer({...customer, contact})}
            value={customer.contact}
            style={AddCollectionStyle.input}
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
            placeholder={'Weave'}
            placeholderTextColor={'#282561'}
            onChangeText={address => setCustomer({...customer, address})}
            value={customer.address}
            style={AddCollectionStyle.input}
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
            placeholder={'Full Width'}
            placeholderTextColor={'#282561'}
            onChangeText={billingAddress =>
              setCustomer({...customer, billingAddress})
            }
            value={customer.billingAddress}
            style={AddCollectionStyle.input}
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
            placeholder={'$/yard FOB LC Sight'}
            placeholderTextColor={'#282561'}
            keyboardType={'email-address'}
            onChangeText={email => setCustomer({...customer, email})}
            value={customer.email}
            style={AddCollectionStyle.input}
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
            placeholder={'Color'}
            placeholderTextColor={'#282561'}
            onChangeText={frontId => setCustomer({...customer, frontId})}
            value={customer.frontId}
            style={AddCollectionStyle.input}
            error={validation.frontId}
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
            placeholder={'Before wash weight (OZ)+/-5%'}
            placeholderTextColor={'#282561'}
            onChangeText={frontId => setCustomer({...customer, frontId})}
            value={customer.frontId}
            style={AddCollectionStyle.input}
            error={validation.frontId}
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
            placeholder={'After wash weight (Oz)+/-5%'}
            placeholderTextColor={'#282561'}
            onChangeText={frontId => setCustomer({...customer, frontId})}
            value={customer.frontId}
            style={AddCollectionStyle.input}
            error={validation.frontId}
          />
        </View>
        <View style={AddCollectionStyle.btnView}>
          <Button title={'Save'} onPress={handleSave} />
        </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
