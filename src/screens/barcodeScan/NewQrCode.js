import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarcodeStyle } from './styles';

export default function NewQrCode({ navigation }) {
    const [hasPermission, setHasPermission] = useState(false);
    const [barcodeValues, setBarcodeValues] = useState([]);
    const [isScanning, setIsScanning] = useState(true); // Track scanning status
    const [key, setKey] = useState(0);


    const devices = useCameraDevices();
    const device = devices.back;
    const barcodeRef = React.useRef(null);
    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    useEffect(() => {
        if (isScanning && barcodes.length > 0) {
            scanCodes();
        }
    }, [barcodes, isScanning]);

    const scanCodes = async () => {
        try {
            const newBarcodeValues = barcodes.map((barcode) => barcode.displayValue);
            const uniqueNewBarcodeValues = Array.from(new Set(newBarcodeValues)); // Remove duplicates
            const updatedBarcodeValues = [...barcodeValues, ...uniqueNewBarcodeValues];

            await AsyncStorage.setItem('barcodeValues', JSON.stringify(updatedBarcodeValues));
            setBarcodeValues(updatedBarcodeValues);

            // setIsScanning(false); // Stop scanning after successful scan
        } catch (error) {
            console.log(error.message);
        }
    }



    const handleScanAgain = () => {
        setIsScanning(true)
        setBarcodeValues([])
        console.log(isScanning, "isscanning")
    }

    return (
        device != null &&
        hasPermission && (
            <SafeAreaView style={BarcodeStyle.container}>
                {console.log('Rendering Camera:', isScanning)}
                {isScanning && (
                    <Camera
                        style={StyleSheet.absoluteFill}
                        device={device}
                        // key={key}
                        frameProcessor={frameProcessor}
                        frameProcessorFps={5}
                        isActive={isScanning}
                        ref={barcodeRef}
                    />
                )}
                <ScrollView>
                    {barcodeValues.map((value, idx) => (

                        <Text key={idx} style={styles.barcodeTextURL}>
                            {value}
                        </Text>

                    ))}
                </ScrollView>
                <View style={[BarcodeStyle.btnView]}>
                    <Button title={'Scan Again'} style={BarcodeStyle.btn} onPress={handleScanAgain} />
                    <Button title={'Final Detail'} style={[BarcodeStyle.btn2]} onPress={() => navigation.navigate('FinalDetail')} />
                </View>
            </SafeAreaView>
        )
    );
}

const styles = StyleSheet.create({
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});
