import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import { AppStyles } from '../../theme/AppStyles';
import { SingleGarmentStyle } from './styles';
import Button from '../../components/Button';
import * as ImagePicker from 'react-native-image-picker';
import { Icon, IconType } from '../../components';



export default function SingleGarmentDetail({ route }) {
    const [garment, setGarment] = useState([]); // Initialize customer as null
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
            includeBase64: true,
        };
    
        ImagePicker.launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled');
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage);
            } else {
                // console.log('Base64 data: ', res.assets[0].base64);
                // console.log('Image type: ', res.assets[0].type);
                const base64Data = res.assets[0].base64;
    
                // Assuming you want to associate the image with the first item in selectedGarments
                const updatedGarment = { ...garment };
                updatedGarment.selectedGarments[0].imageData = `data:${res.assets[0].type};base64, ${base64Data}`;
                setGarment(updatedGarment);
            }
        });
    };
    
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
                <ScrollView>
                {garment.selectedGarments.map((item, index) => (
                <View key={index} style={[AppStyles.center, SingleGarmentStyle.collectionDetail]}>
                    <Text style={SingleGarmentStyle.detailText}>Article Name : {item.ArticleName}</Text>
                    <Text style={SingleGarmentStyle.detailText}>IDS : {item.IDS}</Text>
                    <Text style={SingleGarmentStyle.detailText}>Color : {item.Colour}</Text>
                    <Text style={SingleGarmentStyle.detailText}>Finish Type : {item.FinishType}</Text>
                    <Text style={SingleGarmentStyle.detailText}>Weave : {item.Weave}</Text>
                    {item.imageData && (
                        <Image
                            source={{ uri: item.imageData }}
                            style={{
                                width: 250,
                                height: 250,
                                alignSelf: 'center',
                                marginTop: 10,
                                marginBottom:10,
                                borderRadius: 10,
                            }}
                        />
                    )}
                    <Button title={'Upload Image'} onPress={uplaodImage} style={[SingleGarmentStyle.btn]} textStyle={{ color: '#EEEEEE' }} />
                </View>
            ))}
                </ScrollView>
               
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