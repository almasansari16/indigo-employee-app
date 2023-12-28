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
  LogBox
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
  useEffect(() => {

    // Get Local IP
    NetworkInfo.getIPAddress().then(ipAddress => {
      console.log(ipAddress, 'ipAddress');
    });

    // Get IPv4 IP (priority: WiFi first, cellular second)
    NetworkInfo.getIPV4Address().then(ipv4Address => {
      console.log(ipv4Address, 'ipv4Address');
    });

    // Get Broadcast
    NetworkInfo.getBroadcast().then(broadcast => {
      console.log(broadcast, 'broadcast');
    });

    // Get SSID
    NetworkInfo.getSSID().then(ssid => {
      console.log(ssid, 'ssid');
    });

    // Get BSSID
    NetworkInfo.getBSSID().then(bssid => {
      console.log(bssid, 'bssid');
    });

    // Get Subnet
    NetworkInfo.getSubnet().then(subnet => {
      console.log(subnet, 'subnet');
    });

    // Get Default Gateway IP
    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      console.log(defaultGateway, 'defaultGateway');
    });

    // Get frequency (supported only for Android)
    NetworkInfo.getFrequency().then(frequency => {
      console.log(frequency, 'frequency');
    });


    NetInfo.fetch().then((connectionInfo) => {
      // Check the type of connection
      if (connectionInfo.isConnected) {
        if (connectionInfo.type === 'wifi') {
          // Connected to WiFi, use local IP
          // return localIp;
          console.log('wifi')
        } else if (connectionInfo.type === 'cellular') {
          // Connected via mobile data, use live IP
          // return liveIp;
          console.log('data')
        }
      }
  
      // Default to a fallback URL (e.g., for offline scenarios)
      return 'fallback_url';
    });
  
  }, [])
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
export { hp, wp };
export default App;
