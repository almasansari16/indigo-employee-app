import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native'
import React from 'react'
import { BarcodeStyle } from './styles'
import Images from '../../theme/Images'
import Button from '../../components/Button'
import { AppStyles } from '../../theme/AppStyles'

export default function BarcodeScan({ navigation }) {
  const handleScanner = () => {
    navigation.navigate("QrCodeScanner")
  }
  const handleNext = () => {
    navigation.navigate("CustomerDetail")
  }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
        <View style={[BarcodeStyle.center]}>
          <View style={[BarcodeStyle.imageDiv]}>
            <Image source={Images.qr_code} style={{ width: 250, height: 350, borderRadius: 10 }} />
          </View>
        </View>
        <View style={BarcodeStyle.btnView}>
          <Button title={"Open Scanner"} onPress={handleScanner} style={BarcodeStyle.btn} textStyle={BarcodeStyle.btnText}/>
          <Button title={"user detail"} onPress={handleNext} style={BarcodeStyle.btn} textStyle={BarcodeStyle.btnText}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}