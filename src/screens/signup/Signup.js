import { View, Text, SafeAreaView, ImageBackground, Image, useColorScheme, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Images from '../../theme/Images'
import { AppStyles } from '../../theme/AppStyles'
import { SignupStyles } from './styles'
import { hp } from '../../../App'
import { InputField } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signup } from '../../store/actions/authActions'
import { useToast } from 'react-native-paper-toast';
import { connect } from 'react-redux'
import axios from 'axios'
function Signup({ isLoading, error, navigation }) {
  
    const [errors, setErrors] = useState("")
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        contact: ''
    });
    const saveData = async () => {
        try {
            await AsyncStorage.setItem("UserName", form.name);
            await AsyncStorage.setItem("UserEmail", form.email);
            await AsyncStorage.setItem("UserPassword", form.password);
            await AsyncStorage.setItem("UserContact", form.contact);
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleSignup = async () => {
        try {
            const response = await axios.post(
              'https://indigo-backend.vercel.app/api/signup',
              form
            );
            console.log('Signup successful:', response.data);
      
            // Optionally, you can navigate to another screen after a successful signup
            navigation.navigate('Login');
          } catch (error) {
            console.error('Signup failed:', error.message);
            // Handle errors or display error messages here
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
                                onChangeText={name => setForm({ ...form, name })}
                                value={form.name}
                                style={SignupStyles.input}
                            />
                            <InputField
                                label={'Email'}
                                placeholder={'Enter your email'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'email'}
                                onChangeText={email => setForm({ ...form, email })}
                                value={form.email}
                                // secureTextEntry={true}
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
                                // secureTextEntry={true}
                                style={SignupStyles.input}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSignup}
                            style={[SignupStyles.signupBtn, SignupStyles.center]}>
                            <Text style={[SignupStyles.btnText]}>
                                Signup
                            </Text>
                        </TouchableOpacity>
                        {/* {error && <Text>{error}</Text>} */}
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
// const mapStateToProps = (state) => ({
//     isLoading: state.isLoading,
//     error: state.error,
// });

// export default connect(mapStateToProps, { signup })(Signup);

export default Signup;