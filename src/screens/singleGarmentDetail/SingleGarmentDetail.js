import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import { AppStyles } from '../../theme/AppStyles';
import { SingleGarmentStyle } from './styles';
import Button from '../../components/Button';
import * as ImagePicker from 'react-native-image-picker';
import { Icon, IconType } from '../../components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCollection } from '../../store/actions/selectExhibitionGarmentAction';



 function SingleGarmentDetail({ route, getCollection }) {
    const [garment, setGarment] = useState([]);
    const [id , setId] = useState(null) // Initialize customer as null
    const [imageData, setImageData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch();

    const collection = useSelector((state) =>state.exhibitioCollection.collections );
    // console.log(collection, "collection.....")

    useEffect(() => {
        const { item } = route.params;
        // console.log('Customer Item:', item._id);
        setId(item._id)
        // Check if the item has selectedGarments and if it's an array
        // if (item.selectedGarments && Array.isArray(item.selectedGarments)) {
        //     // If it's an array, use it
        //     // setGarment(item);
        // } else {
        //     // If it's not an array or doesn't exist, initialize it as an empty array
        //     // setGarment({ ...item, selectedGarments: [] });
        // }
    }, [route.params]);

    useEffect(() => {
        const fetchMeetingsByUser = async () => {
          try {
            const response = await getCollection(id);
            console.log(response)
          } catch (error) {
            console.log(error.message);
          }
        };
    
        if (collection.length === 0 || refresh) {
          fetchMeetingsByUser();
          setRefresh(false); // Reset refresh flag
        } else {
          setGarment(collection.filter(item => item._id === id));
        }
      }, [dispatch, collection, id, refresh]);
    
console.log("garment by id " , garment)
console.log(id , "collection id")
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
                     {garment.length > 0 && garment[0].selectedGarments && garment[0].selectedGarments.map((item, index) => (
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
                                        marginBottom: 10,
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

const mapStateToProps = (state) => ({
    collections: state.exhibitioCollection.collections, // Assuming your reducer updates the "brands" property
    loading: state.exhibitioCollection.loading, // Assuming your reducer updates the "loading" property
    error: state.exhibitioCollection.error,
  });

export default connect(mapStateToProps)(SingleGarmentDetail);