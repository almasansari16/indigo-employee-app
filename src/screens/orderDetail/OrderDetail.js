import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles'
import Images from '../../theme/Images'
import { hp, wp } from '../../../App'
import { SingleCollectionStyle } from '../singleCollection/styles'

export default function OrderDetail({ route }) {
    const [collection, setCollection] = useState(null); // Initialize customer as null

    useEffect(() => {
        // console.log('Route Params:', route.params); // Check if route params are being received
        const { meeting } = route.params;
        console.log('Customer meeting:', meeting); // Check the customer meeting data
        setCollection(meeting);
    }, [route.params]);

    if (!collection) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    const { brandId, concernPersonId, meetingDate, userId , extraNote , codes} = collection;

    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
                <View style={[AppStyles.center, SingleCollectionStyle.collectionDetail]}>
                    <Text style={SingleCollectionStyle.detailText}>Brand Name : {brandId.brandName}</Text>
                    <Text style={SingleCollectionStyle.detailText}>Concern persons : {concernPersonId.map(person => person.name).join(', ')}</Text>

                    <Text style={SingleCollectionStyle.detailText}>Meeting Date : { new Date(meetingDate).toLocaleDateString()}</Text>
                    <Text style={SingleCollectionStyle.detailText}>Employee name : {userId.name}</Text>
                    <Text style={SingleCollectionStyle.detailText}>Extra Note : {extraNote}</Text>
                    {codes.map((item) => (
                    <Text style={SingleCollectionStyle.detailText}>Article Name : {item.ArticleName}</Text>
                    ))}

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}