
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, DataTable, Text } from 'react-native-paper';
import { View, ImageBackground, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import Button from '../../components/Button';
import { getMeetings } from '../../store/actions/meetingAction';

function CustomerPortal({ navigation }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [meetingData, setMeetingData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meeting.meetings);
  const { user } = useSelector((state) => state.auth.user);

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
      setRefresh(false);
    } else {
      const filteredMeetings = meetings.filter((meeting) =>
        // console.log(meeting.concernPersonId , "..............")
        meeting.concernPersonId.map((person) => person.email).includes(user.email)
      );
      setMeetingData(filteredMeetings);
    }
  }, [dispatch, meetings, refresh, user.email]);

  const handleDetail = (meeting) => {
    console.log(meeting)
    navigation.navigate('OrderDetailForCustomer', {
      meeting,
    });
  };
  // console.log(meetingData , "meeting data")
  return (
    <SafeAreaView>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}
      >
        <ScrollView style={{ marginBottom: hp(15) }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#EEEEEE',
              marginTop: hp(2),
              marginBottom: hp(2),
            }}
          >
            {user.name} Order's Data
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                Brand Name
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              Employee Name
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                Meeting Date
              </DataTable.Title>
            </DataTable.Header>
            {meetingData && meetingData.map(({_id, brandId, emailRecipient, meetingDate, userId , codes,}) => {
           
               const userName = userId?.name || 'N/A';
              return (
                <DataTable.Row key={_id} onPress={() => handleDetail({ _id })}>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE' }}>
                    {brandId?.brandName || 'N/A'}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE' }}>
                    {userName}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE' }}>
                    {new Date(meetingDate).toLocaleDateString() || 'N/A'}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}

          </DataTable>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  meetings: state.fetchMeeting.meetings,
  loading: state.fetchMeeting.loading,
  error: state.fetchMeeting.error,
});

export default connect(mapStateToProps, { getMeetings })(CustomerPortal);
