import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native'
import React from 'react'
import { QrCodeStyle } from './styles'
import Images from '../../theme/Images'
import Button from '../../components/Button'
import { AppStyles } from '../../theme/AppStyles'

export default function QrCode({navigation}) {
  const handleScanner = () => {
    navigation.navigate("Scanner")
  }
  const handleNext = () => {
    navigation.navigate("CustomerDetail")
  }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
        <View style={[QrCodeStyle.center]}>
          <View style={[QrCodeStyle.imageDiv]}>
            <Image source={Images.qr_code} style={{ width: 250, height: 350, borderRadius: 10 }} />
          </View>
        </View>
        <View style={QrCodeStyle.btnView}>
          <Button title={"Open Scanner"} onPress={handleScanner} style={QrCodeStyle.btn} textStyle={QrCodeStyle.btnText}/>
          <Button title={"user detail"} onPress={handleNext} style={QrCodeStyle.btn} textStyle={QrCodeStyle.btnText}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}