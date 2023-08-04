import { View, Text, SafeAreaView, Dimensions, Alert } from 'react-native'
import React from 'react'
import { AppStyles } from '../../theme/AppStyles';
import Button from '../../components/Button';
import { SendEmailStyle } from './styles';
import Mailer from 'react-native-mail';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SendEmail() {
    const handleSendEmail = () => {
        const to = ['almashanif126@gamil.com'];
        // const cc = ['ccRecipient@example.com'];
        // const bcc = ['bccRecipient@example.com'];
        const subject = 'Test Email';
        const body = 'This is a test email sent from React Native.';
    
        Mailer.mail({ to,  subject, body })
        to,subject,body
        //   .then(() => {
        //     console.log('Email sent successfully!');
        //   })
        //   .catch((error) => {
        //     console.log('Error sending email: ', error);
        //   });
      };
    return (
        <SafeAreaView>
            <View
                style={{
                    width: 0,
                    height: 0,
                    flex: 1,
                    borderLeftWidth: SCREEN_WIDTH / 2.1,
                    borderLeftColor: '#3D3658',
                    borderBottomWidth: SCREEN_HEIGHT / 1,
                    borderBottomColor: '#3D3658',
                    borderRightWidth: SCREEN_WIDTH / 1.3,
                    borderRightColor: '#584e7f',
                    position: 'relative'
                }}
            />
            <View style={{
                position: "absolute", display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
            }}>
                <View style={[AppStyles.center]}>
                    <Button 
                    title={'Send Email'}
                    onPress={handleSendEmail}
                    style={[SendEmailStyle.btn]}/>
                </View>
            </View>
        </SafeAreaView>
    )
}


// import React from 'react';
// import { View, Button } from 'react-native';
// import Mailer from 'react-native-mail';

// const SendEmailScreen = () => {

//   const handleSendEmail = () => {
//     Mailer.mail({
//       subject: 'Test Email',
//       recipients: ['recipient1@example.com', 'recipient2@example.com'],
//       ccRecipients: ['ccRecipient@example.com'],
//       bccRecipients: ['bccRecipient@example.com'],
//       body: 'This is a test email sent from React Native.',
//       isHTML: false,
//     }, (error, event) => {
//       if (error) {
//         console.log('Error sending email: ', error);
//       }
//     });
//   };

//   return (
//     <View>
//       <Button title="Send Email" onPress={handleSendEmail} />
//     </View>
//   );
// };

// export default SendEmailScreen;
