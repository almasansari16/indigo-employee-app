
import {
    View,
    Text,
    useColorScheme,
    SafeAreaView,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppStyles } from '../../theme/AppStyles';
import { LoginStyle } from '../login/styles';
import Images from '../../theme/Images';
import { InputField , Icon , IconType} from '../../components';
import { hp, wp } from '../../../App';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { login, signup } from '../../store/actions/authActions'
import { connect, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

function Signup({ navigation, signup }) {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [success, setSuccess] = useState(false)
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [items, setItems] = useState([
        { label: 'User', value: 'user' },
        { label: 'Employee', value: 'employee' }
    ]);
    const [errors, setError] = useState(null);
     // State variable to track password visibility 
     const [showPassword, setShowPassword] = useState(false);

     // Function to toggle the password visibility state 
     const toggleShowPassword = () => {
         setShowPassword(!showPassword);
     };
    console.log(error, "error")
    console.log(loading, "loading")
    console.log(name, email, password, contact, role);

    const { loading, user, error } = useSelector((state) => state.auth);
    console.log(error, "error")
    console.log(loading, "loading")


const handleSignup = async () => {
    try {
        // Check if any field is empty
        if (email === "" || password === "") {
            Alert.alert("Fields can't be empty");
            return;
        }

        // Wait for the signup operation to complete
        const result = await signup(name, email, password, contact, role);

        // Log the result to the console for debugging
        console.log("Signup result:", result);

        // Check if the result has a msg property indicating success
        if (result.msg === "your account has been created") {
            Alert.alert('your account has been created');
            navigation.navigate('Login');
        } else {
            // Handle the error case
            // Alert.alert("Error", result.msg);
            Alert.alert('Error' , result.error)
        }

        console.log("After signup: ", email, password, result.msg);
    } catch (caughtError) {
        console.error("Error during signup:", caughtError);
    }
};
    
    
    
    




    return (
        // <KeyboardAvoidingView>
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View
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
                }}> */}
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <Spinner visible={loading} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={[LoginStyle.center, { marginTop: hp(10) }]}>
                            <Image source={Images.Logo} />
                            <Text style={LoginStyle.text}>Signup</Text>
                            <View style={[LoginStyle.horizontalLine]} />
                        </View>
                        <View style={[LoginStyle.center, { marginTop: hp(5) }]}>
                            <InputField
                                label={'Full Name'}
                                placeholder={'Enter your name'}
                                placeholderTextColor={'#EEEEEE'}
                                onChangeText={text => setName(text)}
                                value={name}
                                style={LoginStyle.input}
                            />
                            <InputField
                                label={'Email'}
                                placeholder={'Enter your email'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                onChangeText={text => setEmail(text)}
                                value={email}
                                style={LoginStyle.input}
                            />
                            <InputField
                                label={'Password'}
                                placeholder={'Enter your password'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'password'}
                                onChangeText={text => setPassword(text)}
                                value={password}
                                secureTextEntry={!showPassword}
                                style={LoginStyle.input}
                                icon={
                                    <TouchableOpacity onPress={toggleShowPassword}>
                                        {showPassword ? <Icon type={IconType.Ionicons} name={'eye'} size={20} color='#EEEEEE'/> 
                                        : <Icon type={IconType.Ionicons} name={'eye-off'} size={20} color='#EEEEEE'/>}
                                    </TouchableOpacity>
                                }
                            />
                            <InputField
                                label={'Contact'}
                                placeholder={'Enter your phone number'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType={'number-pad'}
                                onChangeText={text => setContact(text)}
                                value={contact}
                                style={LoginStyle.input}
                            />
                            <DropDownPicker
                                placeholder='Select Role'
                                open={open}
                                value={role}
                                items={items}
                                setOpen={setOpen}
                                setValue={setRole}
                                setItems={setItems}
                                zIndex={1000}
                                listMode='SCROLLVIEW'
                                zIndexInverse={3000}
                                style={{
                                    width: wp(80),
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    marginHorizontal: wp(10),
                                    borderRadius: wp(10)
                                }}
                                containerStyle={{ width: wp(80), alignSelf: 'center', borderRadius: wp(10) }}
                                textStyle={{ fontSize: wp(4), color: '#2f2260' }}

                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSignup}
                            style={[LoginStyle.loginBtn, LoginStyle.center]}>
                            <Text style={[LoginStyle.btnText]}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[LoginStyle.center]}
                            onPress={() => navigation.navigate('Login')}>
                            <Text style={[LoginStyle.linkText]}>
                                If you have already account <Text style={LoginStyle.boldText}>Login</Text>  here
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
            {/* </View> */}
        </SafeAreaView>
        // </KeyboardAvoidingView>
    );
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
});

const mapDispatchToProps = {
    signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

