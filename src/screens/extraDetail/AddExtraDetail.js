import {View, Text, SafeAreaView, ScrollView, Alert, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {ExtraDetail} from './styles';
import {Icon, IconInput, IconType} from '../../components';
import Button from '../../components/Button';
import {AppStyles} from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient

export default function AddExtraDetail({navigation}) {
  const [extraDetail, setExtraDetail] = useState({
    extraDetail1: '',
    extraDetail2: '',
    extraDetail3: '',
    extraDetail4: '',
  });

  const [validation, setValidation] = useState({});

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('extraDetail1', extraDetail.extraDetail1);
      await AsyncStorage.setItem('extraDetail2', extraDetail.extraDetail2);
      await AsyncStorage.setItem('extraDetail3', extraDetail.extraDetail3);
      await AsyncStorage.setItem('extraDetail4', extraDetail.extraDetail4);

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = () => {
    // const errors = {};

    // if (!extraDetail.name) {
    //   errors.name = 'Customer Name is required';
    // }

    // if (!extraDetail.contact) {
    //   errors.contact = 'Contact is required';
    // }
    // if (!extraDetail.email) {
    //   errors.email = 'Email is required';
    // }
    // if (!extraDetail.address) {
    //   errors.address = 'Contact is required';
    // }
    // if (!extraDetail.billingAddress) {
    //   errors.billingAddress = 'Billing Address is required';
    // }
    // if (!extraDetail.frontId) {
    //   errors.frontId = 'Front ID is required';
    // }
    // setValidation(errors);

    // if (Object.keys(errors).length === 0) {
    //   // Proceed with form submission
      
    // }
    saveData()
    navigation.navigate('FinalOrderDetail');
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
        <View style={[ExtraDetail.center]}>
          <IconInput
            
            placeholder={'Extra Detail 1'}
            placeholderTextColor={'#282561'}
            onChangeText={extraDetail1 => setExtraDetail({...extraDetail, extraDetail1})}
            value={extraDetail.extraDetail1}
            style={ExtraDetail.input}
            // error={validation.extraDetail1}
          />
          <IconInput
           
            placeholder={'Extra Detail 2'}
            placeholderTextColor={'#282561'}
            keyboardType={'number-pad'}
            onChangeText={extraDetail2 => setExtraDetail({...extraDetail, extraDetail2})}
            value={extraDetail.extraDetail2}
            style={ExtraDetail.input}
            // error={validation.extraDetail2}
          />
          <IconInput
           
            placeholder={'Extra Detail 3'}
            placeholderTextColor={'#282561'}
            onChangeText={extraDetail3 => setExtraDetail({...extraDetail, extraDetail3})}
            value={extraDetail.extraDetail3}
            style={ExtraDetail.input}
            // error={validation.extraDetail3}
          />
          <IconInput
           
            placeholder={'Extra Detail 4'}
            placeholderTextColor={'#282561'}
            onChangeText={extraDetail4 =>
              setExtraDetail({...extraDetail, extraDetail4})
            }
            value={extraDetail.extraDetail4}
            style={ExtraDetail.input}
            // error={validation.extraDetail4}
          />
 
        </View>
        <View style={ExtraDetail.btnView}>
          <Button title={'Save'} onPress={handleSave} style={ExtraDetail.btn} textStyle={ExtraDetail.text}/>
        </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
