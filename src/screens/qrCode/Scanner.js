import * as React from 'react';

import {Alert, StyleSheet, Text, View} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {
  useScanBarcodes,
  BarcodeFormat,
  scanBarcodes,
} from 'vision-camera-code-scanner';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QrCodeScanner({navigation}) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanCode , setScanCode] = React.useState('')
  // const [barcodes, setBarcodes] = React.useState('')
  const devices = useCameraDevices();
  const device = devices.back;
  const barcodeRef = React.useRef(null);
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
console.log(barcodes ,"barcodes.......")
  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    if (barcodes.length > 0) {
      scanCodes();
    }
  }, [barcodes]);
const scanCodes = async() => {
  setScanCode(barcodes)
  try {
   // Assuming each barcode in barcodes array is an object
   const barcodeData = barcodes.map((barcode) => barcode.displayValue);

  await AsyncStorage.setItem('garmentScan', JSON.stringify(barcodeData));
    navigation.navigate("DisplayBarcodeVlaue")
  } catch (error) {
    console.log(error.message)
  }
}


  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
          ref={barcodeRef}
        />
        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
            {/* {Alert.alert('Barcode value', barcode.displayValue, [
              {
                text: 'Cancel',
                onPress: () => console.log("cancel"),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => navigation.navigate("CustomerDetail")},
            ])} */}
          </Text>
        ))}
        <View>
          <Button title={'ok'} onPress={scanCodes}/>
        </View>

        {/* <View>
          <Button title={'ok'} onPress={getscanCodes}/>
        </View> */}
      </>
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