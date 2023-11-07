import { View, Text, SafeAreaView, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStyles } from '../../theme/AppStyles';
import { hp, wp } from '../../../App';
import Images from '../../theme/Images';
import { DataTable } from 'react-native-paper';
import { CustomModal } from '../../components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCollections } from '../../store/actions/selectExhibitionGarmentAction';

 function SelectedGarments({ navigation }) {
    const [garment, setGarmnet] = useState(null);
    const [refresh , setRefresh] = useState(false);
    const [items , setItems] = useState([]);
    const [open , setOpen] = useState(false);
    const dispatch = useDispatch()
    const data = useSelector((state) => state.exhibitioCollection.collections)
    console.log('data', data);
    useEffect(() => {
       setOpen(true)
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            await AsyncStorage.getItem('SelectedGarmentforExhibition')
                .then(value => {
                    if (value) {
                        const retrievedArray = JSON.parse(value);
                        console.log('Retrieved array from AsyncStorage:', retrievedArray);
                        setGarmnet(retrievedArray)
                    } else {
                        console.log('No array found in AsyncStorage');
                    }
                })
                .catch(error => {
                    console.error('Error retrieving array from AsyncStorage:', error);
                });

        }
        fetchData()
    }, []);


    useEffect(() => {
        const fetchData = async () => {
          try {
            await dispatch(getCollections());
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
    console.log("items" , items)
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
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
                        >
                            <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.collectionName}</DataTable.Cell>
                            <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{new Date(item.date).toLocaleDateString()}</DataTable.Cell>
                            
                            {/* <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.FinishType}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Weave}</DataTable.Cell> */}
                        </DataTable.Row>
                    ))}
                </DataTable>
                <View>
                    <CustomModal >

                    </CustomModal>
                </View>
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
