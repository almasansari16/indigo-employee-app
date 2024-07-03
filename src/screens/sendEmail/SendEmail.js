
import { View, Text, SafeAreaView, ImageBackground, Alert, ScrollView, TextInput } from 'react-native';
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
    const emailOptions = [];
    const [email, setEmail] = useState('');
    const [extraNote, setExtraNote] = useState('')
    const [selectedEmail, setSelectedEmail] = useState(emailOptions[0]); // Default to the first option
    const [subject, setSubject] = useState('INDIGO PVT LTD');
    const [data, setData] = useState([])
    const [text, setText] = useState('testing email from application');
    const [manuallyEnteredEmails, setManuallyEnteredEmails] = useState([]);
    const [manualEmailInput, setManualEmailInput] = useState('');

    const [manuallyEnteredEmails2, setManuallyEnteredEmails2] = useState([]);
    const [manualEmailInput2, setManualEmailInput2] = useState('');



    const sendEmailMarketing = async () => {
        const allEmails = [...selectedEmail, ...manuallyEnteredEmails];
        const requestData = {
            data: data,
            to: allEmails,
            subject,
            extraNote: extraNote,
        };

        console.log('Request data:>>>>>>>', requestData);

        try {
            const response = await axios.post(`${BASE_URL}/marketing-email`, requestData);

            console.log('Response:', response.data);
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error sending email:', error.message);
            Alert.alert(error.message);
        }
    };

    const sendEmailConcernPerson = async () => {
        const allEmails = [...selectedCustomerEmails, ...manuallyEnteredEmails2];

        const requestData = {
            data: data,
            to: allEmails,
            subject,
            text
        };
        console.log('Request data customer eamil:>>>>>>>', requestData);
        try {
            const response = await axios.post(`${BASE_URL}/customer-email`, requestData);

            // Handle success (e.g., show a success message)
            console.log('Email sent successfully:', response.data.message);
            Alert.alert(response.data.message)
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error sending email:', error);
            Alert.alert(error.message)
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = await AsyncStorage.getItem('ConcernPerson Emails');
                if (email !== null) {
                    const concernPersonsEmails = JSON.parse(email);
                    setEmail(concernPersonsEmails); // Store the emails array directly
                    console.log(email, "emails........")
                }

            } catch (error) {
                console.log(error)
            }
        };

        const fetchExtraNote = async () => {
            try {
                const extraDetail = await AsyncStorage.getItem("Extra Detail")
                console.log(extraDetail)
                setExtraNote(extraDetail)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        fetchExtraNote();
    }, []);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const extraDetail = await AsyncStorage.getItem("Extra Detail")
    //             console.log(extraDetail)
    //             setExtraNote(extraDetail)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchData()
    // }, []);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const codesData = await AsyncStorage.getItem('ScanCodes');
    //             if (codesData !== null) {
    //                 // We have data!!
    //                 const newArr = JSON.parse(codesData);
    //                 setData(newArr)
    //                 console.log(newArr , 'codes.........')
    //             }
    //         } catch (error) {
    //             // Error retrieving data
    //             console.log(error, 'error')
    //         }
    //     }
    //     fetchData()
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const codesData = await AsyncStorage.getItem('ScanCodes');
                if (codesData !== null) {
                    // We have data!!
                    const newArr = JSON.parse(codesData);

                    // Remove the 'images' array from each item in newArr
                    const newArrWithoutImages = newArr.map(item => {
                        const { _id, images, date, Image, ...itemWithoutImages } = item;
                        return itemWithoutImages;
                    });

                    setData(newArrWithoutImages);
                    console.log(newArrWithoutImages, 'codes.........');
                }
            } catch (error) {
                // Error retrieving data
                console.log(error, 'error');
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (email) {
            const emailObjects = email.map(emailValue => ({
                label: emailValue,
                value: emailValue,
            }));
            setCustomerEmails(emailObjects);
            //   setSelectedCustomerEmails(email); // Set the default selected emails
        }
    }, [email]);

    const [emailopen, setEmailopen] = useState(false);
    const [customerEmails, setCustomerEmails] = useState([
    ]);
    const [selectedCustomerEmails, setSelectedCustomerEmails] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [availableEmails, setvAilableEmails] = useState([
        { label: 'shiraz@indigo.com.pk', value: 'shiraz@indigo.com.pk' },
        { label: 'shakaib@indigo.com.pk', value: 'shakaib@indigo.com.pk' },
        { label: 'faisal.liaquat@indigo.com.pk', value: 'faisal.liaquat@indigo.com.pk' },
        { label: 'shariq.usmani@indigo.com.pk', value: 'shariq.usmani@indigo.com.pk' },
        { label: 'jawwad.khalil@indigo.com.pk', value: 'jawwad.khalil@indigo.com.pk' },
        { label: 'ahsan.haq@indigo.com.pk', value: 'ahsan.haq@indigo.com.pk' },
        { label: 'sultan@indigo.com.pk', value: 'sultan@indigo.com.pk' },
        { label: 'ateeb.azam@indigo.com.pk', value: 'ateeb.azam@indigo.com.pk' },
        { label: 'sharjeel@indigo.com.pk', value: 'sharjeel@indigo.com.pk' },
        { label: 'faraz@indigo.com.pk', value: 'faraz@indigo.com.pk' },
        { label: 'm.daniyal@indigo.com.pk', value: 'm.daniyal@indigo.com.pk' },
        { label: 'syeda.eesha@indigo.com.pk', value: 'syeda.eesha@indigo.com.pk' },
        { label: 'ahsan@indigo.com.pk', value: 'ahsan@indigo.com.pk' },
        { label: 'iqra.ismail@indigo.com.pk', value: 'iqra.ismail@indigo.com.pk' },
        { label: 'ali.arain@indigo.com.pk', value: 'ali.arain@indigo.com.pk' },
        { label: 'bilal@indigo.com.pk', value: 'bilal@indigo.com.pk' },
        { label: 'haseeb@indigo.com.pk', value: 'haseeb@indigo.com.pk' },
        { label: 'm.hammad@indigo.com.pk', value: 'm.hammad@indigo.com.pk' },
        { label: 'aamir.shaikh@indigo.com.pk', value: 'aamir.shaikh@indigo.com.pk' },
        { label: 'gul.nayab@indigo.com.pk', value: 'gul.nayab@indigo.com.pk' },
        { label: 'sumaiya.ali@indigo.com.pk', value: 'sumaiya.ali@indigo.com.pk' },
        { label: 'almashanif126@gmail.com', value: 'almashanif126@gmail.com' }

    ]);
    const [selectedEmails, setSelectedEmails] = useState([]);


    const opneModal1 = () => {

        setModalVisible(true)

    };
    const opneModal2 = () => {

        setModalVisible2(true)

    }
    const closeModal = async () => {
        if (manualEmailInput && !manuallyEnteredEmails.includes(manualEmailInput)) {
            setManuallyEnteredEmails([...manuallyEnteredEmails, manualEmailInput]);
            setManualEmailInput('');
        }
        setModalVisible(false);
    };
    const closeModal2 = async () => {
        if (manualEmailInput2 && !manuallyEnteredEmails2.includes(manualEmailInput2)) {
            setManuallyEnteredEmails2([...manuallyEnteredEmails2, manualEmailInput2]);
            setManualEmailInput2('');
        }
        setModalVisible2(false)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={[AppStyles.center]}>


                        <View style={SendEmailStyle.view}>
                            <View
                                style={{ zIndex: 2000 }}>
                                <DropDownPicker
                                    placeholder={'Select Concern Persons Email'}
                                    open={emailopen}
                                    value={selectedCustomerEmails}
                                    items={customerEmails}
                                    multiple={true}
                                    setOpen={setEmailopen}
                                    setValue={setSelectedCustomerEmails}
                                    setItems={setCustomerEmails}
                                    theme="LIGHT"
                                    listMode='SCROLLVIEW'
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
                                title={"Add Email Manually customer"}
                                style={[SendEmailStyle.btn, { width: wp(80), marginTop: 10 }]}
                                onPress={opneModal2}
                            />
                            <Button title={'Send Email Concern Persons'}
                                style={[SendEmailStyle.btn, { width: wp(80) }]}
                                onPress={sendEmailConcernPerson} />
                            <View
                                style={{ zIndex: 1000, marginTop: hp(5) }}>
                                <DropDownPicker
                                    placeholder={'Select Marketing Person Email'}
                                    open={emailOpen}
                                    value={selectedEmails}
                                    items={availableEmails}
                                    multiple={true}
                                    setOpen={setEmailOpen}
                                    setValue={setSelectedEmails}
                                    onChangeValue={(itemValue) => setSelectedEmail(itemValue)}
                                    setItems={setvAilableEmails}
                                    theme="LIGHT"
                                    zIndex={1000}
                                    listMode='SCROLLVIEW'
                                    maxHeight={500}
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
                                title={"Add Email Manually marketing person"}
                                style={[SendEmailStyle.btn, { width: wp(80), marginTop: 10 }]}
                                onPress={opneModal1}
                            />
                            <Button title={'Send Email Marketing Team'}
                                style={[SendEmailStyle.btn, { width: wp(80) }]}
                                onPress={sendEmailMarketing} />
                            <View>
                                <Button
                                    title={"check your order"}
                                    style={[SendEmailStyle.btn, { width: wp(80), alignSelf: 'center' }]}
                                    onPress={() => navigation.navigate("Testing")} />
                            </View>

                        </View>
                        <View>
                            <CustomModal visible={modalVisible} hideModal={closeModal}>
                                <TextInput placeholder={'Enter Marketing Person Email'}
                                    style={SendEmailStyle.input}
                                    placeholderTextColor={'#282561'}
                                    onChangeText={(text) => setManualEmailInput(text)}
                                    value={manualEmailInput}
                                />
                                <Button title={'Add Email'}
                                    onPress={closeModal} />
                            </CustomModal>
                        </View>

                        <View>
                            <CustomModal visible={modalVisible2} hideModal={closeModal2}>
                                <TextInput placeholder={'Enter new customer email'}
                                    style={SendEmailStyle.input}
                                    placeholderTextColor={'#282561'}
                                    onChangeText={(text) => setManualEmailInput2(text)}
                                    value={manualEmailInput2}
                                />
                                <Button title={'Add Email'}
                                    onPress={closeModal2} />
                            </CustomModal>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}