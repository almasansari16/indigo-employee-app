import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { wp } from '../../App';
import Login from '../screens/login/Login';
import AddCustomer from '../screens/addCustomer/AddCustomer';
import { CameraView } from '../components/camera/CameraView';
import CameraPage from '../screens/addCustomer/Camera';
import BarcodeScan from '../screens/barcodeScan/BarcodeScan';
import QrCodeScanner from '../screens/barcodeScan/QrCodeScanner';
import CustomerDetail from '../screens/customerDetail/CustomerDetail';
import Color from '../screens';
import Dashboard from '../screens/dashboard/Dashboard';
import AddCollection from '../screens/addCollection/AddCollection';
import AllCustomersList from '../screens/allCustomers/AllCustomersList';
import AllCollectionList from '../screens/allCollection/AllCollectionList';
import Signup from '../screens/signup/Signup';
import AddExtraDetail from '../screens/extraDetail/AddExtraDetail';
import FinalOrderDetail from '../screens/finalOrderDetail/FinalOrderDetail';


const CustomHeader2 = props => {
  console.log(props.options.title);
  return (
    <Appbar.Header
      style={{
        backgroundColor: '#EEEEEE',
      }}
      theme={{
        colors: {
          backgroundColor: '#D11F27',
          accent: 'white',
          secondary: 'yellow',
        },
      }}>
      <Appbar.BackAction
        animated
        android_ripple
        style={{ color: '#000' }}
        color="#000"
        onPress={() => {
          props?.navigation.goBack();
        }}
      />
      <Appbar.Content
        title={props.options.title}
        mode="small"
        style={{ color: 'white' }}
        color="black"
        titleStyle={styles.headerText}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64, // Adjust the height as needed
  },
  headerText: {
    fontSize: wp(5.5),
    fontWeight: '600',
    margin: 15,
    textAlign: 'left',
    fontFamily:'Lato-Regular'

  },
});

const Stack = createNativeStackNavigator();

const animationConfig = {
  animation: 'slide_from_right',
  anianimationDuration: 1050,
};

function StackNavigation() {
  const [isSignedIn, setIsSignedIn] = React.useState(null);

  React.useEffect(() => {
    checkIsSignedIn();
  }, []);

  const checkIsSignedIn = async () => {
    try {
      const signedInValue = await AsyncStorage.getItem('isSignedIn');
      setIsSignedIn(!!signedInValue); // Convert the value to a boolean
    } catch (error) {
      console.error('Error retrieving signed-in status:', error);
    }
  };

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ navigation, route }) => {
          const options = route?.params?.headerOptions || {};
          const backgroundColor = options.headerBackgroundColor || '#EEEEEE';
          const fontColor = options.fontColor || 'white';
          const screenName = route.name;

          return {
            header: props => (
              <CustomHeader2
                backgroundColor={backgroundColor}
                fontColor={fontColor}
                screenName={screenName}
                {...props}
              />
            ),
          };
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            ...animationConfig,
            orientation: 'portrait',

            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            ...animationConfig,
            orientation: 'portrait',

            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Dashboard',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AddCustomer"
          component={AddCustomer}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Add Customer',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BarcodeScan"
          component={BarcodeScan}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'QR Code Scan',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CameraView"
          component={CameraView}
          options={{
            ...animationConfig,
            orientation: 'portrait',

            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CameraPage"
          component={CameraPage}
          options={{
            ...animationConfig,
            orientation: 'portrait',

            headerShown: false,
          }}
        />
        <Stack.Screen
          name="QrCodeScanner"
          component={QrCodeScanner}
          options={{
            ...animationConfig,
            orientation: 'portrait',

            headerShown: false,
          }}
        />
        <Stack.Screen
          name='CustomerDetail'
          component={CustomerDetail}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Customer Order Detail',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='AllCustomersList'
          component={AllCustomersList}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Customers List',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='AllCollectionList'
          component={AllCollectionList}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Collection List',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='AddCollection'
          component={AddCollection}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Add Collection',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='Color'
          component={Color}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            headerShown: false
          }} />
        <Stack.Screen
          name='AddExtraDetail'
          component={AddExtraDetail}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Add Extra Detail',
            headerTitleAlign: 'center',
          }} />
          <Stack.Screen
          name='FinalOrderDetail'
          component={FinalOrderDetail}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Final Order Detail',
            headerTitleAlign: 'center',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
