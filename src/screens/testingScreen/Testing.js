import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Table } from '../../components'
import Images from '../../theme/Images';

export default function Testing() {
    const data = [
        { column1: 'Row 1 Data 1', column2: 'Row 1 Data 2', column3: 'Row 1 Data 3' },
        { column1: 'Row 2 Data 1', column2: 'Row 2 Data 2', column3: 'Row 2 Data 3' },
        // Add more data rows as needed
    ];
    return (
        <ImageBackground source={Images.purple_background} style={{flex:1}}>
        <View>
            <Table data={data} />
        </View>
        </ImageBackground>
    )
}