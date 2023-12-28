import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, Alert } from 'react-native';
import Images from '../../theme/Images';
import { AppStyles } from '../../theme/AppStyles';
import { SendEmailStyle } from './styles';
import Button from '../../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { hp, wp } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CustomModal, InputField } from '../../components';

const SendEmail2 = ({ navigation }) => {
  const [emailOptions, setEmailOptions] = useState([]);
  const [email, setEmail] = useState('');
  const [extraNote, setExtraNote] = useState('');
  const [data, setData] = useState([]);
  const [text, setText] = useState('testing email from application');
  const [manuallyEnteredEmails, setManuallyEnteredEmails] = useState([]);
  const [manualEmailInput, setManualEmailInput] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(emailOptions[0]);
  const [subject, setSubject] = useState('INDIGO PVT LTD');
  const [selectedConcernPersonEmail, setSelectedConcernPersonEmail] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    const fetchData = async (key, setState) => {
      try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
          setState(JSON.parse(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData('ConcernPerson Emails', setEmail);
    fetchData('Extra Detail', setExtraNote);
    fetchData('ScanCodes', setData);
  }, []);

  const renderDropdown = (items, state, setState) => (
    <DropDownPicker
      placeholder={`Select ${state} Email`}
      open={state === 'emailopen' ? emailOpen : true}
      value={state === 'selectedCustomerEmails' ? selectedConcernPersonEmail : selectedEmails}
      items={items}
      multiple={true}
      setOpen={state === 'emailopen' ? setEmailOpen : () => {}}
      setValue={state === 'selectedCustomerEmails' ? setSelectedConcernPersonEmail : setSelectedEmails}
      setItems={state === 'emailopen' ? () => {} : setAvailableEmails}
      theme="LIGHT"
      zIndex={1000}
      zIndexInverse={3000}
      style={{ width: wp(80), justifyContent: 'center', alignSelf: 'center', marginHorizontal: wp(10) }}
      containerStyle={{ width: wp(80), alignSelf: 'center' }}
      textStyle={{ fontSize: wp(4), color: '#2f2260' }}
    />
  );

  const openModal = () => setModalVisible(true);

  const closeModal = async () => {
    if (manualEmailInput && !manuallyEnteredEmails.includes(manualEmailInput)) {
      setManuallyEnteredEmails([...manuallyEnteredEmails, manualEmailInput]);
      setManualEmailInput('');
    }
    setModalVisible(false);
  };

  const sendEmail = async (url, requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/${url}`, requestData);
      console.log('Response:', response.data);
      Alert.alert(response.data.message);
    } catch (error) {
      console.error('Error sending email:', error.message);
      Alert.alert(error.message);
    }
  };

  const sendEmailMarketing = async () => {
    const allEmails = [...selectedEmail, ...manuallyEnteredEmails];
    const requestData = { data, to: allEmails, subject, extraNote };

    sendEmail('marketing-email', requestData);
  };

  const sendEmailConcernPerson = async () => {
    const requestData = { to: selectedConcernPersonEmail, subject, text };
    sendEmail('customer-email', requestData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
        <View style={[AppStyles.center]}>
          <Button title={'Add Email Manually'} style={[SendEmailStyle.btn, { width: wp(50), marginTop: 10 }]} onPress={openModal} />
          <View style={SendEmailStyle.view}>
            {renderDropdown(customerEmails, 'emailopen')}
            <Button title={'Send Email Concern Persons'} style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]} onPress={sendEmailConcernPerson} />
            {renderDropdown(availableEmails, '', setAvailableEmails)}
            <Button title={'Send Email Marketing Team'} style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]} onPress={sendEmailMarketing} />
            <Button title={'Check Your Order'} style={[SendEmailStyle.btn, { top: 0, width: wp(50) }]} onPress={() => navigation.navigate('Testing')} />
          </View>
          <View>
            <CustomModal visible={modalVisible} hideModal={closeModal}>
              <InputField
                placeholder={'Enter Marketing Person Email'}
                style={SendEmailStyle.input}
                placeholderTextColor={'#282561'}
                onChangeText={(text) => setManualEmailInput(text)}
                value={manualEmailInput}
              />
              <Button title={'Add Email'} onPress={closeModal} />
            </CustomModal>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SendEmail2;
