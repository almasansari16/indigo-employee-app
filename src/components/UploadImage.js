import React from 'react';
import { View, Image, Button, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '../config/config';

const SERVER_URL = BASE_URL;

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

const UploadImage = () => {
    const [photo, setPhoto] = React.useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
          console.log('ImagePicker response:', response);
          if (response.assets && response.assets.length > 0) {
            const selectedPhoto = response.assets[0];
            setPhoto(selectedPhoto);
          }
        });
      };
      
      
// console.log(photo.uri , "photo")
    const handleUploadPhoto = () => {
        fetch(`http://172.16.200.253:4000/api/add-image`, {
            method: 'POST',
            body: createFormData(photo, { garmentId: '65487c9989813f8cbfc1de9e' }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('Upload successful:', response);
            })
            .catch((error) => {
                console.log('Upload failed:', error);
            });

    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && (
                <>
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: 300, height: 300 }}
                    />
                    <Button title="Upload Photo" onPress={handleUploadPhoto} />
                </>
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
        </View>
    );
};

export default UploadImage;