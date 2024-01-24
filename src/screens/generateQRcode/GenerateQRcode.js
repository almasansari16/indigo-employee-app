
import React, { useEffect, useState, useRef } from 'react';
import {
  View, StyleSheet, Platform, PermissionsAndroid,
  ToastAndroid, Text, TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import ViewShot from 'react-native-view-shot';
import { QRCODE } from '../../components';

const GenerateQRcode = ({ route, navigation }) => {
  const [collectionData, setCollection] = useState(null);
  const viewShotRef = useRef(null);

  useEffect(() => {
    const { collection } = route.params;
    setCollection(collection);
  }, [route.params]);

  if (!collectionData) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const saveQrToDisk = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    viewShotRef.current.capture().then(async (uri) => {
      try {
        await CameraRoll.save(uri, 'photo');
        ToastAndroid.show('QRCode with Image saved to gallery', ToastAndroid.LONG);
        navigation.navigate('AllCollectionList');
      } catch (error) {
        console.error('Error saving QR code with Image:', error);
      }
    });
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.qrText}>QR Code</Text>
      <ViewShot ref={viewShotRef} style={styles.qrContainer}>
        <QRCODE value={JSON.stringify(collectionData)} />
        <Text style={styles.articleName}>{collectionData.ArticleName}</Text>
      </ViewShot>
      <TouchableOpacity style={styles.button} onPress={() => saveQrToDisk()}>
        <Text style={styles.save}>Save to Gallery</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GenerateQRcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrContainer: {
    alignItems: 'center',
  },

  articleName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color:'white'
  },

  button: {
    borderRadius: 30,
    padding: 15,
    position: 'absolute',
    bottom: 0,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    backgroundColor: '#273746',
  },

  qrText: {
    top: -20,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  save: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
  },
});

