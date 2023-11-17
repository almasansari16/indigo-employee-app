import { View, Text, SafeAreaView, ImageBackground, Alert, ToastAndroid, Platform, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStyles } from '../../theme/AppStyles';
import { hp, wp } from '../../../App';
import Images from '../../theme/Images';
import { DataTable } from 'react-native-paper';
import { CustomModal } from '../../components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCollections } from '../../store/actions/selectExhibitionGarmentAction';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';

function SelectedGarments({ navigation }) {
    const [garment, setGarmnet] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isRefreshing , setIsRefreshing] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector((state) => state.exhibitioCollection.collections)
    // console.log('data', data);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await AsyncStorage.getItem('SelectedGarmentforExhibition')
    //             .then(value => {
    //                 if (value) {
    //                     const retrievedArray = JSON.parse(value);
    //                     console.log('Retrieved array from AsyncStorage:', retrievedArray);
    //                     setGarmnet(retrievedArray)
    //                 } else {
    //                     console.log('No array found in AsyncStorage');
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error retrieving array from AsyncStorage:', error);
    //             });

    //     }
    //     fetchData()
    // }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await dispatch(getCollections());
            } catch (error) {
                console.error(error);
            }
        };

        if (data.length === 0 || refresh) {
            fetchData();
            setRefresh(false)
        } else {
            setItems(data);
            //   setFilteredItems(brands)
        }
    }, [dispatch, data, refresh]);


    const garmentDetail = (item) => {
        navigation.navigate('singleGarmentDetail', {
            item
        })
    }
    const handleRefresh = async () => {
        setIsRefreshing(true);
    
        try {
          await getCollections();
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsRefreshing(false);
        }
      };

    const handleLongPress = (item) => {
        setSelectedItems((prevSelectedItems) => {
            // setCollection((prevCollection) => ({
            //     ...prevCollection,
            //     selectedGarments: [...prevCollection.selectedGarments, item]
            // }));
            // Check if the item is not already in the selectedItems array
            if (!prevSelectedItems.some((selectedItem) =>
                selectedItem.collectionName === item.collectionName)) {
                const message = "Item has been selected: " + item.collectionName;

                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravityAndOffset(
                        message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                } else if (Platform.OS === 'ios') {
                    Alert.alert(message);
                }

                return [...prevSelectedItems, item];
            }
            AsyncStorage.setItem('selectedCollection', JSON.stringify(selectedItems))
                .then(() => {
                    console.log('Array saved to AsyncStorage');
                })
                .catch(error => {
                    console.error('Error saving array to AsyncStorage:', error);
                });
            // If the item is already in the array, return the previous state
            const message = item.collectionName + " has already selected ";

            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset(
                    message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else if (Platform.OS === 'ios') {
                Alert.alert(message);
            }
            return prevSelectedItems;
        });
    };
    console.log(items, "items")
    console.log("selected items", selectedItems)
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
                <ScrollView style={{ height: hp(80) }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                                Collection Name
                            </DataTable.Title>
                            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                                Date
                            </DataTable.Title>

                        </DataTable.Header>
                        {items && items.map(item => (
                            <DataTable.Row
                                key={item.key}
                                onPress={() =>
                                    garmentDetail(item)}
                                onLongPress={() => handleLongPress(item)}
                            >
                               
                                <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.collectionName}</DataTable.Cell>
                                <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{new Date(item.date).toLocaleDateString()}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    <View>
                        <Button
                            title={'Next'}
                            onPress={() => navigation.navigate('NewQrCode')}
                            style={{ backgroundColor: '#EEEEEE', width: wp(30), marginTop: 20, alignSelf: 'flex-end', }} />
                    </View>
                </ScrollView>

            </ImageBackground>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    collections: state.exhibitioCollection.collections, // Assuming your reducer updates the "brands" property
    loading: state.exhibitioCollection.loading, // Assuming your reducer updates the "loading" property
    error: state.exhibitioCollection.error,
});

export default connect(mapStateToProps)(SelectedGarments);
