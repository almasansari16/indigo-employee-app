import { View, Text, SafeAreaView, ImageBackground, Image, useColorScheme, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Images from '../../theme/Images'
import { AppStyles } from '../../theme/AppStyles'
import { SignupStyles } from './styles'
import { hp } from '../../../App'
import { InputField } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Signup({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    // const backgroundStyle = {
    //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // };
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        contact: ''
    });
const saveData = async() => {
    try {
       await AsyncStorage.setItem("UserName" , form.fullName);
       await AsyncStorage.setItem("UserEmail" , form.email);
       await AsyncStorage.setItem("UserPassword" , form.password);
       await AsyncStorage.setItem("UserContact" , form.contact);
    } catch (error) {
        console.log(error.message)
    }
}
    const handleSignin = () => {
        if (form.email == '' || form.password == '' || form.fullName == '' || form.contact == '') {
            Alert.alert('fill the input fields');
        } else {
            // Alert.alert('Signin Sucessfully');
            saveData()
            navigation.navigate('Login');

        }
    };
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={[SignupStyles.center, { marginTop: hp(10) }]}>
                            <Image source={Images.Logo} />
                            <Text style={SignupStyles.text}>Signup</Text>
                            <View style={[SignupStyles.horizontalLine]} />
                        </View>
                        <View style={[SignupStyles.center, { marginTop: hp(5) }]}>
                            <InputField
                                label={'Full Name'}
                                placeholder={'Enter your full name'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'email-address'}
                                onChangeText={fullName => setForm({ ...form, fullName })}
                                value={form.fullName}
                                style={SignupStyles.input}
                            />
                            <InputField
                                label={'Email'}
                                placeholder={'Enter your email'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'email'}
                                onChangeText={email => setForm({ ...form, email })}
                                value={form.email}
                                secureTextEntry={true}
                                style={SignupStyles.input}
                            />
                            <InputField
                                label={'Password'}
                                placeholder={'Enter your password'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'password'}
                                onChangeText={password => setForm({ ...form, password })}
                                value={form.password}
                                secureTextEntry={true}
                                style={SignupStyles.input}
                            />
                            <InputField
                                label={'Contact'}
                                placeholder={'Enter your contact'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'contact'}
                                onChangeText={contact => setForm({ ...form, contact })}
                                value={form.contact}
                                secureTextEntry={true}
                                style={SignupStyles.input}
                            />
                        </View>
                        <TouchableOpacity
                        onPress={handleSignin}
                        style={[SignupStyles.signupBtn, SignupStyles.center]}>
                            <Text style={[SignupStyles.btnText]}>
                                Signup
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate("Login")}
                        style={[SignupStyles.center]}>
                            <Text style={[SignupStyles.linkText]}>
                                If you have already account <Text style={SignupStyles.boldText}>Login</Text>  here
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>

    )
}