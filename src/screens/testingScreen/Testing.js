// import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Table } from '../../components'
// import Images from '../../theme/Images';
// import { fetchMeetingsByUserId } from '../../store/actions/fetchMeetingsByUserAction';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { ActivityIndicator, DataTable } from 'react-native-paper';
// import { hp, wp } from '../../../App';
// import Button from '../../components/Button';

// function Testing({ fetchMeetingsByUserId, navigation }) {
//     const [userId, setUserId] = useState("");
//     const [meetingData, setMeetingData] = useState([])
//     const [refresh, setRefresh] = useState(false);
//     const dispatch = useDispatch();
//     const meeting = useSelector((state) => state.fetchMeeting.meetings);
//     const { user } = useSelector((state) => state.auth.user)
//     console.log(user.name, "user.....")
//     // console.log(meeting, "meeting")

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const userData = await AsyncStorage.getItem("userData");
//                 const parsedData = JSON.parse(userData);
//                 const { _id } = parsedData;
//                 // console.log("User ID:", _id);
//                 setUserId(_id);
//             } catch (error) {
//                 console.log("Error parsing the data:", error);
//             }
//         }

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const fetchMeetingsByUser = async () => {
//             try {
//                 const response = await fetchMeetingsByUserId(userId);
//                 console.log(response, "response");
//             } catch (error) {
//                 console.log(error.message);
//             }
//         }
//         if (meeting.length === 0) {
//             fetchMeetingsByUser();
//         } else {
//             setMeetingData(meeting)
//         }
//     }, [dispatch, meeting, userId, refresh]);
//     // console.log(meetingData.map((meeting) => (meeting.userId.name)), "meeting data.......");
// useEffect(() => {
//     setRefresh(!refresh)
// },[meetingData])
//     return (
//         <SafeAreaView>
//             <ImageBackground
//                 source={Images.purple_background}
//                 style={{ width: wp(100), height: hp(100) }}>
//                 {/* <View style={{ marginTop: 0 }}>
//                     <Searchbar
//                         placeholder="Search..."
//                         mode="view"
//                         onChangeText={handleSearch}
//                         value={searchText}
//                     />
//                 </View> */}

//                 {meetingData.length > 0 ? (
//                     <DataTable>

//                         <Text style={{
//                             fontSize: 20,
//                             textAlign: 'center',
//                             color: '#EEEEEE',
//                             marginTop: hp(2),
//                             marginBottom: hp(2)
//                         }}>{user.name}  Order's Data</Text>
//                         <DataTable.Header>
//                             <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Brand Name</DataTable.Title>
//                             <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Concern Person</DataTable.Title>
//                         </DataTable.Header>
//                         <TouchableOpacity>
//                             {meetingData.map((meeting) => {
//                                 const {
//                                     _id: meetingId,
//                                     brandId: { brandName },
//                                     concernPersonId,
//                                     concernPersons,
//                                     emailRecipient,
//                                     userId: { _id: userId, contact, email, name, role }
//                                 } = meeting;
//                                 // console.log(concernPersonId)
//                                 return (
//                                     <>

//                                         <DataTable.Row key={meetingId}>
//                                             <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 5 }}>{brandName}</DataTable.Cell>
//                                             <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }}>
//                                                 {concernPersonId.map(person => person.name).join(', ')}
//                                             </DataTable.Cell>
//                                         </DataTable.Row></>
//                                 );
//                             })}

//                         </TouchableOpacity>
//                     </DataTable>
//                 ) : (
//                     <ActivityIndicator color='#EEEEEE' size="large" />
//                 )}
//                 {/* <DataTable.Pagination
//           page={page}
//           numberOfPages={Math.ceil(items.length / itemsPerPage)}
//           onPageChange={(page) => setPage(page)}
//           label={`${from + 1}-${to} of ${items.length}`}
//           numberOfItemsPerPageList={numberOfItemsPerPageList}
//           numberOfItemsPerPage={itemsPerPage}
//           style={AllCustomersListStyle.Pagination}  
//           onItemsPerPageChange={onItemsPerPageChange}
//           showFastPaginationControls
//           selectPageDropdownLabel={'Rows per page'}
//         /> */}

//             </ImageBackground>
//         </SafeAreaView>
//     )
// }

// const mapStateToProps = (state) => ({
//     meetings: state.fetchMeeting.meetings,
//     loading: state.fetchMeeting.loading,
//     error: state.fetchMeeting.error,
// });

// // Connect your component to the Redux store
// export default connect(mapStateToProps, { fetchMeetingsByUserId })(Testing);





import React, { useEffect, useState } from 'react';
import { ActivityIndicator, DataTable, Text } from 'react-native-paper';
import { View, ImageBackground, ScrollView, SafeAreaView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMeetingsByUserId } from '../../store/actions/fetchMeetingsByUserAction';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import Button from '../../components/Button';

function Testing({ fetchMeetingsByUserId, navigation }) {
  const [userId, setUserId] = useState("");
  const [meetingData, setMeetingData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
        const response = await fetchMeetingsByUserId(userId);
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
    })
  }
  return (
    <SafeAreaView>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          style={{ marginBottom: 5 }}
        >
          {meetingData.length > 0 ? (
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
         
                {meetingData.map((meeting) => {
                  const {
                    _id: meetingId,
                    brandId: { brandName },
                    concernPersonId,
                    meetingDate
                  } = meeting;
                  let dateString = new Date(meetingDate).toLocaleDateString();
                  return (
                    <>
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
                    </>
                  );
                })}
             
            </DataTable>
          ) : (
            <ActivityIndicator color='#EEEEEE' size="large" />
          )}
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

export default connect(mapStateToProps, { fetchMeetingsByUserId })(Testing);

