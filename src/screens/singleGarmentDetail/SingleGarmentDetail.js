import { View, Text, ImageBackground, SafeAreaView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import { AppStyles } from '../../theme/AppStyles';
import { SingleGarmentStyle } from './styles';
import Button from '../../components/Button';

import * as ImagePicker from 'react-native-image-picker';
export default function SingleGarmentDetail({ route }) {
    const [garment, setGarment] = useState(null); // Initialize customer as null
    const [imageData, setImageData] = useState(null)
    useEffect(() => {
        // console.log('Route Params:', route.params); // Check if route params are being received
        const { item } = route.params;
        console.log('Customer Item:', item); // Check the customer item data
        setGarment(item);
    }, [route.params]);

    if (!garment) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const uplaodImage = () => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true
        };

        ImagePicker.launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled');
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage);
            } else {
                console.log('Base64 data: ', res.assets[0].base64);
                console.log('Image type: ', res.assets[0].type);
                const base64Data = res.assets[0].base64;
                setImageData(`data:${res.assets[0].type};base64, ${base64Data}`);
            }
        });
       
    }

    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
                {imageData && (
                    <Image
                        source={{ uri: imageData }}
                        style={{ width: 200, height: 200 }}
                    />
                )}
                <View style={[AppStyles.center, SingleGarmentStyle.collectionDetail]}>
                    <Text style={SingleGarmentStyle.detailText}>Article Name : {garment.ArticleName}</Text>
                    <Text style={SingleGarmentStyle.detailText}>IDS : {garment.IDS}</Text>
                    <Text style={SingleGarmentStyle.detailText}>Color : {garment.Colour}</Text>
                    <Text style={SingleGarmentStyle.detailText}>Finish Type : {garment.FinishType}</Text>
                    <Text style={SingleGarmentStyle.detailText}>Weave : {garment.Weave}</Text>
                </View>
                <View style={SingleGarmentStyle.btnView}>
                    <Button title={'Upload Image........'}
                        style={SingleGarmentStyle.btn}
                        onPress={() => uplaodImage()}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>

    )
}