import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppStyles } from '../../theme/AppStyles';
import { SendEmailStyle } from './styles';
import Button from '../../components/Button';
import { CustomModal, InputField } from '../../components';
import { BASE_URL } from '../../config/apiConfig';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';

export default function SendEmail({ navigation }) {
    const [selectedConcernPersonEmails, setSelectedConcernPersonEmails] = useState([]);
    const [selectedMarketingPersonEmails, setSelectedMarketingPersonEmails] = useState([]);
    const [manualMarketingEmailInput, setManualMarketingEmailInput] = useState('');
    const [manualConcernEmailInput, setManualConcernEmailInput] = useState('');
    const [extraNote, setExtraNote] = useState('');
    const [data, setData] = useState([]);
    const [subject, setSubject] = useState('INDIGO PVT LTD');

    useEffect(() => {
        const fetchConcernPersonEmails = async () => {
            try {
                const storedEmails = await AsyncStorage.getItem('ConcernPersonEmails');
                if (storedEmails !== null) {
                    const concernPersonEmails = JSON.parse(storedEmails);
                    setSelectedConcernPersonEmails(concernPersonEmails);
                }
            } catch (error) {
                console.error('Error fetching concern person emails:', error);
            }
        };
        fetchConcernPersonEmails();
    }, []);

    useEffect(() => {
        const fetchScanCodes = async () => {
            try {
                const storedCodes = await AsyncStorage.getItem('ScanCodes');
                if (storedCodes !== null) {
                    const parsedCodes = JSON.parse(storedCodes);
                    const codesWithoutImages = parsedCodes.map(({ _id, images, date, Image, ...code }) => code);
                    setData(codesWithoutImages);
                }
            } catch (error) {
                console.error('Error fetching scan codes:', error);
            }
        };
        fetchScanCodes();
    }, []);

    const sendEmailMarketing = async () => {
        const allEmails = [...selectedMarketingPersonEmails, ...manualMarketingEmailInput.split(',').map(email => email.trim())];
        const requestData = {
            data,
            to: allEmails,
            subject,
            extraNote,
        };

        try {
            const response = await axios.post(`${BASE_URL}/marketing-email`, requestData);
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error sending marketing email:', error.message);
            Alert.alert(error.message);
        }
    };

    const sendEmailConcernPerson = async () => {
        const allEmails = [...selectedConcernPersonEmails, ...manualConcernEmailInput.split(',').map(email => email.trim())];
        try {
            const response = await axios.post(`${BASE_URL}/customer-email`, {
                to: allEmails,
                subject,
                text: 'testing email from application',
            });
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error sending concern person email:', error);
            Alert.alert(error.message);
        }
    };

    const openModal = (type) => {
        if (type === 'marketing') {
            setManualMarketingEmailInput('');
        } else if (type === 'concern') {
            setManualConcernEmailInput('');
        }
        setModalVisible(true);
        setModalType(type);
    };

    const closeModal = (type) => {
        if (type === 'marketing') {
            if (manualMarketingEmailInput && !selectedMarketingPersonEmails.includes(manualMarketingEmailInput)) {
                setSelectedMarketingPersonEmails([...selectedMarketingPersonEmails, manualMarketingEmailInput]);
                setManualMarketingEmailInput('');
            }
        } else if (type === 'concern') {
            if (manualConcernEmailInput && !selectedConcernPersonEmails.includes(manualConcernEmailInput)) {
                setSelectedConcernPersonEmails([...selectedConcernPersonEmails, manualConcernEmailInput]);
                setManualConcernEmailInput('');
            }
        }
        setModalVisible(false);
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <View style={[AppStyles.center]}>
                    <Button
                        title="Add Marketing Email Manually"
                        style={[SendEmailStyle.btn, { width: wp(50), marginTop: 10 }]}
                        onPress={() => openModal('marketing')}
                    />
                    <Button
                        title="Add Concern Person Email Manually"
                        style={[SendEmailStyle.btn, { width: wp(50), marginTop: 10 }]}
                        onPress={() => openModal('concern')}
                    />
                    <View style={SendEmailStyle.view}>
                        <View style={{ zIndex: 2000 }}>
                            <DropDownPicker
                                placeholder="Select Concern Person's Email"
                                open={false}
                                value={selectedConcernPersonEmails}
                                items={selectedConcernPersonEmails.map(email => ({ label: email, value: email }))}
                                multiple
                                setOpen={() => {}}
                                setValue={setSelectedConcernPersonEmails}
                                setItems={() => {}}
                                theme="LIGHT"
                                listMode="SCROLLVIEW"
                                zIndex={1000}
                                zIndexInverse={3000}
                                style={{ width: wp(80), justifyContent: 'center', alignSelf: 'center', marginHorizontal: wp(10) }}
                                containerStyle={{ width: wp(80), alignSelf: 'center' }}
                                textStyle={{ fontSize: wp(4), color: '#2f2260' }}
                                dropDownContainerStyle={{
                                    borderColor: '#2f2260',
                                    position: 'relative',
                                    top: 0,
                                }}
                            />
                        </View>
                        <Button
                            title="Send Email to Concern Persons"
                            style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]}
                            onPress={sendEmailConcernPerson}
                        />
                        <View style={{ zIndex: 1000, marginTop: hp(5) }}>
                            <DropDownPicker
                                placeholder="Select Marketing Person Email"
                                open={false}
                                value={selectedMarketingPersonEmails}
                                items={selectedMarketingPersonEmails.map(email => ({ label: email, value: email }))}
                                multiple
                                setOpen={() => {}}
                                setValue={setSelectedMarketingPersonEmails}
                                setItems={() => {}}
                                theme="LIGHT"
                                zIndex={1000}
                                listMode="SCROLLVIEW"
                                zIndexInverse={3000}
                                style={{ width: wp(80), justifyContent: 'center', alignSelf: 'center', marginHorizontal: wp(10) }}
                                containerStyle={{ width: wp(80), alignSelf: 'center' }}
                                textStyle={{ fontSize: wp(4), color: '#2f2260' }}
                                dropDownContainerStyle={{
                                    borderColor: '#2f2260',
                                    position: 'relative',
                                    top: 0,
                                }}
                            />
                        </View>
                        <Button
                            title="Send Email to Marketing Team"
                            style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]}
                            onPress={sendEmailMarketing}
                        />
                        <Button
                            title="Check Your Order"
                            style={[SendEmailStyle.btn, { top: 0, width: wp(50) }]}
                            onPress={() => navigation.navigate('Testing')}
                        />
                    </View>
                    <CustomModal visible={modalVisible} hideModal={() => setModalVisible(false)}>
                        <InputField
                            placeholder="Enter Email"
                            style={SendEmailStyle.input}
                            placeholderTextColor="#282561"
                            onChangeText={text => modalType === 'marketing' ? setManualMarketingEmailInput(text) : setManualConcernEmailInput(text)}
                            value={modalType === 'marketing' ? manualMarketingEmailInput : manualConcernEmailInput}
                        />
                        <Button
                            title="Add Email"
                            onPress={() => closeModal(modalType)}
                        />
                    </CustomModal>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
