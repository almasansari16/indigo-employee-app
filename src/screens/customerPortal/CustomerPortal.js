// // // import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
// // // import React, { useEffect, useState } from 'react'
// // // import Images from '../../theme/Images'
// // // import axios from 'axios'
// // // import { BASE_URL } from '../../config/config'

// // // export default function CustomerPortal() {
// // //     const [data, setData] = useState([])
// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 const data = await axios.get(`${BASE_URL}/get-scanCode`)
// // //                 console.log("data" , data.data)
// // //                 setData(data.data)
// // //             } catch (error) {
// // //                 console.log(error)
// // //             }
// // //         }
// // //         fetchData();
// // //     }, [])
// // //     return (
// // //         <SafeAreaView style={{ flex: 1 }}>
// // //             <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>

// // //             </ImageBackground>
// // //         </SafeAreaView>
// // //     )
// // // }




// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   StyleSheet,
// //   SafeAreaView,
// //   ScrollView,
// //   ImageBackground,
// //   Image,
// //   Alert,
// //   ToastAndroid,
// //   Platform,
// //   Text,
// //   ActivityIndicator,
// //   RefreshControl
// // } from 'react-native';
// // import { Appbar, DataTable, Searchbar } from 'react-native-paper';
// // import { AppStyles } from '../../theme/AppStyles';
// // import Images from '../../theme/Images';
// // import { hp, wp } from '../../../App';
// // import { getSheetData } from '../../store/actions/sheetDataAction';
// // import { connect, useDispatch, useSelector } from 'react-redux';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Button from '../../components/Button';
// // import { CustomModal, Icon, IconType, InputField } from '../../components';
// // import AllCollectionStyle from './styles';
// // import { fetchScanCodeByUserId } from '../../store/actions/scanCodesAction';


// // function CustomerPortal({ navigation,  }) {
// //   const [page, setPage] = React.useState(0);
// //   const [refresh, setRefresh] = useState(false);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [collection, setCollection] = useState({
// //     collectionName: '',
// //     selectedGarments: []
// //   });
// //   const [numberOfItemsPerPageList] = React.useState([7]);
// //   const [selectedItems, setSelectedItems] = React.useState([]);
// //   const [itemsPerPage, onItemsPerPageChange] = React.useState(
// //     numberOfItemsPerPageList[0],
// //   );
// //   const dispatch = useDispatch();
// //   const sheetData = useSelector((state) => state.scanCode.scanCode.codes);
// //   const userId = useSelector((state) => state.auth.user.user._id);

// //   console.log(sheetData,   "sheetdata")

// //   const [items, setItems] = React.useState([]);

// //   const from = page * itemsPerPage;
// //   // const to = items.length > 0 ? Math.min((page + 1) * itemsPerPage, items.length) : 0;
// //   const to = from + itemsPerPage;


// //   useEffect(() => {
// //     setPage(0);
// //   }, [itemsPerPage]);
// //   const [searchText, setSearchText] = React.useState('');
// //   const [filteredItems, setFilteredItems] = React.useState(items);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         await dispatch(fetchScanCodeByUserId(userId));
// //       } catch (error) {
// //         console.error(error,"errorr");
// //       }
// //     };

// //     if (sheetData.length === 0) {
// //       fetchData();
// //     } else {
// //       const images = [
// //         require("../../assets/images/image1.jpeg"),
// //         require("../../assets/images/image2.jpeg"),
// //         require("../../assets/images/image3.jpeg"),
// //         require("../../assets/images/image4.jpeg"),
// //         require("../../assets/images/image5.jpeg"),
// //         require("../../assets/images/image6.jpeg"),
// //         require("../../assets/images/image7.jpeg"),
// //         require("../../assets/images/image8.jpeg"),
// //         require("../../assets/images/image9.jpeg"),
// //         require("../../assets/images/image10.jpeg")
// //       ];

// //       const updateItems = sheetData.map((item, index) => (
// //         {
// //           ...item,
// //           Image: images[index]
// //         }
// //       ))
// //       console.log(updateItems, "updateitems.............")
// //       setItems(updateItems);
// //       setFilteredItems(updateItems)
// //     }
// //     // fetchData()
// //   }, [dispatch, sheetData]);

// //   const handleSearch = (text) => {
// //     setSearchText(text);

// //     const filteredData = items.filter(item =>
// //       item.ArticleName.toLowerCase().includes(text.toLowerCase()) ||
// //       item.IDS.toLowerCase().includes(text.toLowerCase()) ||
// //       item.Colour.toLowerCase().includes(text.toLowerCase()) ||
// //       item.FinishType.toLowerCase().includes(text.toLowerCase()) ||
// //       item.Weave.toString().includes(text)
// //     );

// //     setFilteredItems(filteredData);
// //     setPage(0); // Reset the page to the first page
// //   };
// //   const collectionDetail = (item) => {
// //     navigation.navigate('SingleCollection', {
// //       item
// //     })
// //   }

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);

// //     try {
// //       await fetchScanCodeByUserId();
// //     } catch (error) {
// //       console.log(error.message);
// //     } finally {
// //       setIsRefreshing(false);
// //     }
// //   };
// // //   const handleLongPress = (item) => {
// // //     setSelectedItems((prevSelectedItems) => {
// // //       setCollection((prevCollection) => ({
// // //         ...prevCollection,
// // //         selectedGarments: [...prevCollection.selectedGarments, item]
// // //       }));
// // //       // Check if the item is not already in the selectedItems array
// // //       if (!prevSelectedItems.some((selectedItem) =>
// // //         selectedItem.ArticleName === item.ArticleName)) {
// // //         const message = "Item has been selected: " + item.ArticleName;

// // //         if (Platform.OS === 'android') {
// // //           ToastAndroid.showWithGravityAndOffset(
// // //             message,
// // //             ToastAndroid.SHORT,
// // //             ToastAndroid.BOTTOM,
// // //             25,
// // //             50
// // //           );
// // //         } else if (Platform.OS === 'ios') {
// // //           Alert.alert(message);
// // //         }

// // //         return [...prevSelectedItems, item];
// // //       }
// // //       AsyncStorage.setItem('SelectedGarmentforExhibition', JSON.stringify(selectedItems))
// // //         .then(() => {
// // //           console.log('Array saved to AsyncStorage');
// // //         })
// // //         .catch(error => {
// // //           console.error('Error saving array to AsyncStorage:', error);
// // //         });
// // //       // If the item is already in the array, return the previous state
// // //       const message = item.ArticleName + " has already selected ";

// // //       if (Platform.OS === 'android') {
// // //         ToastAndroid.showWithGravityAndOffset(
// // //           message,
// // //           ToastAndroid.SHORT,
// // //           ToastAndroid.BOTTOM,
// // //           25,
// // //           50
// // //         );
// // //       } else if (Platform.OS === 'ios') {
// // //         Alert.alert(message);
// // //       }
// // //       return prevSelectedItems;
// // //     });
// // //   };

// // //   console.log(collection, "collection...............")
// // //   const handleCreateCollection = async () => {

// // //     await createCollection(collection)
// // //       .then(res => {
// // //         setCollection({ collectionName: "" })
// // //         closeModal()
// // //       }).catch((err) => {

// // //         Alert.alert(err)
// // //       })
// // //   }

// // //   const closeModal = () => {
// // //     setModalVisible(false)
// // //   }
// //   return (
// //     <SafeAreaView style={[AppStyles.container]}>
// //       <ImageBackground
// //         source={Images.purple_background}
// //         style={{ width: wp(100), height: hp(100) }}>
// //         {/* <Appbar.Header
// //           style={{
// //             backgroundColor: '#EEEEEE',
// //           }}
// //           theme={{
// //             colors: {
// //               backgroundColor: '#D11F27',
// //               accent: 'white',
// //               secondary: 'yellow',
// //             },
// //           }}>
// //           <Appbar.BackAction
// //             animated
// //             android_ripple
// //             style={{ color: '#000' }}
// //             color="#000"
// //             onPress={() => {
// //               navigation.goBack();
// //             }}
// //           />
// //           <Appbar.Content
// //             title={"All Collections"}
// //             mode="small"
// //             style={{ color: 'white' }}
// //             color="black"
// //             titleStyle={AppStyles.headerText}
// //           />
// //         </Appbar.Header> */}
// //         {/* <View style={{ marginTop: 0 }}>
// //           <Searchbar
// //             placeholder="Search..."
// //             mode='view'
// //             onChangeText={handleSearch}
// //             value={searchText}
// //           />
// //         </View>
// //         <View style={{
// //           flexDirection: 'row',
// //           alignSelf: 'center',
// //           justifyContent: 'space-between',
// //           display: 'flex',
// //           width: wp(100),
// //           marginHorizontal: hp(2),

// //         }}>
// //           <Text style={{ color: '#EEEEEE', fontSize: 16, marginTop: 15, marginLeft: 10 }}>{collection.collectionName}</Text>
// //           <Button
// //             icon={<Icon name={'plus'} type={IconType.AntDesign} size={30} style={AllCollectionStyle.icon} />}
// //             style={AllCollectionStyle.addBtn}
// //             onPress={() => setModalVisible(true)}
// //           />
// //         </View> */}
// //         {/* <ScrollView
// //           refreshControl={
// //             <RefreshControl
// //               refreshing={isRefreshing}
// //               onRefresh={handleRefresh}
// //             />
// //           }>
// //           {filteredItems.length > 0 ? (
// //             <DataTable style={{ marginTop: -10 }}>
// //               <DataTable.Header>
// //                 <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
// //                   Article name
// //                 </DataTable.Title>
// //                 <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
// //                   IDS
// //                 </DataTable.Title>
// //                 <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
// //                   Color
// //                 </DataTable.Title>
// //                 <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
// //                   Finish Type
// //                 </DataTable.Title>
// //                 <DataTable.Title textStyle={{ color: '#EEEEEE', marginLeft: 5 }} >
// //                   Weave
// //                 </DataTable.Title>
// //                 <DataTable.Title textStyle={{ color: '#EEEEEE' }} >
// //                   Image
// //                 </DataTable.Title>
// //               </DataTable.Header>
// //               {filteredItems.slice(from, to).map(item => (
// //                 <DataTable.Row
// //                   key={item.key}
// //                   onPress={() =>
// //                     collectionDetail(item)}
// //                 >
// //                   <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.ArticleName}</DataTable.Cell>
// //                   <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.IDS}</DataTable.Cell>
// //                   <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Colour}</DataTable.Cell>
// //                   <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.FinishType}</DataTable.Cell>
// //                   <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Weave}</DataTable.Cell>
// //                   <DataTable.Cell>
// //                     <Image source={item.Image} style={{ width: 50, height: 50 }} />
// //                   </DataTable.Cell>
// //                 </DataTable.Row>
// //               ))}
// //             </DataTable>
// //           ) : (
// //             <ActivityIndicator color='#EEEEEE' size="large" />
// //           )}
// //         </ScrollView>
// //         <View style={{
// //           flexDirection: 'row',
// //           alignSelf: 'center',
// //           justifyContent: 'space-evenly',
// //           display: 'flex',
// //           width: wp(100),

// //         }}>
// //         </View> */}
// //         <DataTable.Pagination
// //           page={page}
// //           numberOfPages={Math.ceil(items.length / itemsPerPage)}
// //           onPageChange={page => setPage(page)}
// //           label={`${from + 1}-${to} of ${items.length}`}
// //           numberOfItemsPerPageList={numberOfItemsPerPageList}
// //           numberOfItemsPerPage={itemsPerPage}
// //           style={AllCollectionStyle.Pagination}
// //           onItemsPerPageChange={onItemsPerPageChange}
// //           showFastPaginationControls
// //           selectPageDropdownLabel={'Rows per page'}
// //         />

// //         {/* <View>
// //           <CustomModal visible={modalVisible} hideModal={closeModal}>
// //             <InputField placeholder={'Enter Exhibition Collection Name'}
// //               style={AllCollectionStyle.input}
// //               onChangeText={collectionName => setCollection({ ...collection, collectionName })}
// //               value={collection.collectionName}
// //             />
// //             <Button title={'Add Name'}
// //               onPress={closeModal} />
// //           </CustomModal>
// //         </View> */}

// //       </ImageBackground>
// //     </SafeAreaView>
// //   );
// // }


// // const mapStateToProps = (state) => ({
// //   scanCodes: state.scanCode.scanCodes,
// //   loading: state.scanCode.loading,
// //   error: state.scanCode.error,
// // });

// // // Connect your component to the Redux store
// // export default connect(mapStateToProps)(CustomerPortal);





// // import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import { Table } from '../../components'
// // import Images from '../../theme/Images';
// // import { fetchMeetingsByUserId } from '../../store/actions/fetchMeetingsByUserAction';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { connect, useDispatch, useSelector } from 'react-redux';
// // import { ActivityIndicator, DataTable } from 'react-native-paper';
// // import { hp, wp } from '../../../App';
// // import Button from '../../components/Button';

// // function Testing({ fetchMeetingsByUserId, navigation }) {
// //     const [userId, setUserId] = useState("");
// //     const [meetingData, setMeetingData] = useState([])
// //     const [refresh, setRefresh] = useState(false);
// //     const dispatch = useDispatch();
// //     const meeting = useSelector((state) => state.fetchMeeting.meetings);
// //     const { user } = useSelector((state) => state.auth.user)
// //     console.log(user.name, "user.....")
// //     // console.log(meeting, "meeting")

// //     useEffect(() => {
// //         async function fetchData() {
// //             try {
// //                 const userData = await AsyncStorage.getItem("userData");
// //                 const parsedData = JSON.parse(userData);
// //                 const { _id } = parsedData;
// //                 // console.log("User ID:", _id);
// //                 setUserId(_id);
// //             } catch (error) {
// //                 console.log("Error parsing the data:", error);
// //             }
// //         }

// //         fetchData();
// //     }, []);

// //     useEffect(() => {
// //         const fetchMeetingsByUser = async () => {
// //             try {
// //                 const response = await fetchMeetingsByUserId(userId);
// //                 console.log(response, "response");
// //             } catch (error) {
// //                 console.log(error.message);
// //             }
// //         }
// //         if (meeting.length === 0) {
// //             fetchMeetingsByUser();
// //         } else {
// //             setMeetingData(meeting)
// //         }
// //     }, [dispatch, meeting, userId, refresh]);
// //     // console.log(meetingData.map((meeting) => (meeting.userId.name)), "meeting data.......");
// // useEffect(() => {
// //     setRefresh(!refresh)
// // },[meetingData])
// //     return (
// //         <SafeAreaView>
// //             <ImageBackground
// //                 source={Images.purple_background}
// //                 style={{ width: wp(100), height: hp(100) }}>
// //                 {/* <View style={{ marginTop: 0 }}>
// //                     <Searchbar
// //                         placeholder="Search..."
// //                         mode="view"
// //                         onChangeText={handleSearch}
// //                         value={searchText}
// //                     />
// //                 </View> */}

// //                 {meetingData.length > 0 ? (
// //                     <DataTable>

// //                         <Text style={{
// //                             fontSize: 20,
// //                             textAlign: 'center',
// //                             color: '#EEEEEE',
// //                             marginTop: hp(2),
// //                             marginBottom: hp(2)
// //                         }}>{user.name}  Order's Data</Text>
// //                         <DataTable.Header>
// //                             <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Brand Name</DataTable.Title>
// //                             <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Concern Person</DataTable.Title>
// //                         </DataTable.Header>
// //                         <TouchableOpacity>
// //                             {meetingData.map((meeting) => {
// //                                 const {
// //                                     _id: meetingId,
// //                                     brandId: { brandName },
// //                                     concernPersonId,
// //                                     concernPersons,
// //                                     emailRecipient,
// //                                     userId: { _id: userId, contact, email, name, role }
// //                                 } = meeting;
// //                                 // console.log(concernPersonId)
// //                                 return (
// //                                     <>

// //                                         <DataTable.Row key={meetingId}>
// //                                             <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 5 }}>{brandName}</DataTable.Cell>
// //                                             <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }}>
// //                                                 {concernPersonId.map(person => person.name).join(', ')}
// //                                             </DataTable.Cell>
// //                                         </DataTable.Row></>
// //                                 );
// //                             })}

// //                         </TouchableOpacity>
// //                     </DataTable>
// //                 ) : (
// //                     <ActivityIndicator color='#EEEEEE' size="large" />
// //                 )}
// //                 {/* <DataTable.Pagination
// //           page={page}
// //           numberOfPages={Math.ceil(items.length / itemsPerPage)}
// //           onPageChange={(page) => setPage(page)}
// //           label={`${from + 1}-${to} of ${items.length}`}
// //           numberOfItemsPerPageList={numberOfItemsPerPageList}
// //           numberOfItemsPerPage={itemsPerPage}
// //           style={AllCustomersListStyle.Pagination}  
// //           onItemsPerPageChange={onItemsPerPageChange}
// //           showFastPaginationControls
// //           selectPageDropdownLabel={'Rows per page'}
// //         /> */}

// //             </ImageBackground>
// //         </SafeAreaView>
// //     )
// // }

// // const mapStateToProps = (state) => ({
// //     meetings: state.fetchMeeting.meetings,
// //     loading: state.fetchMeeting.loading,
// //     error: state.fetchMeeting.error,
// // });

// // // Connect your component to the Redux store
// // export default connect(mapStateToProps, { fetchMeetingsByUserId })(Testing);





// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, DataTable, Text } from 'react-native-paper';
// import { View, ImageBackground, ScrollView, SafeAreaView, RefreshControl, TouchableOpacity } from 'react-native';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { fetchMeetingsByUserId } from '../../store/actions/fetchMeetingsByUserAction';
// import Images from '../../theme/Images';
// import { hp, wp } from '../../../App';
// import Button from '../../components/Button';
// import { getMeetings } from '../../store/actions/meetingAction';

// function CustomerPortal({  navigation }) {
//   const [isRefreshing , setIsRefreshing] = useState(false);
//   const [meetingData, setMeetingData] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const dispatch = useDispatch();
//   const meetings = useSelector((state) => state.meeting.meetings);
//   const { user } = useSelector((state) => state.auth.user);

//   console.log(meetings)

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               await dispatch(getMeetings());
//           } catch (error) {
//               console.error(error);
//           }
//       };

//       if (meetings.length === 0 || refresh) {
//           fetchData();
//           setRefresh(false)
//       } else {
//           setMeetingData(meetings);
//           //   setFilteredItems(userdata)
//       }
//   }, [dispatch, meetings, refresh]);
// console.log(meetings , "fvfvnfijvnfijvn")
//   //   const data =  meetingData.map((item)=> item.brandId)
//   //   console.log( data.map((item)=> item) , "oevjovovfo")
//   // console.log(meetingData, "meeting data")



//   // const handleRefresh = async () => {
//   //   setIsRefreshing(true);

//   //   try {
//   //     await fetchMeetingsByUserId(userId);
//   //   } catch (error) {
//   //     console.log(error.message);
//   //   } finally {
//   //     setIsRefreshing(false);
//   //   }
//   // };
//   // const handleDetail = (meeting) => {
//   //   navigation.navigate("orderDetail", {
//   //     meeting
//   //   })
//   // }
//   return (
//     <SafeAreaView>
//       <ImageBackground
//         source={Images.purple_background}
//         style={{ width: wp(100), height: hp(100) }}
//       >
//         <ScrollView
//           // refreshControl={
//           //   <RefreshControl
//           //     refreshing={isRefreshing}
//           //     onRefresh={handleRefresh}
//           //   />
//           // }
//           style={{ marginBottom: hp(15)}}
//         >
//           {/* {meetings.length > 0 ? (
//             <DataTable>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   textAlign: 'center',
//                   color: '#EEEEEE',
//                   marginTop: hp(2),
//                   marginBottom: hp(2),
//                 }}
//               >
//                 {user.name} Order's Data
//               </Text>
//               <DataTable.Header>
//                 <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
//                   Brand Name
//                 </DataTable.Title>
//                 <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
//                   Concern Person
//                 </DataTable.Title>
//                 <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
//                   Meeting Date
//                 </DataTable.Title>
//               </DataTable.Header>

//                 {meetings.map((meeting) => {
//                   const {
//                     _id: meetingId,
//                     brandId: { brandName },
//                     concernPersonId,
//                     meetingDate
//                   } = meeting;
//                   let dateString = new Date(meetingDate).toLocaleDateString();
//                   return (
//                     <>
//                       <DataTable.Row key={meetingId} onPress={() => handleDetail(meeting)}>
//                         <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 5 }}>
//                           {brandName}
//                         </DataTable.Cell>
//                         <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }}>
//                           {concernPersonId.map(person => person.name).join(', ')}
//                         </DataTable.Cell>
//                         <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }}>
//                           {dateString}
//                         </DataTable.Cell>
//                       </DataTable.Row>
//                     </>
//                   );
//                 })}

//             </DataTable>
//           ) : (
//             <ActivityIndicator color='#EEEEEE' size="large" />
//           )} */}
//         </ScrollView>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// const mapStateToProps = (state) => ({
//   meetings: state.fetchMeeting.meetings,
//   loading: state.fetchMeeting.loading,
//   error: state.fetchMeeting.error, // Assuming your reducer updates the "error" property
// });

// export default connect(mapStateToProps, { getMeetings })(CustomerPortal);


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
