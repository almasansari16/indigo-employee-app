import React, { useState } from 'react';
import {
    View, StyleSheet, Platform, PermissionsAndroid,
    ToastAndroid, Text, TouchableOpacity
}
    from 'react-native';
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import { QRCODE } from '../../components';

const GenerateQRcode = () => {

    const initialItemState = {
        name: 'Sugar',
        expiryDate: '2023-12-31',
        manufacturer: 'Kakira Sugar Estate'
    }

    const [item, setItem] = useState(initialItemState);
    const [productQRref, setProductQRref] = useState();

    const saveQrToDisk = async () => {

        if (Platform.OS === "android" &&
            !(await hasAndroidPermission())) {
            return;
        }

        if (productQRref) {

            productQRref.toDataURL((data) => {

                let filePath = RNFS.CachesDirectoryPath + `/${item.name}.png`;
                RNFS.writeFile(filePath, data, 'base64')
                    .then((success) => {
                        return CameraRoll.save(filePath, 'photo')
                    })
                    .then(() => {
                        ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
                    });
            });
        }
    }

    const hasAndroidPermission = async () => {
        const permission =
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission =
            await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    return (
        <View style={styles.container}>
            <Text style={styles.qrText}>QR Code</Text>
            <QRCODE
                value={JSON.stringify({
                    name: item.name,
                    expiry: item.expiryDate,
                    manufacturer: item.manufacturer
                })}
                getRef={(c) => setProductQRref(c)} />
            <TouchableOpacity
                style={styles.button}
                onPress={() => { saveQrToDisk() }}>
                <Text style={styles.save}>Save to Gallery</Text>
            </TouchableOpacity>
        </View>
    )
}
export default GenerateQRcode;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: "#273746"
    },

    qrText: {
        top: -20,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },

    save: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'capitalize'
    }
});