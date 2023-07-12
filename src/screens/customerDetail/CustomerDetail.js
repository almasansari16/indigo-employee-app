import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomerDetailStyles} from './styles';
import Button from '../../components/Button';
import {CustomModal, InputField} from '../../components';
import {TextInput} from 'react-native-paper';
import {AppStyles} from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerDetail({navigation}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const next = () => {
    navigation.navigate('Color');
  };

  // const getCustomerDetail = async() => {
  //   try {
  //     const name = await AsyncStorage.getItem("CustomerName")
  //     const email = await AsyncStorage.getItem("CustomerEmail")
  //     const contact = await AsyncStorage.getItem("CustomerContact")
  //     const address = await AsyncStorage.getItem("CustomerAddress")
  //     const billingAddress = await AsyncStorage.getItem("CustomerBillingAddress")
  //     const frontId = await AsyncStorage.getItem("FrontId")

  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [frontId, setFrontId] = useState('');



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
        const billingAddress = await AsyncStorage.getItem('CustomerBillingAddress');
        if (billingAddress !== null) {
          setBillingAddress(billingAddress);
        }
        const frontId = await AsyncStorage.getItem('FrontId');
        if (frontId !== null) {
          setName(frontId);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <SafeAreaView style={[AppStyles.container]}>
      <View style={[CustomerDetailStyles.center]}>
        <Text style={CustomerDetailStyles.heading}>Customer Detail</Text>
        <View style={CustomerDetailStyles.detailView}>
          <Text style={CustomerDetailStyles.detailText}>Name : {name}</Text>
          <Text style={CustomerDetailStyles.detailText}>
            Email : {email}
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Address : {address}
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Billing Address : {billingAddress}
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Contact : {contact}
          </Text>
          <Text style={CustomerDetailStyles.detailText}>Front ID : {frontId}</Text>
         
        </View>
        <View style={CustomerDetailStyles.btnView}>
          <Button title={'Add Extra Detail'} onPress={showModal} />
          <Button title={'Next'} onPress={next} />
        </View>
      </View>
      <CustomModal visible={modalVisible} hideModal={hideModal}>
        <InputField placeholder={'price'} placeholderTextColor={'gray'} />
        <InputField placeholder={'price'} placeholderTextColor={'gray'} />
        <InputField placeholder={'price'} placeholderTextColor={'gray'} />
      </CustomModal>
    </SafeAreaView>
  );
}
