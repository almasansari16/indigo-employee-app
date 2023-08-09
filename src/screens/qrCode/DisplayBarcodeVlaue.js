import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QrCodeStyle } from './styles';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function DisplayBarcodeVlaue() {
    const [barcodeValue, setBarcodeValue] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const barcodeVal = await AsyncStorage.getItem('garmentScan');
                if (barcodeValue !== null) {
                    setBarcodeValue(barcodeVal);
                }
            } catch (error) {

            }
        }
        fetchData()
    }, [])
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
                <View style={QrCodeStyle.detailText}>
                    {barcodeValue}
                </View>
            </View>
        </SafeAreaView>
    )
}