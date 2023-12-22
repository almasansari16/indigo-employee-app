import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppStyles } from '../../theme/AppStyles';
import { dashboardStyles } from './styles';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { Icon, IconType } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from '../../config/config';


export default function Dashboard({ navigation }) {
  // const [roles , setRoles] = useState('');
  
  useEffect(() => {
    const fetchUser = async() => {
      try {
      const data =  await AsyncStorage.getItem("userData");
      console.log(data , "dasgjfvifvfivn")
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser();
  }, [])


  const { user } = useSelector((state) => state.auth.user)
  console.log(user.role, "user..........")
  const roles = user;


  const handleLogout = async () => {

    const token = await AsyncStorage.getItem('accessToken');
    console.log(token, 'token in stack');

    // const navigation = useNavigation();
    try {
      // Fetch the token from wherever it is stored on the client side

      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log(response, "response")
      if (response.ok) {
        // Logout successful
        Alert.alert('Logout successful');
        navigation.navigate('Login')
        // Add any additional logic you want to perform after logout

      } else {
        // Handle logout error
        console.error('Logout failed');

        // Add any error handling logic here
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      // Handle any network or other errors during logout
    }
  };


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
          <Appbar.Action icon="logout" color='#000' onPress={handleLogout} />
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
      </ImageBackground>
    </SafeAreaView>
  );
}
