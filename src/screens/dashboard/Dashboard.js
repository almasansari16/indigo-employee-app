import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import { AppStyles } from '../../theme/AppStyles';
import { dashboardStyles } from './styles';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import { Appbar } from 'react-native-paper';

export default function Dashboard({ navigation }) {
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}>
        <Appbar.Header
          style={{
            backgroundColor: '#EEEEEE',
          }}
          theme={{
            colors: {
              backgroundColor: '#D11F27',
              accent: 'white',
              secondary: 'yellow',
            },
          }}>
          <Appbar.BackAction
            animated
            android_ripple
            style={{ color: '#000' }}
            color="#000"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content
            title={"Dashboard"}
            mode="small"
            style={{ color: 'white' }}
            color="black"
          titleStyle={AppStyles.headerText}
          />
        </Appbar.Header>
        <View style={[dashboardStyles.div]}>
          <ScrollView>
            <TouchableOpacity
              style={dashboardStyles.links}
              onPress={() => navigation.navigate('QrCode')}>
              <Text style={[dashboardStyles.linksText]}>Scan QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={dashboardStyles.links}
              onPress={() => navigation.navigate('AddCustomer')}>
              <Text style={[dashboardStyles.linksText]}>Add Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={dashboardStyles.links}
              onPress={() => navigation.navigate('AddCollection')}>
              <Text style={[dashboardStyles.linksText]}>Add Collection</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={dashboardStyles.links}
              onPress={() => navigation.navigate('AllCustomersList')}>
              <Text style={[dashboardStyles.linksText]}>All Customers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={dashboardStyles.links}
              onPress={() => navigation.navigate('AllCollectionList')}>
              <Text style={[dashboardStyles.linksText]}>All Collections</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
