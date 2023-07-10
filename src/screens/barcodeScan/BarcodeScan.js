import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { BarcodeStyle } from './styles'
import Images from '../../theme/Images'
import Button from '../../components/Button'

export default function BarcodeScan({navigation}) {
    const handleScanner = () => {
        navigation.navigate("QrCodeScanner")
    }
    const handleNext = () => {
      navigation.navigate("CustomerDetail")
    }
  return (
    <SafeAreaView style={BarcodeStyle.container}>
    <View style={[BarcodeStyle.center]}>
      <View style={[BarcodeStyle.imageDiv]}>
        <Image source={Images.qr_code} style={{width:250, height:350, borderRadius:10}}/>
      </View>
    </View>
    <View style={BarcodeStyle.btnView}>
        <Button title={"Open Scanner"} onPress={handleScanner}/>
        <Button title={"user detail"} onPress={handleNext}/>
      </View>
    </SafeAreaView>
  )
}