import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles'
import LinearGradient from 'react-native-linear-gradient'
import AddConcernPersonStyle from './styles'
import { Icon, IconInput, IconType } from '../../components'
import Button from '../../components/Button'
import { createConcernPerson } from '../../store/actions/concernPersonAction'
import { connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../config/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

function AddConcernPerson({ createConcernPerson, navigation }) {
    const [brandID, setBrandID] = useState("");
    const [concernPerson, setConcernPerson] = useState({
        name: '',
        email: '',
        designation: '',
        brandID: '', // Initialize it as an empty string
    });

    useEffect(() => {
        AsyncStorage.getItem("brandID")
          .then((id) => {
            console.log(id, "id.........");
            setBrandID(id);
      
            // Update concernPerson with the retrieved brandID
            setConcernPerson((prevConcernPerson) => ({
              ...prevConcernPerson,
              brandID: id,
            }));
          })
          .catch((error) => {
            // Handle errors here
            console.log(error);
          });
      }, []);
      

    const handleCreateConcernPerson = async () => {
        console.log(concernPerson, "function");
        createConcernPerson(concernPerson);
        navigation.navigate('SingleCustomer')
        
    };


    return (
        <SafeAreaView style={[AppStyles.container]}>
            <LinearGradient
                colors={['#ba6b4d', '#f9f1da', '#ba6b4d']}
                style={{ flex: 1 }}
                start={{ x: 0.3, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View>
                    <Text style={AddConcernPersonStyle.subHeading}>Add New Concern Person Detail</Text>
                    <IconInput
                        icon={
                            <Icon
                                type={IconType.Ionicons}
                                name={'location-outline'}
                                color="#282561"
                                style={{ margin: 15 }}
                            />
                        }
                        placeholder={'Name'}
                        placeholderTextColor={'#282561'}
                        onChangeText={name => setConcernPerson({ ...concernPerson, name })}
                        value={concernPerson.name}
                        style={AddConcernPersonStyle.input}
                    // error={validation.address}
                    />
                    <IconInput
                        icon={
                            <Icon
                                type={IconType.Ionicons}
                                name={'location-outline'}
                                color="#282561"
                                style={{ margin: 15 }}
                            />
                        }
                        placeholder={'Email'}
                        placeholderTextColor={'#282561'}
                        onChangeText={email => setConcernPerson({ ...concernPerson, email })}
                        value={concernPerson.email}
                        style={AddConcernPersonStyle.input}
                    // error={validation.address}
                    />
                    <IconInput
                        icon={
                            <Icon
                                type={IconType.Ionicons}
                                name={'location-outline'}
                                color="#282561"
                                style={{ margin: 15 }}
                            />
                        }
                        placeholder={'Designation'}
                        placeholderTextColor={'#282561'}
                        onChangeText={designation => setConcernPerson({ ...concernPerson, designation })}
                        value={concernPerson.designation}
                        style={AddConcernPersonStyle.input}
                    // error={validation.address}
                    />
                    <Button title={'Save'}
                        style={[AddConcernPersonStyle.modalbtn]}
                        textStyle={{ color: '#EEEEEE' }}
                        onPress={handleCreateConcernPerson}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    concernPersons: state.concernPerson.concernPersons, // Assuming your reducer updates the "brands" property
    loading: state.concernPerson.loading, // Assuming your reducer updates the "loading" property
    error: state.concernPerson.error, // Assuming your reducer updates the "error" property
});

const mapDispatchToProps = {
    createConcernPerson, // This makes the createBrand action available as a prop
};
export default connect(mapStateToProps, mapDispatchToProps)(AddConcernPerson);