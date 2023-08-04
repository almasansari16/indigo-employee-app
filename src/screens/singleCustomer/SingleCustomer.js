import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles';
import { SingleCustomerStyle } from './styles';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SingleCustomer({ route }) {
  const [customer, setCustomer] = useState(null); // Initialize customer as null

  useEffect(() => {
    // console.log('Route Params:', route.params); // Check if route params are being received
    const { item } = route.params;
    // console.log('Customer Item:', item); // Check the customer item data
    setCustomer(item);
  }, [route.params]);

  if (!customer) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // console.log('Customer State:', customer); // Check the customer state

  return (
    <SafeAreaView>
      <View
        style={{
          width: 0,
          height: 0,
          flex: 1,
          borderLeftWidth: SCREEN_WIDTH / 2.1,
          borderLeftColor: '#3D3658',
          borderBottomWidth: SCREEN_HEIGHT / 1,
          borderBottomColor: '#3D3658',
          borderRightWidth: SCREEN_WIDTH / 1.3,
          borderRightColor: '#584e7f',
          position: 'relative'
        }}
      />
      <View style={{
        position: "absolute", display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <View style={[AppStyles.center]}>
          <Text style={SingleCustomerStyle.detailText}>Customer Name : {customer.name}</Text>
          <Text style={SingleCustomerStyle.detailText}>Customer Designation : {customer.designation}</Text>
          <Text style={SingleCustomerStyle.detailText}>Customer Email : {customer.email}</Text>
          <Text style={SingleCustomerStyle.detailText}>Customer Address : {customer.address}</Text>
          <Text style={SingleCustomerStyle.detailText}>Customer Contact : {customer.contact}</Text>
        </View>
      </View>
    </SafeAreaView>

  )
}