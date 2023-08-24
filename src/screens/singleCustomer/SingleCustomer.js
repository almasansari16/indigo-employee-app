import { View, Text, SafeAreaView, Dimensions, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles';
import { SingleCustomerStyle } from './styles';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { hp } from '../../../App';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SingleCustomer({ route, navigation }) {
  const [customer, setCustomer] = useState(null); // Initialize customer as null

  useEffect(() => {
    console.log('Route Params:', route.params); // Check if route params are being received
    const { item } = route.params;
    console.log('Customer Item:', item); // Check the customer item data
    setCustomer(item);
    // console.log(customer.concernPersons, "concern person")
  }, [route.params]);

  if (!customer) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  const { brandName, concernPersons } = customer;

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("BrandName", customer.brandName)
      const emails = concernPersons.map(person => person.email);
      await AsyncStorage.setItem("ConcernPerson Emails" , JSON.stringify(emails))
      navigation.navigate("NewQrCode")
      // await AsyncStorage.setItem("name", customer.name)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <SafeAreaView>
      <ImageBackground source={Images.purple_background}>
        <View style={AppStyles.center}>

          <View style={[AppStyles.center]}>
            <Text style={SingleCustomerStyle.brandName}>Brand Name : {customer.brandName}</Text>
          </View>
          <ScrollView style={{ marginVertical: hp(3) }} showsVerticalScrollIndicator={false}>
            {concernPersons.map((person, index) => (
              <View key={index} style={SingleCustomerStyle.personView}>
                <Text style={SingleCustomerStyle.detailText}>Name: {person.name}</Text>
                <Text style={SingleCustomerStyle.detailText}>Email: {person.email}</Text>
                <Text style={SingleCustomerStyle.detailText}>Designation: {person.designation}</Text>
              </View>
            ))}
          </ScrollView>
          <Button title={"Scan Code"}
            onPress={handleSave} style={SingleCustomerStyle.btn} />
        </View>
      </ImageBackground>
    </SafeAreaView>

  )
}