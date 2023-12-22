// // import React, { useEffect, useState } from 'react';
// // import {
// //     View, StyleSheet, Platform, PermissionsAndroid,
// //     ToastAndroid, Text, TouchableOpacity, SafeAreaView, Alert
// // }
// //     from 'react-native';
// // import RNFS from "react-native-fs";
// // import CameraRoll from "@react-native-community/cameraroll";
// // import { QRCODE } from '../../components';

// // const GenerateQRcode = ({ route, navigation }) => {
// //     const [collectionData, setCollection] = useState(null); // Initialize customer as null
// //     const [item, setItem] = useState(collectionData);
// //     const [productQRref, setProductQRref] = useState();
// //     useEffect(() => {
// //         // console.log('Route Params:', route.params); // Check if route params are being received
// //         const { collection } = route.params;
// //         console.log('Customer Item:', collection); // Check the customer item data
// //         setCollection(collection);
// //     }, [route.params]);

// //     if (!collectionData) {
// //         return (
// //             <SafeAreaView>
// //                 <Text>Loading...</Text>
// //             </SafeAreaView>
// //         );
// //     }




// //     const saveQrToDisk = async () => {

// //         if (Platform.OS === "android" &&
// //             !(await hasAndroidPermission())) {
// //             return;
// //         }
// //         console.log(item)
// //         console.log(collectionData.ArticleName, "lfvcfvfmn")
// //         if (productQRref) {

// //             productQRref.toDataURL((data) => {

// //                 let filePath = RNFS.CachesDirectoryPath + `/${collectionData.ArticleName}.png`;
// //                 RNFS.writeFile(filePath, data, 'base64')
// //                     .then((success) => {
// //                         Alert.alert("QR Code save successfully")
// //                         navigation.navigate("AllCollectionList")
// //                         return CameraRoll.save(filePath, 'photo')

// //                     })
// //                     .then(() => {
// //                         ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
// //                     });
// //             });
// //         }
// //     }

// //     const hasAndroidPermission = async () => {
// //         const permission =
// //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

// //         const hasPermission =
// //             await PermissionsAndroid.check(permission);
// //         if (hasPermission) {
// //             return true;
// //         }

// //         const status = await PermissionsAndroid.request(permission);
// //         return status === 'granted';
// //     }

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.qrText}>QR Code</Text>
// //             <QRCODE
// //                 value={JSON.stringify(collectionData)}
// //                 getRef={(c) => setProductQRref(c)} />
// //             <TouchableOpacity
// //                 style={styles.button}
// //                 onPress={() => { saveQrToDisk() }}>
// //                 <Text style={styles.save}>Save to Gallery</Text>
// //             </TouchableOpacity>
// //         </View>
// //     )
// // }
// // export default GenerateQRcode;

// // const styles = StyleSheet.create({

// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //         justifyContent: 'center',
// //         alignItems: 'center'
// //     },

// //     button: {
// //         borderRadius: 30,
// //         padding: 15,
// //         position: 'absolute',
// //         bottom: 0,
// //         width: '90%',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         fontWeight: 'bold',
// //         marginBottom: 30,
// //         color: '#fff',
// //         backgroundColor: "#273746"
// //     },

// //     qrText: {
// //         top: -20,
// //         color: '#000',
// //         fontSize: 18,
// //         fontWeight: 'bold'
// //     },

// //     save: {
// //         color: '#fff',
// //         fontSize: 16,
// //         textTransform: 'capitalize'
// //     }
// // });



// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Platform, PermissionsAndroid, ToastAndroid, Text, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import RNFS from 'react-native-fs';
// import CameraRoll from '@react-native-community/cameraroll';

// const GenerateQRcode = ({ route, navigation }) => {
//   const [collectionData, setCollection] = useState(null);
//   const [productQRref, setProductQRref] = useState();

//   useEffect(() => {
//     const { collection } = route.params;
//     setCollection(collection);
//   }, [route.params]);

//   if (!collectionData) {
//     return (
//       <SafeAreaView>
//         <Text>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   const saveQrToDisk = async () => {
//     if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
//       return;
//     }

//     if (productQRref) {
//       productQRref.toDataURL((data) => {
//         const filePath = RNFS.CachesDirectoryPath + `/${collectionData.ArticleName}.png`;

//         RNFS.writeFile(filePath, data, 'base64')
//           .then((success) => {
//             // Now, you can add your image to the QR code using Image component
//             const qrCodeWithImage = (
//               <View>
//                 <QRCode value={JSON.stringify(collectionData)} getRef={(c) => setProductQRref(c)} />
//                 <Image source={{ uri: `file://${filePath}` }} style={styles.qrImage} />
//               </View>
//             );

//             // Save the combined QR code with the image
//             return CameraRoll.saveToCameraRoll(qrCodeWithImage, 'photo');
//           })
//           .then(() => {
//             ToastAndroid.show('QRCode with Image saved to gallery', ToastAndroid.LONG);
//           })
//           .catch((error) => {
//             console.error('Error saving QR code with Image:', error);
//           });
//       });
//     }
//   };

//   const hasAndroidPermission = async () => {
//     const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
//     const hasPermission = await PermissionsAndroid.check(permission);

//     if (hasPermission) {
//       return true;
//     }

//     const status = await PermissionsAndroid.request(permission);
//     return status === 'granted';
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.qrText}>QR Code</Text>
//       <TouchableOpacity style={styles.button} onPress={() => saveQrToDisk()}>
//         <Text style={styles.save}>Save to Gallery</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default GenerateQRcode;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   button: {
//     borderRadius: 30,
//     padding: 15,
//     position: 'absolute',
//     bottom: 0,
//     width: '90%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#fff',
//     backgroundColor: '#273746',
//   },

//   qrText: {
//     top: -20,
//     color: '#000',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   save: {
//     color: '#fff',
//     fontSize: 16,
//     textTransform: 'capitalize',
//   },

//   qrImage: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//   },
// });




import React, { useEffect, useState } from 'react';
import {
    View, StyleSheet, Platform, PermissionsAndroid,
    ToastAndroid, Text, TouchableOpacity, SafeAreaView, Alert
}
    from 'react-native';
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import { QRCODE } from '../../components';

const GenerateQRcode = ({ route, navigation }) => {
    const [collectionData, setCollection] = useState(null); // Initialize customer as null
    const [item, setItem] = useState(collectionData);
    const [productQRref, setProductQRref] = useState();
    useEffect(() => {
        // console.log('Route Params:', route.params); // Check if route params are being received
        const { collection } = route.params;
        console.log('Customer Item:', collection); // Check the customer item data
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

        if (Platform.OS === "android" &&
            !(await hasAndroidPermission())) {
            return;
        }
        console.log(item)
        console.log(collectionData, "collectionData")
        if (productQRref) {

            productQRref.toDataURL((data) => {

                let filePath = RNFS.CachesDirectoryPath + `/${collectionData.ArticleName}.png`;
                RNFS.writeFile(filePath, data, 'base64')
                    .then((success) => {
                        Alert.alert("QR Code save successfully")
                        navigation.navigate("AllCollectionList")
                        return CameraRoll.save(filePath, 'photo')

                    })
                    .then(() => {
                        ToastAndroid.show('QRCode saved to gallery', ToastAndroid.SHORT);
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
                value={JSON.stringify(collectionData)}
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
