import { View, Text, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles';
import { SingleCollectionStyle } from './styles';
import { hp, wp } from '../../../App';
import Button from '../../components/Button';
import Images from '../../theme/Images';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '../../config/apiConfig';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
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

export default function SingleCollection({ route, navigation }) {
  const [collection, setCollection] = useState(null); // Initialize customer as null
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // console.log('Route Params:', route.params); // Check if route params are being received
    const { item } = route.params;
    console.log('Customer Item:', item); // Check the customer item data
    setCollection(item);
  }, [route.params]);
  // console.log(collection._id , 'collection')
  if (!collection) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }


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
    fetch(`${BASE_URL}/add-image`, {
      method: 'POST',
      body: createFormData(photo, { garmentId: collection._id }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Upload successful:', response.message);
        Alert.alert(response.message)
      })
      .catch((error) => {
        console.log('Upload failed:', error);
      });

  };


  // console.log('Customer State:', customer); // Check the customer state
  const createBarcode = () => {
    navigation.navigate('GenerateQRcode', {
      collection
    })
  }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}>
        <Button
          title={'Upload Image'}
          onPress={handleChoosePhoto}
          style={[SingleCollectionStyle.btn]}
        />
        <Button title={'Create Barcode'}
          style={SingleCollectionStyle.btn}
          onPress={() => createBarcode()} />
        <ScrollView>
          <View style={[AppStyles.center, SingleCollectionStyle.collectionDetail]}>
            <Text style={SingleCollectionStyle.detailText}>Article Name : {collection.ArticleName}</Text>
            <Text style={SingleCollectionStyle.detailText}>IDS : {collection.IDS}</Text>
            <Text style={SingleCollectionStyle.detailText}>Color : {collection.Colour}</Text>
            <Text style={SingleCollectionStyle.detailText}>Finish Type : {collection.FinishType}</Text>
            <Text style={SingleCollectionStyle.detailText}>Weave : {collection.Weave}</Text>

            <View style={{ width: wp(80), alignSelf: 'center', marginTop: 10, borderRadius: 10 }}>
            <Image
  source={{ uri: collection.images[0] }}
  style={
    collection.images[0]
      ? { resizeMode: 'contain', width: wp(80), height: hp(50), borderRadius: 10 }
      : { resizeMode: 'contain', width: wp(80), borderRadius: 10 }
  }
/>
            </View>
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

          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>

  )
}