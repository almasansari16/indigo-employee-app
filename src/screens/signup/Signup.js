import { View, Text, SafeAreaView, ImageBackground, Image, useColorScheme, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import Images from '../../theme/Images';
import { AppStyles } from '../../theme/AppStyles';
import { SignupStyles } from './styles';
import { hp, wp } from '../../../App';
import { InputField } from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';
import { signup } from '../../store/actions/authActions'
import { connect, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

// function Signup({ navigation, signup }) {

//     const { loading, user, error } = useSelector((state) => state.auth);

//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [contact, setContact] = useState('')
//     const [success, setSuccess] = useState(false)
//     const [open, setOpen] = useState(false);
//     const [role, setRole] = useState('');
//     const [items, setItems] = useState([
//         { label: 'User', value: 'user' },
//         { label: 'Employee', value: 'employee' }
//     ]);
//     const [errors, setError] = useState(null);
//     console.log(error, "error")
//     console.log(loading, "loading")
//     console.log(name , email , password , contact , role);


//     const handleSignup = async () => {
//         try {
//             // Check if any field is empty
//             if (email === "" || password === "" || name === "" || contact === "" || role === "") {
//                 Alert.alert("Fields can't be empty");
//                 return; // Exit the function early
//             }

//             // Wait for the signup operation to complete
//             await signup(name, email, password, contact, role);

//             // Now that the signup operation is complete, update the error state
//             const currentError = error;  // Save the error before updating state
//             console.log(currentError , "current error")
//             setError(currentError);

//             console.log("After signup: ", name, email, password, contact, role, currentError);

//             if (currentError === null) {
//                 Alert.alert('Successful');
//                 navigation.navigate('Login');
//             } else {
//                 Alert.alert("Error", currentError);
//             }
//         } catch (caughtError) {
//             console.error("Error during signup:", caughtError);
//         }
//     };




//     console.log(errors, "error.........")

//     // console.log(role , "role")
//     return (
//         <SafeAreaView style={[AppStyles.container]}>
//             <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
//                 <Spinner visible={loading} />
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     <View>
//                         <View style={[SignupStyles.center, { marginTop: hp(10) }]}>
//                             <Image source={Images.Logo} />
//                             <Text style={SignupStyles.text}>Signup</Text>
//                             <View style={[SignupStyles.horizontalLine]} />
//                         </View>
//                         <View style={[SignupStyles.center, { marginTop: hp(5), marginBottom: hp(5) }]}>
//                             <TextInput
//                                 placeholder={'Enter your Name'}
//                                 placeholderTextColor={'#EEEEEE'}
//                                 onChangeText={text => setName(text)}
//                                 value={name}
//                                 style={SignupStyles.input}
//                             />
//                             <TextInput
//                                 placeholder={'Enter your Email'}
//                                 placeholderTextColor={'#EEEEEE'}
//                                 autoCapitalize={'none'}
//                                 keyboardType='email-address'
//                                 onChangeText={text => setEmail(text)}
//                                 value={email}
//                                 style={SignupStyles.input}
//                             />
//                             <TextInput
//                                 placeholder={'Enter your Password'}
//                                 placeholderTextColor={'#EEEEEE'}
//                                 onChangeText={text => setPassword(text)}
//                                 value={password}
//                                 secureTextEntry={true}
//                                 style={SignupStyles.input}
//                             />
//                             <TextInput
//                                 placeholder={'Enter your contact'}
//                                 placeholderTextColor={'#EEEEEE'}
//                                 keyboardType='number-pad'
//                                 onChangeText={text => setContact(text)}
//                                 value={contact}
//                                 style={SignupStyles.input}
//                             />
//                             <DropDownPicker
//                                 placeholder='Select Role'
//                                 open={open}
//                                 value={role}
//                                 items={items}
//                                 setOpen={setOpen}
//                                 setValue={setRole}
//                                 setItems={setItems}
//                                 zIndex={1000}
//                                 listMode='SCROLLVIEW'
//                                 zIndexInverse={3000}
//                                 style={{
//                                     width: wp(80),
//                                     justifyContent: 'center',
//                                     alignSelf: 'center',
//                                     marginHorizontal: wp(10),
//                                     borderRadius: wp(10)
//                                 }}
//                                 containerStyle={{ width: wp(80), alignSelf: 'center', borderRadius: wp(10) }}
//                                 textStyle={{ fontSize: wp(4), color: '#2f2260' }}

//                             />
//                         </View>
//                         <TouchableOpacity
//                             onPress={handleSignup}
//                             style={[SignupStyles.signupBtn, SignupStyles.center]}>
//                             <Text style={[SignupStyles.btnText]}>
//                                 Signup
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             onPress={() => navigation.navigate("Login")}
//                             style={[SignupStyles.center]}>
//                             <Text style={[SignupStyles.linkText]}>
//                                 If you have already account <Text style={SignupStyles.boldText}>Login</Text>  here
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </ImageBackground>
//         </SafeAreaView>

//     )
// }
// const mapStateToProps = (state) => ({
//     loading: state.auth.loading,
//     error: state.auth.error,
// });

// const mapDispatchToProps = {
//     signup,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);



const Signup = () => {

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
    const [errors, setError] = useState(null);
    // const { loading, user, error } = useSelector((state) => state.auth);
    console.log(name , email , password , contact , role);
    const handleSignup = () => {
        Alert.alert("signup")
    }

    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                {/* <Spinner visible={loading} /> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={[SignupStyles.center, { marginTop: hp(10) }]}>
                            <Image source={Images.Logo} />
                            <Text style={SignupStyles.text}>Signup</Text>
                            <View style={[SignupStyles.horizontalLine]} />
                        </View>
                        <View style={[SignupStyles.center, { marginTop: hp(5), marginBottom: hp(5) }]}>
                            <TextInput
                                placeholder={'Enter your Name'}
                                placeholderTextColor={'#EEEEEE'}
                                onChangeText={text => setName(text)}
                                value={name}
                                style={SignupStyles.input}
                            />
                            <TextInput
                                placeholder={'Enter your Email'}
                                placeholderTextColor={'#EEEEEE'}
                                autoCapitalize={'none'}
                                keyboardType='email-address'
                                // onChangeText={text => setEmail(text)}
                                value={email}
                                style={SignupStyles.input}
                            />
                            <TextInput
                                placeholder={'Enter your Password'}
                                placeholderTextColor={'#EEEEEE'}
                                // onChangeText={text => setPassword(text)}
                                value={password}
                                secureTextEntry={true}
                                style={SignupStyles.input}
                            />
                            <TextInput
                                placeholder={'Enter your contact'}
                                placeholderTextColor={'#EEEEEE'}
                                keyboardType='number-pad'
                                // onChangeText={text => setContact(text)}
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

export default Signup

