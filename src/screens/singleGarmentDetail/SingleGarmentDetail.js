import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import { AppStyles } from '../../theme/AppStyles';
import { SingleGarmentStyle } from './styles';
import Button from '../../components/Button';
import * as ImagePicker from 'react-native-image-picker';
import { CustomModal, Icon, IconType, InputField } from '../../components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCollection } from '../../store/actions/selectExhibitionGarmentAction';
import { BASE_URL } from '../../config/config';
import axios from 'axios';



function SingleGarmentDetail({ route, getCollection }) {
    const [garment, setGarment] = useState({
        selectedGarments: [{ imageData: null }], // Initialize as an object with selectedGarments property
    });
    const [garmentId, setGarmentId] = useState(null)
    const [id, setId] = useState(null) // Initialize customer as null
    const [imageData, setImageData] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [price, setPrice] = useState(Number);
    const [fullWidth, setFullWidth] = useState('');
    const [yard , setYard] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const dispatch = useDispatch();

    const collection = useSelector((state) => state.exhibitioCollection.collections);
    // console.log(collection, "collection.....")

    useEffect(() => {
        const { item } = route.params;
        // console.log('Customer Item:', item._id);
        setId(item._id)
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

    console.log("garment by id ", garment)
    // console.log(id, "collection id")
    if (!garment) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const uploadImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImageData(imageUri)
            }
        });
    };

    useEffect(() => {
        console.log(imageData, "imageUri in useeffect......");
    }, [imageData]);


    const addPrice = (item) => {
        // console.log(item._id, "item..........")
        setGarmentId(item._id)
        setModalVisible(true)

    }
    const closeModal = () => {
       setModalVisible(false);
       setModalVisible2(false)
    }
    const handleAddPrice = async() => {
 try {
            // Make a POST request to your server's /add-price endpoint using axios
            const response = await axios.post(`${BASE_URL}/add-price`, {
                garmentId: garmentId,
                price: price,
                fullWidth: fullWidth
            });

            setPrice('')
            setFullWidth('')
            console.log(response.data.message);
            Alert.alert(response.data.message)
        } catch (error) {
            console.error('Error:', error);
        }
        setModalVisible(false)
    }

    const addYard = () => {
        setModalVisible2(true)
    }
 
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground
                source={Images.purple_background}
                style={{ width: wp(100), height: hp(100) }}>
                <Button
                    title={'Add All'}
                    onPress={addYard}
                    style={[SingleGarmentStyle.btn,
                    {
                        width: wp(40),
                        alignSelf: 'center',
                        marginTop: hp(3)
                    }]}
                    textStyle={{ color: '#EEEEEE' }} />
                <ScrollView style={{ marginBottom: hp(10) }}>
                    {garment.length > 0 && garment[0].selectedGarments && garment[0].selectedGarments.map((item, index) => (
                        <View key={index} style={[AppStyles.center, SingleGarmentStyle.collectionDetail]}>
                            <Text style={SingleGarmentStyle.detailText}>Article Name : {item.ArticleName}</Text>
                            <Text style={SingleGarmentStyle.detailText}>IDS : {item.IDS}</Text>
                            <Text style={SingleGarmentStyle.detailText}>Color : {item.Colour}</Text>
                            <Text style={SingleGarmentStyle.detailText}>Finish Type : {item.FinishType}</Text>
                            <Text style={SingleGarmentStyle.detailText}>Weave : {item.Weave}</Text>
                            <Text style={SingleGarmentStyle.detailText}>Price : ${item.price}</Text>
                            <Text style={SingleGarmentStyle.detailText}>Full Width : {item.fullWidth}</Text>
                            <Text style={SingleGarmentStyle.detailText}>yards : {yard}</Text>
                            {console.log(item, "ovnsofn")}
                            {imageData && (
                                <Image
                                    source={{ uri: imageData }}
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
                            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    title={'Add Price & Full Width'}
                                    onPress={() => addPrice(item)}
                                    style={[SingleGarmentStyle.btn]}
                                    textStyle={{ color: '#EEEEEE' }} />
                                {/* <Button
                                    title={'Upload Image'}
                                    onPress={uploadImage}
                                    style={[SingleGarmentStyle.btn]}
                                    textStyle={{ color: '#EEEEEE' }} /> */}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* <View style={SingleGarmentStyle.btnView}>
                    <Button title={'Upload Image........'}
                        style={SingleGarmentStyle.btn}
                        onPress={() => uplaodImage()}
                    />
                </View> */}
                <View>
                    <CustomModal visible={modalVisible} hideModal={closeModal}>
                        <InputField placeholder={'Enter Garment Price'}
                            style={SingleGarmentStyle.input}
                            onChangeText={text => setPrice(text)}
                            value={price}
                        />
                        <InputField placeholder={'Enter Full Width'}
                            style={SingleGarmentStyle.input}
                            onChangeText={text => setFullWidth(text)}
                            value={fullWidth}
                        />
                        <Button title={'Add Price & Full Width'}
                            onPress={handleAddPrice} />
                    </CustomModal>
                </View>
                    <View>
                    <CustomModal visible={modalVisible2} hideModal={closeModal}>
                        <InputField placeholder={'Add Yards'}
                            style={SingleGarmentStyle.input}
                            onChangeText={text => setYard(text)}
                            value={yard}
                        />
                        <Button title={'Add'}
                           onPress={closeModal}/>
                    </CustomModal>
                </View>
            </ImageBackground>
        </SafeAreaView>

    )
};

const mapStateToProps = (state) => ({
    collections: state.exhibitioCollection.collections, // Assuming your reducer updates the "brands" property
    loading: state.exhibitioCollection.loading, // Assuming your reducer updates the "loading" property
    error: state.exhibitioCollection.error,
});

export default connect(mapStateToProps)(SingleGarmentDetail);