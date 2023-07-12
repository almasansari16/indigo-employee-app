import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {AddCustomerStyle} from './styles';
import {Icon, IconInput, IconType} from '../../components';
import Button from '../../components/Button';
import {AppStyles} from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
   saveData()

    
   
    navigation.navigate('BarcodeScan');
  };

  // const handleCamera = () => {
  //   navigation.navigate("CameraPage")
  // }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[AddCustomerStyle.center]}>
          <IconInput
            icon={
              <Icon
                type={IconType.FontAwesome5}
                name={'user'}
                color="black"
                style={{margin: 15}}
              />
            }
            placeholder={'Name'}
            onChangeText={name => setCustomer({...customer, name})}
            value={customer.name}
            style={AddCustomerStyle.input}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Feather}
                name={'phone'}
                color="black"
                style={{margin: 15}}
              />
            }
            placeholder={'Contact'}
            keyboardType={'number-pad'}
            onChangeText={contact => setCustomer({...customer, contact})}
            value={customer.contact}
            style={AddCustomerStyle.input}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Ionicons}
                name={'location-outline'}
                color="black"
                style={{margin: 15}}
              />
            }
            placeholder={'Address'}
            onChangeText={address => setCustomer({...customer, address})}
            value={customer.address}
            style={AddCustomerStyle.input}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Ionicons}
                name={'location-outline'}
                color="black"
                style={{margin: 15}}
              />
            }
            placeholder={'Billing Address'}
            onChangeText={billingAddress =>
              setCustomer({...customer, billingAddress})
            }
            value={customer.billingAddress}
            style={AddCustomerStyle.input}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.MaterialCommunityIcons}
                name={'email-outline'}
                color="black"
                style={{margin: 15}}
              />
            }
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={email => setCustomer({...customer, email})}
            value={customer.email}
            style={AddCustomerStyle.input}
          />
          <IconInput
            icon={
              <Icon
                type={IconType.Feather}
                name={'camera'}
                color="black"
                style={{margin: 15}}
              />
            }
            placeholder={'Front ID'}
            onChangeText={frontId => setCustomer({...customer, frontId})}
            value={customer.frontId}
            style={AddCustomerStyle.input}
          />
        </View>
        <View style={AddCustomerStyle.btnView}>
          <Button title={'Save'} onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
