import { View, Text, SafeAreaView, ImageBackground, Image, Alert, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles';
import { SingleGarmentStyle } from './styles';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import Button from '../../components/Button';
import { launchImageLibrary } from 'react-native-image-picker';
import { CustomModal, InputField } from '../../components';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import UploadImage from '../../components/UploadImage';




const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('image-files', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};



export default function SingleCollectionDetail({ route, navigation }) {
  const [data, setData] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState(0);
  const [fullWidth, setFullWidth] = useState('');
  const [yard, setYard] = useState('');
  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    const { item } = route.params;
    console.log('Customer Item:', item);
    setData(item);
  }, [route.params]);
  console.log('data', data)



  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      console.log('ImagePicker response:', response);
      if (response.assets && response.assets.length > 0) {
        const selectedPhoto = response.assets[0];
        setPhoto(selectedPhoto);
      }
    });
  };


  const handleUploadPhoto = () => {
    fetch(`http://172.16.200.253:8080/api/add-image`, {
      method: 'POST',
      body: createFormData(photo, { garmentId: data._id }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Upload successful:', response);
      })
      .catch((error) => {
        console.log('Upload failed:', error);
      });

  };



  const addPrice = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddPrice = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/add-price`, {
        garmentId: data._id,
        price: price,
        fullWidth: fullWidth,
      });

      setPrice(0);
      setFullWidth('');
      console.log(response.data.message);
      Alert.alert(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
    setModalVisible(false);
  };

  if (!data) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[AppStyles.container]}>

      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}>
        <View style={[AppStyles.center, SingleGarmentStyle.collectionDetail]}>
          <ScrollView>
            <Text style={SingleGarmentStyle.detailText}>Article Name : {data.ArticleName}</Text>
            <Text style={SingleGarmentStyle.detailText}>IDS : {data.IDS}</Text>
            <Text style={SingleGarmentStyle.detailText}>Color : {data.Colour}</Text>
            <Text style={SingleGarmentStyle.detailText}>Finish Type : {data.FinishType}</Text>
            <Text style={SingleGarmentStyle.detailText}>Weave : {data.Weave}</Text>
            <Text style={SingleGarmentStyle.detailText}>Price : ${data.price}</Text>
            <Text style={SingleGarmentStyle.detailText}>Full Width : {data.fullWidth}</Text>
            <View style={{ width: wp(80), alignSelf: 'center', marginTop: 10, marginBottom:10, borderRadius: 10 }}>
              {data.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={{ resizeMode: 'contain', width: wp(80), height: hp(50), borderRadius: 10 , marginBottom: 10}}
                />
              ))}
            </View>
            {/* <Text style={SingleGarmentStyle.detailText}>yards : {yard}</Text> */}
            {photo && (
              <>
                <Image
                  source={{ uri: photo.uri }}
                  style={{
                    width: wp(80),
                    height: 350,
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <Button title="Upload Photo" onPress={handleUploadPhoto} />
              </>
            )}


            <View style={{ flexDirection: 'column', gap: 20 }}>
              <Button
                title={'Add Price & Full Width'}
                onPress={addPrice}
                style={[SingleGarmentStyle.btn]}
                textStyle={{ color: '#EEEEEE' }} />


              <Button
                title={'Upload Image'}
                onPress={handleChoosePhoto}
                style={[SingleGarmentStyle.btn]}
                textStyle={{ color: '#EEEEEE' }} />
            </View>
          </ScrollView>
        </View>
        <View>
          <CustomModal visible={modalVisible} hideModal={closeModal}>
            <InputField placeholder={'Enter Garment Price'}
              style={SingleGarmentStyle.input}
              onChangeText={(text) => setPrice(parseFloat(text) || 0)}
              value={price.toString()}
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
      </ImageBackground>
    </SafeAreaView>
  )
}