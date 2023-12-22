import { View, Text, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles';
import { SingleCollectionStyle } from './styles';
import { hp, wp } from '../../../App';
import Button from '../../components/Button';
import Images from '../../theme/Images';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function SingleCollection({ route, navigation }) {
  const [collection, setCollection] = useState(null); // Initialize customer as null

  useEffect(() => {
    // console.log('Route Params:', route.params); // Check if route params are being received
    const { item } = route.params;
    console.log('Customer Item:', item); // Check the customer item data
    setCollection(item);
  }, [route.params]);

  if (!collection) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // console.log('Customer State:', customer); // Check the customer state
  const createBarcode = () => {
    navigation.navigate('GenerateQRcode', {
      collection
    })
  }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}>

        <Button title={'Create Barcode'}
          style={SingleCollectionStyle.btn}
          onPress={() => createBarcode()} />
        <ScrollView>
          <View style={[AppStyles.center, SingleCollectionStyle.collectionDetail]}>
            <Text style={SingleCollectionStyle.detailText}>Article Name : {collection.ArticleName}</Text>
            <Text style={SingleCollectionStyle.detailText}>IDS : {collection.IDS}</Text>
            <Text style={SingleCollectionStyle.detailText}>Color : {collection.Colour}</Text>
            <Text style={SingleCollectionStyle.detailText}>Finish Type : {collection.FinishType}</Text>
            <Text style={SingleCollectionStyle.detailText}>Weave : {collection.Weave}</Text>

            <View style={{ width: wp(80), alignSelf: 'center', marginTop: 10, borderRadius: 10 }}>
              <Image
                source={collection.Image}
                style={{ resizeMode: 'contain', width: wp(80), height: hp(50), borderRadius: 10 }}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>

  )
}