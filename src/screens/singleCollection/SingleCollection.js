import { View, Text, SafeAreaView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles';
import { SingleCollectionStyle } from './styles';
import { hp, wp } from '../../../App';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function SingleCollection({route}) {
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
            <View style={{marginTop:hp(5)}}>
                <Image source={customer.img} style={{width:wp(80), height:hp(22)}}/>
            </View>
          <View style={[AppStyles.center]}>
            <Text style={SingleCollectionStyle.detailText}>Article Name : {customer.articleName}</Text>
            <Text style={SingleCollectionStyle.detailText}>IDS : {customer.ids}</Text>
            <Text style={SingleCollectionStyle.detailText}>Color : {customer.color}</Text>
            <Text style={SingleCollectionStyle.detailText}>Finish Type : {customer.finishType}</Text>
            <Text style={SingleCollectionStyle.detailText}>Weave : {customer.weave}</Text>
          </View>
        </View>
      </SafeAreaView>
  
    )
}