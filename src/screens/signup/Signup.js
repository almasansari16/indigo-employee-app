import { View, Text, SafeAreaView, ImageBackground, Image, useColorScheme, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import Images from '../../theme/Images';
import { AppStyles } from '../../theme/AppStyles';
import { SignupStyles } from './styles';
import { hp } from '../../../App';
import { InputField } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { signup } from '../../store/actions/authActions'
import { connect } from 'react-redux';


function Signup({ navigation, signup, loading, error }) {
    console.log(error, "error.........")
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('')
    const [success, setSuccess] = useState(false)
    // const { isLoading, register } = useContext(AuthContext);
    // const saveData = async () => {
    //     try {
    //         await AsyncStorage.setItem("UserName", form.name);
    //         await AsyncStorage.setItem("UserEmail", form.email);
    //         await AsyncStorage.setItem("UserPassword", form.password);
    //         await AsyncStorage.setItem("UserContact", form.contact);
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
    const handleSignup = async () => {
        await signup(name, email, password, contact);

        if (!error) {
           setSuccess(true)
           navigation.navigate('Login')
        }
    }
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <Spinner visible={loading} />
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
                                placeholder={'Enter your fullname'}
                                placeholderTextColor={'#EEEEEE'}
                                onChangeText={text => setName(text)}
                                value={name}
                                style={SignupStyles.input}
                            />
                            <InputField
                                label={'Email'}
                                placeholder={'Enter your email'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'email'}
                                onChangeText={text => setEmail(text)}
                                value={email}
                                style={SignupStyles.input}
                            />
                            <InputField
                                label={'Password'}
                                placeholder={'Enter your password'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'password'}
                                onChangeText={text => setPassword(text)}
                                value={password}
                                secureTextEntry={true}
                                style={SignupStyles.input}
                            />
                            <InputField
                                label={'Contact'}
                                placeholder={'Enter your contact'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'number-pad'}
                                onChangeText={text => setContact(text)}
                                value={contact}
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
const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
  });

const mapDispatchToProps = {
    signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);


