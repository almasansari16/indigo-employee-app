
import { View, Text, SafeAreaView, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles'
import Images from '../../theme/Images'
import { hp, wp } from '../../../App'
import { SingleCollectionStyle } from '../singleCollection/styles'
import { getMeeting } from '../../store/actions/meetingAction'
import { connect, useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../config/apiConfig'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper';


function OrderDetailForCustomer({ navigation, route }) {
    const [meetingId, setmeetingId] = useState(null); // Initialize customer as null
    const [orderDetail, setOrderDetail] = useState(null); // Initialize customer
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        // console.log('Route Params:', route.params); // Check if route params are being received
        const { meeting } = route.params;
        // console.log('Customer meeting:', meeting); // Check the customer meeting data
        setmeetingId(meeting._id);
    }, [route.params]);
    // console.log(meetingId, "id.........")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/meeting/${meetingId}`)
                // console.log( 'response ..........',response.data)
                setOrderDetail(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [meetingId]);

    console.log('order detail ', orderDetail)
    // const { brandId, emailRecipient, meetingDate, userId, extraNote, codes } = orderDetail;

    if (!orderDetail) {
        return (
            <SafeAreaView style={[AppStyles.container]}>
                <ImageBackground source={Images.purple_background}
                    style={{ width: wp(100), height: hp(100) }}>
                    <ActivityIndicator color='#EEEEEE' size="large" style={[AppStyles.center]} />
                </ImageBackground>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
                <View style={[AppStyles.center, SingleCollectionStyle.collectionDetail]}>
                    <Text style={SingleCollectionStyle.detailText}>Brand Name : {orderDetail && orderDetail.brandId.brandName || 'N/A'}</Text>
                    <Text style={SingleCollectionStyle.detailText}>Concern persons : {orderDetail && orderDetail.emailRecipient.map(person => person).join(', ')}</Text>

                    <Text style={SingleCollectionStyle.detailText}>Meeting Date : {new Date(orderDetail.meetingDate).toLocaleDateString() || 'N/A'}</Text>
                    <Text style={SingleCollectionStyle.detailText}>Employee name : {orderDetail && orderDetail.userId.name || 'N/A'}</Text>
                    <Text style={SingleCollectionStyle.detailText}>Extra Note : {orderDetail.extraNote}</Text>
                </View>

                <ScrollView>

                    {orderDetail && orderDetail.codes.map((item, index) => (
                        <>
                            {console.log(item.images[0], "item")}
                            <View style={[AppStyles.center, SingleCollectionStyle.garmentDetail]}>
                                <Text key={index} style={SingleCollectionStyle.detailText}>Article Name : {item.ArticleName}</Text>
                                <Image
                                    source={{ uri: item.images[0] }}
                                    style={{ resizeMode: 'contain', width: wp(70), height: hp(40), borderRadius: 10 }} />
                            </View>
                        </>
                    ))}
                </ScrollView>

            </ImageBackground>
        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({
    meeting: state.meeting.meeting,
    loading: state.meeting.loading,
    error: state.meeting.error, // Assuming your reducer updates the "error" property
});

export default connect(mapStateToProps, { getMeeting })(OrderDetailForCustomer);




