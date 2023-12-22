import { View, Text, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppStyles } from '../../theme/AppStyles';
import Images from '../../theme/Images';
import { connect, useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { getMeetings } from '../../store/actions/meetingAction';

function AllOrderData({navigation }) {
    const [meetingData, setMeetingData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
    const meetings = useSelector((state) => state.meeting.meetings);
    // console.log(meetings)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getMeetings());
            } catch (error) {
                console.error(error);
            }
        };

        if (meetings.length === 0 || refresh) {
            fetchData();
            setRefresh(false)
        } else {
            setMeetingData(meetings);
            //   setFilteredItems(userdata)
        }
    }, [dispatch, meetings, refresh]);

    //   const data =  meetingData.map((item)=> item.brandId)
    //   console.log( data.map((item)=> item) , "oevjovovfo")
    // console.log(meetingData, "meeting data")


    const handleDetail = (meeting) => {
        console.log(meeting)
        navigation.navigate("OrderDetailAdmin", {
            meeting
        })
        // console.log(meeting , "detail of meeting...")
    }



    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <View >
                    <ScrollView>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                                    Brand Name
                                </DataTable.Title>
                                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                                    Concern Person
                                </DataTable.Title>
                                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                                    Meeting Date
                                </DataTable.Title>
                            </DataTable.Header>
                            {meetingData && meetingData.map(({ _id, brandId, emailRecipient, meetingDate, userId , codes, extraNote}) => (
                                <DataTable.Row key={_id}
                                    onPress={() => handleDetail({ _id})}>
                                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }}>
                                        {brandId && brandId.brandName}
                                    </DataTable.Cell >
                                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }}>
                                        {emailRecipient && emailRecipient.join(', ')}
                                    </DataTable.Cell>
                                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }}>
                                        {new Date(meetingDate).toLocaleDateString()}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </ScrollView>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    meetings: state.fetchMeeting.meetings,
    loading: state.fetchMeeting.loading,
    error: state.fetchMeeting.error, // Assuming your reducer updates the "error" property
});

// Connect your component to the Redux store
export default connect(mapStateToProps, { getMeetings })(AllOrderData);




