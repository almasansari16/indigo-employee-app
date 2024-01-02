/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  Alert,
  ToastAndroid
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import SplashScreen from 'react-native-splash-screen';
import StackNavigation from './src/navigation/StackNavigation';
import Login from './src/screens/login/Login';
import TabNavigation from './src/navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { ToastProvider } from 'react-native-paper-toast';
import { AuthProvider } from './src/context/authContext';
import { NetworkInfo } from 'react-native-network-info';
import NetInfo from "@react-native-community/netinfo";
import publicIP from 'react-native-public-ip';
import { BASE_URL } from './src/config/config';

// function Section({children, title}){
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [orientation, setOrientation] = React.useState('portrait');
  const [ip, setIp] = React.useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    console.log(orientation, "ooooooooo")

    SplashScreen.hide();
    LogBox.ignoreAllLogs();
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);


  const handleConnectivityChange = (newState) => {
    if (newState.isConnected) {
      if (newState.type === 'wifi') {
        console.log('WiFi connected');
        // Alert.alert('WiFi connected');
        ToastAndroid.showWithGravityAndOffset(
          'WiFi connected!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50
        );
        // Do something with WiFi connection
      } else if (newState.type === 'cellular') {
        console.log('Cellular data connected');
        // Alert.alert('Cellular data connected');
        ToastAndroid.showWithGravityAndOffset(
          'Cellular data connected!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50
        );
        // Do something with cellular data connection
      }
    } else {
      console.log('Disconnected');
      // Alert.alert('Disconnected');
      // Alert.alert('Cellular data connected');
      ToastAndroid.showWithGravityAndOffset(
        'Disconnected!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50
      );
      // Handle disconnection or fallback to a default URL
    }
  };

  useEffect(() => {
    publicIP()
      .then(newIp => {
        console.log(newIp, 'ip.................');
        setIp(newIp);  // Set the new IP in the state
      })
      .catch(error => {
        console.log(error);
        // Handle error when unable to get IP address
      });
  }, []);

  useEffect(() => {
    const PUBLIC_URL = 'http://203.170.79.58:8080/api';
    const LOCAL_URL = 'http://172.16.200.253:8080/api';
    const publicIp = '103.249.154.92';

    // Check if the live IP is the same as the public IP
    const BASE_URL = ip === publicIp ? LOCAL_URL : PUBLIC_URL;

    console.log(BASE_URL, 'BASE-URL........');
  }, [ip]);  // Add 'ip' as a dependency


  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    // Initial check when the component mounts
    NetInfo.fetch().then(handleConnectivityChange);

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#000" />
      <Provider store={store}>
        <AuthProvider>
          <ToastProvider>
            <StackNavigation />
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export { hp, wp, BASE_URL };
export default App;
