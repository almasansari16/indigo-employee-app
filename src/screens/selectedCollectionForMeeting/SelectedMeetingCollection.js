import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppStyles } from '../../theme/AppStyles';
import Images from '../../theme/Images';
import { meetingCollectionStyle } from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';

export default function SelectedMeetingCollection({navigation}) {
    const [meetingCollection, setmeetingCollection] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('selectedCollection');
                if (data !== null) {
                    const meetingCollections = JSON.parse(data);
                    setmeetingCollection(meetingCollections); // Store the emails array directly
                    console.log(meetingCollections, "collections........")
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);
    console.log("meeting collection.........", meetingCollection)

    const garmentDetail = (item) => {
        navigation.navigate('singleGarmentDetail', {
            item
        })
    }
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <ScrollView>
                     <DataTable>
                        <DataTable.Header>
                            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                                Collection Name
                            </DataTable.Title>
                            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                                Date
                            </DataTable.Title>

                        </DataTable.Header>
                        {meetingCollection && meetingCollection.map((item, index) => (
                            <DataTable.Row
                                key={item.key}
                                onPress={() =>
                                    garmentDetail(item)}
                                // onLongPress={() => handleLongPress(item)}
                            >
                                <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.collectionName}</DataTable.Cell>
                                <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{new Date(item.date).toLocaleDateString()}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </ScrollView>
            </ImageBackground>

        </SafeAreaView >
    )
}