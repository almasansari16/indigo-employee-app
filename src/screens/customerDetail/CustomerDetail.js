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
  const [extraDetail, setExtraDetail] = React.useState({
    one: '',
    two: '',
    three: '',
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const next = () => {
    navigation.navigate('Color');
  };

  const saveExtraDetail = async () => {
    try {
      const one = await AsyncStorage.setItem('one', extraDetail.one);
      const two = await AsyncStorage.setItem('two', extraDetail.two);
      const three = await AsyncStorage.setItem('three', extraDetail.three);
      hideModal()
    } catch (error) {
      console.log(error.message);
    }
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [frontId, setFrontId] = useState('');
  const [extraDetailOne, setExtraDetailOne] = useState('');
  const [extraDetailTwo, setExtraDetailTwo] = useState('');
  const [extraDetailThree, setExtraDetailThree] = useState('');

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
        const one = await AsyncStorage.getItem('one');
        if (one !== null) {
          setExtraDetailOne(extraDetailOne);
        }
        const two = await AsyncStorage.getItem('two');
        if (two !== null) {
          setExtraDetailTwo(extraDetailTwo);
        }
        const three = await AsyncStorage.getItem('three');
        if (three !== null) {
          setExtraDetailThree(extraDetailThree);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);
console.log(extraDetailOne , "getitem")
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <View style={[CustomerDetailStyles.center]}>
        <Text style={CustomerDetailStyles.heading}>Customer Detail</Text>
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
            Extra Detail one : {extraDetailOne}
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Extra Detail two : {extraDetailTwo}
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Extra Detail three : {extraDetailThree}
          </Text>
        </View>
        <View style={CustomerDetailStyles.btnView}>
          <Button title={'Add Extra Detail'} onPress={showModal} />
          <Button title={'Next'} onPress={next} />
        </View>
      </View>
      <CustomModal visible={modalVisible} hideModal={hideModal}>
        <InputField
          placeholder={'one'}
          placeholderTextColor={'gray'}
          onChangeText={one => setExtraDetail({...extraDetail, one})}
        />
        <InputField
          placeholder={'two'}
          placeholderTextColor={'gray'}
          onChangeText={two => setExtraDetail({...extraDetail, two})}
        />
        <InputField
          placeholder={'three'}
          placeholderTextColor={'gray'}
          onChangeText={three => setExtraDetail({...extraDetail, three})}
        />
        <Button title={'Save'} onPress={saveExtraDetail} />
      </CustomModal>
    </SafeAreaView>
  );
}
