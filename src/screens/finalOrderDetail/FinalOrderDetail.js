import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { hp, wp } from '../../../App';
import { AppStyles } from '../../theme/AppStyles';
import { FinalOrderDetailStyles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, IconType } from '../../components';
import Button from '../../components/Button';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function FinalOrderDetail({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [frontId, setFrontId] = useState('');
    const [scanCode, setScanCode] = useState('');
    const [extraDetailOne, setExtraDetailOne] = useState('');
    const [extraDetailTwo, setExtraDetailTwo] = useState('');
    const [extraDetailThree, setExtraDetailThree] = useState('');
    const [extraDetailFour, setExtraDetailFour] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const name = await AsyncStorage.getItem('CustomerName');
                if (name !== null) {
                    setName(name);
                }
                const email = await AsyncStorage.getItem('CustomerEmail');
                if (email !== null) {
                    setEmail(email);
                }
                const contact = await AsyncStorage.getItem('CustomerContact');
                if (contact !== null) {
                    setContact(contact);
                }
                const address = await AsyncStorage.getItem('CustomerAddress');
                if (address !== null) {
                    setAddress(address);
                }
                const billingAddress = await AsyncStorage.getItem(
                    'CustomerBillingAddress',
                );
                if (billingAddress !== null) {
                    setBillingAddress(billingAddress);
                }
                const frontId = await AsyncStorage.getItem('FrontId');
                if (frontId !== null) {
                    setFrontId(frontId);
                }
                const scanCodes = await AsyncStorage.getItem('barcode');
                if (scanCode !== null) {
                    setScanCode(scanCodes);
                }
                const one = await AsyncStorage.getItem('extraDetail1');
                if (one !== null) {
                    setExtraDetailOne(one);
                }
                const two = await AsyncStorage.getItem('extraDetai2');
                if (two !== null) {
                    setExtraDetailTwo(two);
                }
                const three = await AsyncStorage.getItem('extraDetail3');
                if (three !== null) {
                    setExtraDetailThree(three);
                }
                const four = await AsyncStorage.getItem('extraDetail4');
                if (four !== null) {
                    setExtraDetailFour(four);
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <SafeAreaView>
            <View
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
            }}>
                <View style={[FinalOrderDetailStyles.center]}>
                    <Text style={FinalOrderDetailStyles.heading}>Customer Detail</Text>
                    <View style={[AppStyles.horizontalLine, { width: wp(40) }]} />
                    <View style={FinalOrderDetailStyles.detailView}>
                        <Text style={FinalOrderDetailStyles.detailText}>Name : {name}</Text>
                        <Text style={FinalOrderDetailStyles.detailText}>Email : {email}</Text>
                        <Text style={FinalOrderDetailStyles.detailText}>
                            Address : {address}
                        </Text>
                        <Text style={FinalOrderDetailStyles.detailText}>
                            Billing Address : {billingAddress}
                        </Text>
                        <Text style={FinalOrderDetailStyles.detailText}>
                            Contact : {contact}
                        </Text>
                        <Text style={FinalOrderDetailStyles.detailText}>
                            Front ID : {frontId}
                        </Text>
                        <Text style={FinalOrderDetailStyles.detailText}>
                            Barcode : {scanCode}
                        </Text>

                    </View>
                    <Icon type={IconType.Ionicons} name={'attach-outline'} color='#EEEEEE' size={50} style={FinalOrderDetailStyles.icon} />
                    <View style={FinalOrderDetailStyles.detailView2}>
                        <Text style={FinalOrderDetailStyles.detailText}>ExtraDetai l : {extraDetailOne}</Text>
                        <Text style={FinalOrderDetailStyles.detailText}>ExtraDetai 2 : {extraDetailTwo}</Text>
                        <Text style={FinalOrderDetailStyles.detailText}>ExtraDetai 3 : {extraDetailThree}</Text>
                        <Text style={FinalOrderDetailStyles.detailText}>ExtraDetai 4 : {extraDetailFour}</Text>
                    </View>
                    <View style={FinalOrderDetailStyles.btnView}>
                        {/* <Button title={'Add Extra Detail'} onPress={showModal} style={CustomerDetailStyles.btn} />  */}
                        <Button title={'Next'} onPress={() => navigation.navigate("SendEmail")} style={FinalOrderDetailStyles.btn} />
                    </View>
                </View>

            </View>
        </SafeAreaView>

    )
}