import { View, Text, SafeAreaView, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Images from '../../theme/Images';
import { AppStyles } from '../../theme/AppStyles';
import { SendEmailStyle } from './styles';
import Button from '../../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { hp, wp } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/apiConfig';
import axios from 'axios';
import { CustomModal, InputField } from '../../components';

export default function SendEmail({ navigation }) {
    const [email, setEmail] = useState('');
    const [extraNote, setExtraNote] = useState('');
    const [subject, setSubject] = useState('INDIGO PVT LTD');
    const [data, setData] = useState([]);
    const [text, setText] = useState('testing email from application');
    const [manuallyEnteredEmails, setManuallyEnteredEmails] = useState([]);
    const [manualEmailInput, setManualEmailInput] = useState('');
    const [selectedCustomerEmails, setSelectedCustomerEmails] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [customerEmails, setCustomerEmails] = useState([]);
    const [availableEmails, setAvailableEmails] = useState([
        { label: 'shiraz@indigo.com.pk', value: 'shiraz@indigo.com.pk' },
        { label: 'shakaib@indigo.com.pk', value: 'shakaib@indigo.com.pk' },
        { label: 'sharjeel@indigo.com.pk', value: 'sharjeel@indigo.com.pk' },
        { label: 'iqra.ismail@indigo.com.pk', value: 'iqra.ismail@indigo.com.pk' },
        { label: 'almashanif126@gmail.com', value: 'almashanif126@gmail.com' },
        { label: 'ali.arain@indigo.com.pk', value: 'ali.arain@indigo.com.pk' },
    ]);
    const [selectedEmails, setSelectedEmails] = useState([]);

    const fetchAsyncStorageData = async (key, setStateCallback) => {
        try {
            const data = await AsyncStorage.getItem(key);
            if (data !== null) {
                setStateCallback(JSON.parse(data));
            }
        } catch (error) {
            console.error(`Error fetching ${key} from AsyncStorage:`, error);
        }
    };

    useEffect(() => {
        fetchAsyncStorageData('ConcernPerson Emails', setEmail);
        fetchAsyncStorageData('Extra Detail', setExtraNote);
        fetchAsyncStorageData('ScanCodes', (codesData) => {
            const codes = JSON.parse(codesData);
            const cleanedData = codes.map(({ _id, images, date, Image, ...rest }) => rest);
            setData(cleanedData);
        });
    }, []);

    useEffect(() => {
        if (email) {
            const emailObjects = email.map(emailValue => ({ label: emailValue, value: emailValue }));
            setCustomerEmails(emailObjects);
        }
    }, [email]);

    const sendEmail = async (url, requestData) => {
        try {
            const response = await axios.post(`${BASE_URL}/${url}`, requestData);
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error sending email:', error.message);
            Alert.alert(error.message);
        }
    };

    const sendEmailMarketing = () => {
        const allEmails = [...selectedEmails, ...manuallyEnteredEmails];
        const requestData = { data, to: allEmails, subject, extraNote };
        sendEmail('marketing-email', requestData);
    };

    const sendEmailConcernPerson = () => {
        const requestData = { data, to: selectedCustomerEmails, subject, text };
        sendEmail('customer-email', requestData);
    };

    const handleAddEmail = () => {
        if (manualEmailInput && !manuallyEnteredEmails.includes(manualEmailInput)) {
            setManuallyEnteredEmails([...manuallyEnteredEmails, manualEmailInput]);
            setManualEmailInput('');
        }
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <View style={AppStyles.center}>
                    <Button
                        title="Add Email Manually"
                        style={[SendEmailStyle.btn, { width: wp(50), marginTop: 10 }]}
                        onPress={() => setModalVisible(true)}
                    />
                    <View style={SendEmailStyle.view}>
                        <View style={{ zIndex: 2000 }}>
                            <DropDownPicker
                                placeholder="Select Concern Persons Email"
                                open={emailOpen}
                                value={selectedCustomerEmails}
                                items={customerEmails}
                                multiple={true}
                                setOpen={setEmailOpen}
                                setValue={setSelectedCustomerEmails}
                                setItems={setCustomerEmails}
                                theme="LIGHT"
                                listMode="SCROLLVIEW"
                                zIndex={1000}
                                zIndexInverse={3000}
                                style={{ width: wp(80), alignSelf: 'center' }}
                                containerStyle={{ width: wp(80), alignSelf: 'center' }}
                                textStyle={{ fontSize: wp(4), color: '#2f2260' }}
                                dropDownContainerStyle={{ borderColor: '#2f2260' }}
                            />
                        </View>
                        <Button
                            title="Send Email Concern Persons"
                            style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]}
                            onPress={sendEmailConcernPerson}
                        />
                        <View style={{ zIndex: 1000, marginTop: hp(5) }}>
                            <DropDownPicker
                                placeholder="Select Marketing Person Email"
                                open={emailOpen}
                                value={selectedEmails}
                                items={availableEmails}
                                multiple={true}
                                setOpen={setEmailOpen}
                                setValue={setSelectedEmails}
                                setItems={setAvailableEmails}
                                theme="LIGHT"
                                listMode="SCROLLVIEW"
                                zIndex={1000}
                                zIndexInverse={3000}
                                style={{ width: wp(80), alignSelf: 'center' }}
                                containerStyle={{ width: wp(80), alignSelf: 'center' }}
                                textStyle={{ fontSize: wp(4), color: '#2f2260' }}
                                dropDownContainerStyle={{ borderColor: '#2f2260' }}
                            />
                        </View>
                        <Button
                            title="Send Email Marketing Team"
                            style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]}
                            onPress={sendEmailMarketing}
                        />
                        <Button
                            title="Check Your Order"
                            style={[SendEmailStyle.btn, { top: 0, width: wp(50) }]}
                            onPress={() => navigation.navigate("Testing")}
                        />
                    </View>
                    <CustomModal visible={modalVisible} hideModal={handleAddEmail}>
                        <InputField
                            placeholder="Enter Marketing Person Email"
                            style={SendEmailStyle.input}
                            placeholderTextColor="#282561"
                            onChangeText={setManualEmailInput}
                            value={manualEmailInput}
                        />
                        <Button title="Add Email" onPress={handleAddEmail} />
                    </CustomModal>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
