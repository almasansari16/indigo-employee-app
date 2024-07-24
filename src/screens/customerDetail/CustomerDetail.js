import { View, Text, SafeAreaView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomerDetailStyles } from './styles';
import Button from '../../components/Button';
import { CustomModal, InputField } from '../../components';
import { TextInput } from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { wp } from '../../../App';


export default function CustomerDetail({ navigation }) {
  
  const next = () => {
    navigation.navigate('SendEmail');
  };



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [frontId, setFrontId] = useState('');
  const [scanCode, setScanCode] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await AsyncStorage.getItem('CustomerName');
        if (name !== null) {
          setName(name);
        }
        const email = await AsyncStorage.getItem('CustomerEmail');
        if (email !== null) {
          setEmail(email);
        }
        const contact = await AsyncStorage.getItem('CustomerContact');
        if (contact !== null) {
          setContact(contact);
        }
        const address = await AsyncStorage.getItem('CustomerAddress');
        if (address !== null) {
          setAddress(address);
        }
        const billingAddress = await AsyncStorage.getItem(
          'CustomerBillingAddress',
        );
        if (billingAddress !== null) {
          setBillingAddress(billingAddress);
        }
        const frontId = await AsyncStorage.getItem('FrontId');
        if (frontId !== null) {
          setFrontId(frontId);
        }
        const scanCodes = await AsyncStorage.getItem('barcode');
        if (scanCode !== null) {
          setScanCode(scanCodes);
        }

      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(scanCode, '...................')
  console.log([new Set(scanCode)])


  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
        <View style={[CustomerDetailStyles.center]}>
          <Text style={CustomerDetailStyles.heading}>Customer Detail</Text>
          <View style={[AppStyles.horizontalLine, { width: wp(40) }]} />
          <View style={CustomerDetailStyles.detailView}>
            <Text style={CustomerDetailStyles.detailText}>Name : {name}</Text>
            <Text style={CustomerDetailStyles.detailText}>Email : {email}</Text>
            <Text style={CustomerDetailStyles.detailText}>
              Address : {address}
            </Text>
            <Text style={CustomerDetailStyles.detailText}>
              Billing Address : {billingAddress}
            </Text>
            <Text style={CustomerDetailStyles.detailText}>
              Contact : {contact}
            </Text>
            <Text style={CustomerDetailStyles.detailText}>
              Front ID : {frontId}
            </Text>
            <Text style={CustomerDetailStyles.detailText}>
              Barcode : {scanCode}
            </Text>

          </View>
          <View style={CustomerDetailStyles.btnView}>
            <Button title={'next'} onPress={next} style={CustomerDetailStyles.btn} />
            <Button title={'Add Extra Detail'} onPress={() => navigation.navigate("AddExtraDetail")} style={CustomerDetailStyles.btn} />
          </View>
        </View>
       
      </ImageBackground>
    </SafeAreaView>
  );
}
