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
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { Icon, IconType } from '../../components';

export default function Dashboard({ navigation }) {
  const { user } = useSelector((state) => state.auth.user)
  console.log(user.role, "user..........")
  const roles = user;

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

        {
          roles.role === 'admin'
            ?
            <View style={[AppStyles.center]}>
              <Text style={[dashboardStyles.headerText]}>
                welcome {'\n'} to {'\n'} Admin Dashboard
              </Text>
              <Button 
              title={"Next"}
              style={[dashboardStyles.Button]}
              onPress={() => navigation.navigate('AdminPortal')}
              // icon={<Icon name='arrow-right' type={IconType.FontAwesome5} size={30} color='#fff'/>}
              />
            </View>

            : roles.role === 'employee'
              ?
              <View style={[dashboardStyles.div]}>
                <ScrollView>
                  <TouchableOpacity
                    style={dashboardStyles.links}
                    onPress={() => navigation.navigate('QrCode')}>
                    <Text style={[dashboardStyles.linksText]}>Scan QR Code</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={dashboardStyles.links}
                    onPress={() => navigation.navigate('Testing')}>
                    <Text style={[dashboardStyles.linksText]}>My Orders</Text>
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
              : <TouchableOpacity
                style={dashboardStyles.links}
                onPress={() => navigation.navigate('CustomerPortal')}>
                <Text style={[dashboardStyles.linksText]}>My Orders</Text>
              </TouchableOpacity>
        }


        {/* 
        {user.role === "employee" ? (
          <View style={[dashboardStyles.div]}>
            <ScrollView>
              <TouchableOpacity
                style={dashboardStyles.links}
                onPress={() => navigation.navigate('QrCode')}>
                <Text style={[dashboardStyles.linksText]}>Scan QR Code</Text>
              </TouchableOpacity>
              <TouchableOpacity style={dashboardStyles.links}
                onPress={() => navigation.navigate('Testing')}>
                <Text style={[dashboardStyles.linksText]}>My Orders</Text>
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
        ) : (
          <TouchableOpacity
            style={dashboardStyles.links}
            onPress={() => navigation.navigate('CustomerPortal')}>
            <Text style={[dashboardStyles.linksText]}>My Orders</Text>
          </TouchableOpacity>
        )} */}
      </ImageBackground>
    </SafeAreaView>
  );
}
