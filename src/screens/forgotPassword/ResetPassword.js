import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';
import FastImage from 'react-native-fast-image';
import Images from '../../theme/Images';
import { ForgotPasswordStyle } from './styles';
import { InputField } from '../../components';
import { hp, wp } from '../../../App';

const ResetPassword = ({ route, navigation }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = route.params; // Receive token from navigation params

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/reset/${token}`, { password, confirmPassword });
            Alert.alert('Success', response.data.message);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'An error occurred, please try again.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FastImage
                source={Images.purple_background}
                style={{ flex: 1 }}
                resizeMode={FastImage.resizeMode.cover}
            >
                <View style={styles.container}>
                    <Image source={Images.Logo} />
                    <Text style={styles.title}>Reset Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#EEEEEE'}
                        placeholder="Enter new password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#EEEEEE'}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </FastImage>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        marginTop: hp(3),
        fontFamily: 'Lato-Regular',
    },
    input: {
        height: 60,
        width: wp(80),
        color: '#EEEEEE',
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: wp(10),
        paddingHorizontal: wp(5),
        marginVertical: hp(2),
        fontFamily: 'Lato-Regular',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    btn: {
        width: wp(50),
        height: hp(6),
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(2),
      },
      btnText: {
        color: '#EEEEEE',
        textAlign: 'center',
        fontSize: hp(2),
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
      },
});

export default ResetPassword;
