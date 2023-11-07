// // import { View, Text, SafeAreaView, Dimensions, Alert } from 'react-native'
// // import React from 'react'
// // import { AppStyles } from '../../theme/AppStyles';
// // import Button from '../../components/Button';
// // import { SendEmailStyle } from './styles';
// // import Mailer from 'react-native-mail';
// // const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// // export default function SendEmail() {
// //     const handleSendEmail = () => {
// //         const to = ['almashanif126@gamil.com'];
// //         // const cc = ['ccRecipient@example.com'];
// //         // const bcc = ['bccRecipient@example.com'];
// //         const subject = 'Test Email';
// //         const body = 'This is a test email sent from React Native.';

// //         Mailer.mail({ to,  subject, body })
// //         to,subject,body
// //         //   .then(() => {
// //         //     console.log('Email sent successfully!');
// //         //   })
// //         //   .catch((error) => {
// //         //     console.log('Error sending email: ', error);
// //         //   });
// //       };
// //     return (
// //         <SafeAreaView>
// //             <View
// //                 style={{
// //                     width: 0,
// //                     height: 0,
// //                     flex: 1,
// //                     borderLeftWidth: SCREEN_WIDTH / 2.1,
// //                     borderLeftColor: '#3D3658',
// //                     borderBottomWidth: SCREEN_HEIGHT / 1,
// //                     borderBottomColor: '#3D3658',
// //                     borderRightWidth: SCREEN_WIDTH / 1.3,
// //                     borderRightColor: '#584e7f',
// //                     position: 'relative'
// //                 }}
// //             />
// //             <View style={{
// //                 position: "absolute", display: 'flex',
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 alignSelf: 'center',
// //             }}>
// //                 <View style={[AppStyles.center]}>
// //                     <Button 
// //                     title={'Send Email'}
// //                     onPress={handleSendEmail}
// //                     style={[SendEmailStyle.btn]}/>
// //                 </View>
// //             </View>
// //         </SafeAreaView>
// //     )
// // }


// // // import React from 'react';
// // // import { View, Button } from 'react-native';
// // // import Mailer from 'react-native-mail';

// // // const SendEmailScreen = () => {

// // //   const handleSendEmail = () => {
// // //     Mailer.mail({
// // //       subject: 'Test Email',
// // //       recipients: ['recipient1@example.com', 'recipient2@example.com'],
// // //       ccRecipients: ['ccRecipient@example.com'],
// // //       bccRecipients: ['bccRecipient@example.com'],
// // //       body: 'This is a test email sent from React Native.',
// // //       isHTML: false,
// // //     }, (error, event) => {
// // //       if (error) {
// // //         console.log('Error sending email: ', error);
// // //       }
// // //     });
// // //   };

// // //   return (
// // //     <View>
// // //       <Button title="Send Email" onPress={handleSendEmail} />
// // //     </View>
// // //   );
// // // };

// // // export default SendEmailScreen;



// // send-email.js
// // We can use react-native Linking to send email
// import qs from 'qs';
// import { Linking } from 'react-native';
// export default async function sendEmail(to, subject, body, options = {}) {
//     const { cc, bcc } = options;
//     let url = `mailto:${to}`;
//     // Create email link query
//     const query = qs.stringify({
//         subject: subject,
//         body: body,
//         cc: cc,
//         bcc: bcc
//     });
//     if (query.length) {
//         url += `?${query}`;
//     }
//     // check if we can use this link
//     const canOpen = await Linking.canOpenURL(url);
//     if (!canOpen) {
//         throw new Error('Provided URL can not be handled');
//     }
//     return Linking.openURL(url);
// }
// // example.js
// // import { sendEmail } from './send-email';
// // sendEmail(
// //     'elon@spacex.com',
// //        'Can we get there?',
// //     'Elon, here’s one destination you guys should consider [link]',
// //  { cc: 'elon@tesla.com; elon@solarcity.com; elon@stanford.edu' }
// // ).then(() => {
// //     console.log('Your message was successfully sent!');
// // });


import { View, Text, SafeAreaView, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Images from '../../theme/Images';
import { AppStyles } from '../../theme/AppStyles';
import { SendEmailStyle } from './styles';
import Button from '../../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { hp, wp } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/config';
import axios from 'axios';


export default function SendEmail({ navigation }) {
    const emailOptions = [];
    const [email, setEmail] = useState('');
    const [extraNote, setExtraNote] = useState('')
    const [selectedEmail, setSelectedEmail] = useState(emailOptions[0]); // Default to the first option
    const [subject, setSubject] = useState('INDIGO PVT LTD');
    const [data, setData] = useState([])
    const [text, setText] = useState('testing email from application');

    const sendEmailMarketing = async () => {
        const requestData = {
            //   data: data,
            to: selectedEmail,
            subject,
            extraNote: extraNote,
        };

        console.log('Request data:', requestData);

        try {
            const response = await axios.post(`${BASE_URL}/send-email`, requestData);

            console.log('Response:', response.data);
            Alert.alert(response.data.message);
        } catch (error) {
            console.error('Error sending email:', error.message);
            Alert.alert(error.message);
        }
    };


    const selectedOptions = [];
    const [selectedConcernPersonEmail, setSelectedConcernPersonEmail] = useState(selectedOptions[0]);
    const sendEmailConcernPerson = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/customer-email`, {
                to: selectedConcernPersonEmail,
                subject,
                text,
            });

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
        }
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const extraDetail = await AsyncStorage.getItem("Extra Detail")
                console.log(extraDetail)
                setExtraNote(extraDetail)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
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

    const [emailOpen, setEmailOpen] = useState(false);
    const [availableEmails, setvAilableEmails] = useState([
        { label: 'shiraz@indigo.com.pk', value: 'shiraz@indigo.com.pk' },
        { label: 'shakaib@indigo.com.pk', value: 'shakaib@indigo.com.pk' },
        { label: 'sharjeel@indigo.com.pk', value: 'sharjeel@indigo.com.pk' },
        { label: 'iqra.ismail@indigo.com.pk', value: 'iqra.ismail@indigo.com.pk' },
        { label: 'almashanif126@gmail.com', value: 'almashanif126@gmail.com' },
        { label: 'ali.arain@indigo.com.pk', value: 'ali.arain@indigo.com.pk' },


    ]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
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
                                zIndex={1000}
                                zIndexInverse={3000}
                                style={{ width: wp(80), justifyContent: 'center', alignSelf: 'center', marginHorizontal: wp(10) }}
                                containerStyle={{ width: wp(80), alignSelf: 'center' }}
                                textStyle={{ fontSize: wp(4), color: '#2f2260' }}
                            />
                        </View>
                        <Button title={'Send Email Concern Persons'}
                            style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]}
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
                                zIndexInverse={3000}
                                style={{ width: wp(80), justifyContent: 'center', alignSelf: 'center', marginHorizontal: wp(10) }}
                                containerStyle={{ width: wp(80), alignSelf: 'center' }}
                                textStyle={{ fontSize: wp(4), color: '#2f2260' }}

                            />
                        </View>
                        <Button title={'Send Email Marketing Team'}
                            style={[SendEmailStyle.btn, { marginTop: hp(5), width: wp(50) }]}
                            onPress={sendEmailMarketing} />
                        <Button
                            title={"check your order"}
                            style={[SendEmailStyle.btn, { top: 0, width: wp(50) }]}
                            onPress={() => navigation.navigate("Testing")} />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}