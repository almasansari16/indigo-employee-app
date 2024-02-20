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
import { LoginStyle } from './styles';
import Images from '../../theme/Images';
import { Icon, IconType, InputField } from '../../components';
import { hp, wp } from '../../../App';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { login } from '../../store/actions/authActions'
import { connect, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
// mock server functions
const verifyUserCredentials = payload => {
    // make an HTTP request to the server and verify user credentials
    return { userId: '123456' };
};

const sendPublicKeyToServer = publicKey => {
    // make an HTTP request to the server and save the `publicKey` on the user's entity
    console.log({ publicKey });
};

const verifySignatureWithServer = async ({ signature, payload }) => {
    // make an HTTP request to the server and verify the signature with the public key.

    return { status: 'success' };
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function Login({ navigation, login }) {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const { loading, user, error } = useSelector((state) => state.auth);
    console.log(error, "error")
    console.log(loading, "loading")


    const [errors, setError] = useState(null);

    const handleSignin = async () => {
        try {
            // Check if any field is empty
            if (email === "" || password === "") {
                Alert.alert("Fields can't be empty");
                return;
            }

            // Wait for the signup operation to complete
            const result = await login(email, password);

            // Log the result to the console for debugging
            console.log("login result:", result);

            // Check if the result has a msg property indicating success
            if (result.msg === "login sucessfully") {
                Alert.alert('login sucessfully');
                navigation.navigate('TabNavigation');
            } else {
                // Handle the error case
                // Alert.alert("Error", result.msg);
                Alert.alert('Error', result.error)
            }

            console.log("After login: ", email, password, result.msg);
        } catch (caughtError) {
            console.error("Error during login:", caughtError);
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
            <FastImage
             source={Images.purple_background}
            //   source={{
            //     uri: Images.purple_background,
            //     priority: FastImage.priority.high
            // }} 
             style={{ flex: 1 }}
             resizeMode={FastImage.resizeMode.cover}>
                <Spinner visible={loading} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={[LoginStyle.center, { marginTop: hp(10) }]}>
                            <Image source={Images.Logo} />
                            <Text style={LoginStyle.text}>Login</Text>
                            <View style={[LoginStyle.horizontalLine]} />
                        </View>
                        <View style={[LoginStyle.center, { marginTop: hp(5) }]}>
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
                        </View>
                        <TouchableOpacity
                            onPress={handleSignin}
                            style={[LoginStyle.loginBtn, LoginStyle.center]}>
                            <Text style={[LoginStyle.btnText]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={async () => {
                                const { userId } = await verifyUserCredentials(form);

                                // handle onPress
                                const rnBiometrics = new ReactNativeBiometrics();

                                const { available, biometryType } =
                                    await rnBiometrics.isSensorAvailable();

                                if (available && biometryType === BiometryTypes.FaceID) {
                                    Alert.alert(
                                        'Face ID',
                                        'Would you like to enable Face ID authentication for the next time?',
                                        [
                                            {
                                                text: 'Yes please',
                                                onPress: async () => {
                                                    const { publicKey } = await rnBiometrics.createKeys();

                                                    await sendPublicKeyToServer(publicKey);

                                                    // save `userId` in the local storage to use it during Face ID authentication
                                                    await AsyncStorage.setItem('userId', userId);
                                                },
                                            },
                                            { text: 'Cancel', style: 'cancel' },
                                        ],
                                    );
                                }
                            }}></TouchableOpacity>
                        <TouchableOpacity
                            onPress={async () => {
                                const rnBiometrics = new ReactNativeBiometrics();
                                const { available, biometryType } =
                                    await rnBiometrics.isSensorAvailable();

                                if (!available || biometryType !== BiometryTypes.FaceID) {
                                    Alert.alert('Oops!', 'Face ID is not available on this device.');
                                    return;
                                }

                                const userId = await AsyncStorage.getItem('userId');

                                if (!userId) {
                                    Alert.alert(
                                        'Oops!',
                                        'You have to sign in using your credentials first to enable Face ID.',
                                    );
                                    return;
                                }

                                const timestamp = Math.round(
                                    new Date().getTime() / 1000,
                                ).toString();
                                const payload = `${userId}__${timestamp}`;

                                const { success, signature } = await rnBiometrics.createSignature({
                                    promptMessage: 'Sign in',
                                    payload,
                                });

                                if (!success) {
                                    Alert.alert(
                                        'Oops!',
                                        'Something went wrong during authentication with Face ID. Please try again.',
                                    );
                                    return;
                                }

                                const { status, message } = await verifySignatureWithServer({
                                    signature,
                                    payload,
                                });

                                if (status !== 'success') {
                                    Alert.alert('Oops!', message);
                                    return;
                                }

                                Alert.alert('Success!', 'You are successfully authenticated!');
                            }}
                            style={[LoginStyle.loginBtn, LoginStyle.center]}>
                            <Text style={[LoginStyle.btnText]}>Face Scan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[LoginStyle.center]}
                            onPress={() => navigation.navigate('Signup')}>
                            <Text style={LoginStyle.linkText}>
                                If you dont have account <Text style={LoginStyle.boldText}>Signup here</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </FastImage>
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
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);