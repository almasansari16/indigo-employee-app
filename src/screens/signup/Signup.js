import { View, Text, SafeAreaView, ImageBackground, Image, useColorScheme, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import Images from '../../theme/Images';
import { AppStyles } from '../../theme/AppStyles';
import { SignupStyles } from './styles';
import { hp, wp } from '../../../App';
import { InputField } from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';
import { signup } from '../../store/actions/authActions'
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

function Signup({ navigation, signup, loading, error }) {
    console.log(error, "error.........")
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('')
    const [success, setSuccess] = useState(false)
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [items, setItems] = useState([
        { label: 'User', value: 'user' },
        { label: 'Employee', value: 'employee' }
    ]);
    const handleSignup = async () => {
        // console.log(name , email , password , contact , role)
        await signup(name, email, password, contact , role);

        if (!error) {
            setSuccess(true)
            navigation.navigate("Login")
        }

        
    }

 
    // console.log(role , "role")
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
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
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
const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
});

const mapDispatchToProps = {
    signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);


