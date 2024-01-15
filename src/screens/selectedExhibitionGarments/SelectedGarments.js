import { View, Text, SafeAreaView, ImageBackground, Alert, ToastAndroid, Platform, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStyles } from '../../theme/AppStyles';
import { hp, wp } from '../../../App';
import Images from '../../theme/Images';
import { DataTable } from 'react-native-paper';
import { CustomModal } from '../../components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';
import { deleteExhibitionCollections, fetchExhibitionCollectionByUserId } from '../../store/actions/fetchExhibitionCollectionByUserAction';

function SelectedGarments({ navigation, fetchExhibitionCollectionByUserId, deleteExhibitionCollections, loading, error }) {
    const [refresh, setRefresh] = useState(false);
    const [items, setItems] = useState([]);
    const [userId, setUserId] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector((state) => state.exhibitioCollectionByUser.collections)
    console.log('data', data);

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
                const response = await fetchExhibitionCollectionByUserId(userId);
                console.log(response, "response.........")
            } catch (error) {
                console.log(error.message);
            }
        };

        if (data.length === 0 || refresh) {
            fetchMeetingsByUser();
            setRefresh(false); // Reset refresh flag
        } else {
            setItems(data);
        }
    }, [dispatch, data, userId, refresh]);



    const handleRefresh = async () => {
        setIsRefreshing(true);

        try {
            await fetchExhibitionCollectionByUserId(userId);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsRefreshing(false);
        }
    };

    const garmentDetail = (item) => {
        navigation.navigate('SingleGarmentColection', {
            item
        })
    }
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
    // console.log("selected items", selectedItems)

    const deleteCollections = () => {
        // console.log('kfsvnksfvnkvn')
        deleteExhibitionCollections()
    }
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
                    }
                >
                    {items.length > 0 ? (
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
                                // console.log(item.exhibitionCollection.collectionName)
                                <DataTable.Row
                                    key={item.key}
                                    onPress={() =>
                                        garmentDetail(item)}
                                    onLongPress={() => handleLongPress(item)}
                                >

                                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >
                                        {item.collectionName}
                                    </DataTable.Cell>
                                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >
                                        {new Date(item.date).toLocaleDateString()}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    ) : (
                        <ActivityIndicator color='#EEEEEE' size="large" />
                    )}
                    <View >
                        {/* <Button
                            title={'Delete All'}
                            onPress={deleteCollections}
                            style={{ backgroundColor: '#EEEEEE', width: wp(30), marginTop: 20, alignSelf: 'flex-end', }} /> */}
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
    collections: state.exhibitioCollectionByUser.collections, // Assuming your reducer updates the "brands" property
    loading: state.exhibitioCollectionByUser.loading, // Assuming your reducer updates the "loading" property
    error: state.exhibitioCollectionByUser.error,
});

export default connect(mapStateToProps, { fetchExhibitionCollectionByUserId, deleteExhibitionCollections })(SelectedGarments);
