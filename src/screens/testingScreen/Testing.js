
import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Text,
} from 'react-native';
import { ActivityIndicator, DataTable, Searchbar } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMeetingsByUserId } from '../../store/actions/fetchMeetingsByUserAction';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';

function Testing({ fetchMeetingsByUserId, navigation }) {
  const [userId, setUserId] = useState("");
  const [meetingData, setMeetingData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([6]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const dispatch = useDispatch();
  const meeting = useSelector((state) => state.fetchMeeting.meetings);
  const { user } = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const parsedData = JSON.parse(userData);
        const { _id } = parsedData;
        setUserId(_id);
      } catch (error) {
        console.log("Error parsing the data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMeetingsByUser = async () => {
      try {
        await fetchMeetingsByUserId(userId);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (meeting.length === 0 || refresh) {
      fetchMeetingsByUser();
      setRefresh(false); // Reset refresh flag
    } else {
      setMeetingData(meeting);
    }
  }, [dispatch, meeting, userId, refresh]);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await fetchMeetingsByUserId(userId);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDetail = (meeting) => {
    navigation.navigate("orderDetail", {
      meeting
    });
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredMeetingData = meetingData.filter(
    (meeting) =>
      meeting.brandId.brandName.toLowerCase().includes(searchText.toLowerCase()) ||
      meeting.concernPersonId.some(person => person.name.toLowerCase().includes(searchText.toLowerCase())) ||
      new Date(meeting.meetingDate).toLocaleDateString().toLowerCase().includes(searchText.toLowerCase())
  );

  const from = page * itemsPerPage;
  const to = meetingData.length > 0 ? Math.min((page + 1) * itemsPerPage, meetingData.length) : 0;
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <SafeAreaView>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}
      >
        <View>
          <Searchbar
            placeholder="Search..."
            mode="view"
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          style={{ marginBottom: hp(15) }}
        >
          {filteredMeetingData.length > 0 ? (
            <DataTable>
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
              {filteredMeetingData.map((meeting) => {
                const {
                  _id: meetingId,
                  brandId: { brandName },
                  concernPersonId,
                  meetingDate
                } = meeting;
                let dateString = new Date(meetingDate).toLocaleDateString();
                return (
                  <DataTable.Row key={meetingId} onPress={() => handleDetail(meeting)}>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 5 }}>
                      {brandName}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }}>
                      {concernPersonId.map(person => person.name).join(', ')}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }}>
                      {dateString}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          ) : (
            <ActivityIndicator color='#EEEEEE' size="large" />
          )}
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(meetingData.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${meetingData.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          style={{
            color: 'white',
            // backgroundColor: 'red',
            fontSize: 40,
            marginBottom: hp(10)
          }}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}

        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  meetings: state.fetchMeeting.meetings,
  loading: state.fetchMeeting.loading,
  error: state.fetchMeeting.error,
});

export default connect(mapStateToProps, { fetchMeetingsByUserId })(Testing);
