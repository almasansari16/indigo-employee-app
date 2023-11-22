import { View, Text, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppStyles } from '../../theme/AppStyles'
import Images from '../../theme/Images'
import { AdminPortalStyles } from './styles'

export default function AdminPortal({navigation}) {
  return (
    <SafeAreaView style={[AppStyles.container]}>
        <ImageBackground  source={Images.purple_background} style={{ flex: 1 }}>
            <ScrollView>
            <TouchableOpacity
                    style={AdminPortalStyles.links}
                    onPress={() => navigation.navigate('AllEmployeeData')}>
                    <Text style={[AdminPortalStyles.linksText]}>All Employees</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={AdminPortalStyles.links}
                    onPress={() => navigation.navigate('AllOrderData')}>
                    <Text style={[AdminPortalStyles.linksText]}>Orders Data</Text>
                  </TouchableOpacity>
                 
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
  )
}