import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStyles } from '../../theme/AppStyles';
import { hp, wp } from '../../../App';
import Images from '../../theme/Images';
import { DataTable } from 'react-native-paper';

export default function SelectedGarments({ navigation }) {
    const [garment, setGarmnet] = useState(null)
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
    }, [])

    const garmentDetail = (item) => {
        navigation.navigate('singleGarmentDetail', {
            item
        })
    }
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                            Article name
                        </DataTable.Title>
                        <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                            IDS
                        </DataTable.Title>
                        <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                            Color
                        </DataTable.Title>
                        {/* <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              Finish Type
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: '#EEEEEE', marginLeft: 5 }} >
              Weave
            </DataTable.Title> */}
                        {/* <DataTable.Title textStyle={{ color: '#EEEEEE' }} >
              Image
            </DataTable.Title> */}
                    </DataTable.Header>
                    {garment && garment.map(item => (
                        <DataTable.Row
                            key={item.key}
                            onPress={() =>
                                garmentDetail(item)}
                        >
                            <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.ArticleName}</DataTable.Cell>
                            <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.IDS}</DataTable.Cell>
                            <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Colour}</DataTable.Cell>
                            {/* <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.FinishType}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Weave}</DataTable.Cell> */}
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ImageBackground>
        </SafeAreaView>
    )
}