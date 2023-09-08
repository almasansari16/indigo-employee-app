import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import { AppStyles } from '../../theme/AppStyles';
import { Icon, IconInput, IconType } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddBrandStyle } from './styles';
import Button from '../../components/Button';

export default function AddBrand({ navigation }) {
  const [customer, setCustomer] = useState({
    brandName: '',
    address: '',
  });

  const [validation, setValidation] = useState({});

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('CustomerName', customer.brandName);
      await AsyncStorage.setItem('CustomerAddress', customer.address);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = () => {
    const errors = {};

    if (!customer.brandName) {
      errors.brandName = 'Brand Name is required';
    }
    if (!customer.address) {
      errors.address = 'Contact is required';
    }

    setValidation(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      saveData()
      Alert.alert("Brand save sucessfully")
      setCustomer({brandName : " " , address: " " })
      navigation.navigate('AllCustomersList')
    }

  };

  return (
    <SafeAreaView style={[AppStyles.container]}>
      <LinearGradient
        colors={['#ba6b4d', '#f9f1da', '#ba6b4d']}
        style={{ flex: 1 }}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[AddBrandStyle.center]}>
            <IconInput
              icon={
                <Icon
                  type={IconType.FontAwesome5}
                  name={'user'}
                  color="#282561"
                  style={{ margin: 15 }}
                />
              }
              placeholder={'Brand Name'}
              placeholderTextColor={'#282561'}
              onChangeText={brandName => setCustomer({ ...customer, brandName })}
              value={customer.brandName}
              style={AddBrandStyle.input}
              error={validation.brandName}
            />
            <IconInput
              icon={
                <Icon
                  type={IconType.Ionicons}
                  name={'location-outline'}
                  color="#282561"
                  style={{ margin: 15 }}
                />
              }
              placeholder={'Address'}
              placeholderTextColor={'#282561'}
              keyboardType={'number-pad'}
              onChangeText={address => setCustomer({ ...customer, address })}
              value={customer.address}
              style={AddBrandStyle.input}
              error={validation.address}
            />
          </View>
          <View style={AddBrandStyle.btnView}>
            <Button title={'Save'} onPress={handleSave} style={AddBrandStyle.btn} textStyle={AddBrandStyle.text} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}