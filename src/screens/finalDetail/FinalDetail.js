import { View, Text, SafeAreaView, ImageBackground, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../../theme/Images'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jestConfig from '../../../jest.config';
import { FinalDetailStyle } from './styles';
import { AppStyles } from '../../theme/AppStyles';
import { IconInput, Table } from '../../components';
import Button from '../../components/Button';
import { hp, wp } from '../../../App';
import { createMeeting } from '../../store/actions/meetingAction';
import { connect, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../config/config';

function FinalDetail({ navigation, createMeeting }) {
    const { user } = useSelector((state) => state.auth.user);
    // console.log(user._id, "////////////")
    const [userId, setUserId] = useState('');
    const [concernPersonId, setConcernPersonId] = useState('');
    const [barcodesValue, setBarcodeValues] = useState([]);
    const [customer, setCustomer] = useState(null)
    const [extraDetail, setExtraDetail] = useState("")
    const [meetingData, setMeetingData] = useState({
        brandId: "",
        concernPersonId: [],
        emailRecipient: [],
        userId: "",
        extraNote: "",
        codes: []
    })
    console.log(extraDetail, "extra detail....")
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
    const [brandName, setBrandName] = useState('');

    const [selectedPersons, setSelectedPersons] = useState([]);

    useEffect(() => {
        setUserId(user._id)
        console.log("state", userId)
    }, [])

    const fetchSelectedPersons = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('SelectedConcernPersons');
            console.log('Retrieved JSON:', jsonValue); // Check the retrieved JSON string
            const storedSelectedPersons = JSON.parse(jsonValue);
            console.log('Parsed Selected Persons..:', storedSelectedPersons); // Check the parsed array
            setSelectedPersons(storedSelectedPersons);
            console.log(selectedPersons, "selected person")
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
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        retrieveStoredValues();
    }, []);
    useEffect(async () => {
        await AsyncStorage.getItem("brandID")
            .then((id) => {
                console.log(id, "id.........");

                setMeetingData((meetingData) => ({
                    ...meetingData,
                    brandId: id,
                }));
            })
            .catch((error) => {
                // Handle errors here
                console.log(error);
            });
        await AsyncStorage.getItem("SelectedConcernPersons")
            .then((person) => {
                if (person !== null) {
                    const parsedPersons = JSON.parse(person);
                    const ids = parsedPersons.map(person => person._id);
                    const personsName = parsedPersons.map(personName => personName.name);
                    console.log("Person IDs:", ids, personsName);
                    setConcernPersonId(ids);
                    setMeetingData((meetingData) => ({
                        ...meetingData,
                        concernPersonId: ids,
                        emailRecipient: personsName
                    }));
                }
            })
            .catch((err) => {
                console.log(err);
            });
        await AsyncStorage.getItem("userData")
            .then((userData) => {
                try {
                    const parsedData = JSON.parse(userData);
                    const { _id, } = parsedData;
                    // console.log("User ID:", _id);
                    setMeetingData((meetingData) => ({
                        ...meetingData,
                        userId: _id,
                        extraNote: extraDetail
                    }));
                } catch (error) {
                    console.log("Error parsing the data:", error);
                };
                try {
                    const codes = barcodesValue.map((jsonString) => JSON.parse(jsonString))
                        .filter((data, index, self) => {
                            // Use JSON.stringify to compare objects as strings
                            const jsonString = JSON.stringify(data);
                            return index === self.findIndex((d) => JSON.stringify(d) === jsonString);
                        })
                    setMeetingData((meetingData) => ({
                        ...meetingData,
                        codes: codes
                    }));
                } catch (error) {
                    console.log("Error parsing the data:", error);
                }
            })
            .catch((error) => {
                // Handle errors here
                console.log(error);
            });

    }, []);

    // console.log(barcodesValue, "barcodes value selection.....")

    const handleSaveMeeting = async () => {

        try {
            await AsyncStorage.setItem("Extra Detail", extraDetail)
        } catch (error) {
            console.log(error)
        }
        const updatedMeetingData = { ...meetingData, extraNote: extraDetail };
        console.log(updatedMeetingData, "meeting data before sending in api")
        createMeeting(updatedMeetingData)
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
                                    {barcodesValue
                                        .map((jsonString) => JSON.parse(jsonString))
                                        .filter((data, index, self) => {
                                            // Use JSON.stringify to compare objects as strings
                                            const jsonString = JSON.stringify(data);
                                            return index === self.findIndex((d) => JSON.stringify(d) === jsonString);
                                        })
                                        .map((data, index) => (

                                            <View key={index}>
                                                <Text style={FinalDetailStyle.detailText}>Article Name: {data.ArticleName}</Text>
                                                <Text style={FinalDetailStyle.detailText}>IDS: {data.IDS}</Text>
                                                <Text style={FinalDetailStyle.detailText}>Finish Type: {data.FinishType}</Text>
                                                <Text style={FinalDetailStyle.detailText}>Weave: {data.Weave}</Text>
                                                <View
                                                    style={{
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: '#2f2260',
                                                        marginVertical: 10,
                                                    }}
                                                />
                                                {/* {console.log(data , "jfvncifsvncifsvnc")} */}
                                            </View>
                                        ))}
                                </View>
                            )}


                        </View>
                        <View>
                            {/* <Table data={data}/> */}
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
                                    value={extraDetail}
                                    onChangeText={text => setExtraDetail(text)}
                                    style={{ width: wp(90), color: '#2f2260' }}
                                />
                            </ScrollView>
                        </View>
                        <Button title={'Save'} style={FinalDetailStyle.btn} onPress={handleSaveMeeting} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({
    meetings: state.meeting.meetings, // Assuming your reducer updates the "brands" property
    loading: state.meeting.loading, // Assuming your reducer updates the "loading" property
    error: state.meeting.error, // Assuming your reducer updates the "error" property
});

const mapDispatchToProps = {
    createMeeting, // This makes the createBrand action available as a prop
};
export default connect(mapStateToProps, mapDispatchToProps)(FinalDetail);