import { View, Text, SafeAreaView, ImageBackground, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../../theme/Images'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jestConfig from '../../../jest.config';
import { FinalDetailStyle } from './styles';
import { AppStyles } from '../../theme/AppStyles';
import { IconInput } from '../../components';
import Button from '../../components/Button';
import { hp, wp } from '../../../App';

export default function FinalDetail({ navigation }) {
    const [barcodesValue, setBarcodeValues] = useState([])
    const [customer, setCustomer] = useState(null)
    const retrieveStoredValues = async () => {
        try {
            const storedValues = await AsyncStorage.getItem('barcodeValues');
            if (storedValues !== null) {
                setBarcodeValues(JSON.parse(storedValues));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    console.log(barcodesValue, "kmvcksdmvkd")
    const [brandName, setBrandName] = useState('');

    const [selectedPersons, setSelectedPersons] = useState([]);



    const fetchSelectedPersons = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('SelectedConcernPersons');
            console.log('Retrieved JSON:', jsonValue); // Check the retrieved JSON string
            const storedSelectedPersons = JSON.parse(jsonValue);
            console.log('Parsed Selected Persons:', storedSelectedPersons); // Check the parsed array
            setSelectedPersons(storedSelectedPersons);
            console.log(selectedPersons, "selected statr")
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchSelectedPersons();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandName = await AsyncStorage.getItem('BrandName');
                if (brandName !== null) {
                    setBrandName(brandName);
                }
                // const name = await AsyncStorage.getItem('name');
                // if (name !== null) {
                //     setName(name);
                // }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        retrieveStoredValues();
    }, []);
    const [extraDetail, setExtraDetail] = useState({
        extraDetail1: '',
        extraDetail2: '',
        extraDetail3: '',
        extraDetail4: '',
    });

    const [validation, setValidation] = useState({});

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('extraDetail1', extraDetail.extraDetail1);
            await AsyncStorage.setItem('extraDetail2', extraDetail.extraDetail2);
            await AsyncStorage.setItem('extraDetail3', extraDetail.extraDetail3);
            await AsyncStorage.setItem('extraDetail4', extraDetail.extraDetail4);

        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSave = () => {
        saveData()
        navigation.navigate('SendEmail', { customer });
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={AppStyles.center}>
                        <Text style={FinalDetailStyle.heading}>Customer Detail</Text>
                        <View style={FinalDetailStyle.detailView}>

                            <View>
                                <Text style={FinalDetailStyle.detailText}>Brand Name: {brandName}</Text>
                                {selectedPersons.map((person, index) => (
                                    <>
                                        <Text style={FinalDetailStyle.detailText}
                                            key={index}>
                                            {`${index + 1} ) Concern Person: ${person.name}`}
                                        </Text>
                                        <Text style={FinalDetailStyle.detailText}
                                            key={index}>
                                            {`${person.email}`}
                                        </Text>
                                    </>
                                ))}
                            </View>

                        </View>
                        <Text style={FinalDetailStyle.heading}>Garment Selections</Text>
                        <View style={FinalDetailStyle.detailView}>
                            {barcodesValue && (
                                <View>
                                    {barcodesValue.map((i) => (
                                        <>
                                            <Text style={FinalDetailStyle.detailText}>{i}</Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#2f2260',
                                                marginVertical: 10,
                                            }} />
                                        </>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={[FinalDetailStyle.detailView2, { height: hp(40) }]}>
                            <Text style={[FinalDetailStyle.heading,
                            { color: '#282561', marginTop: -5 }]}>Note Option</Text>
                            <ScrollView>
                                <TextInput
                                    placeholder='Add extra detail'
                                    multiline={true}
                                    placeholderTextColor={'#2f2260'}
                                    numberOfLines={4}
                                    style={{ width: wp(90) }}
                                />
                            </ScrollView>
                        </View>
                        <Button title={'Save'} style={FinalDetailStyle.btn} onPress={handleSave} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}