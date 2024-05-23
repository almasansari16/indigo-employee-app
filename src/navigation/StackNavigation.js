import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { wp } from '../../App';
import Signup from '../screens/signup/Signup';
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
import AddExtraDetail from '../screens/extraDetail/AddExtraDetail';
import FinalOrderDetail from '../screens/finalOrderDetail/FinalOrderDetail';
import SendEmail from '../screens/sendEmail/SendEmail';
import SingleCustomer from '../screens/singleCustomer/SingleCustomer';
import QrCode from '../screens/qrCode/QrCode';
import SingleCollection from '../screens/singleCollection/SingleCollection';
import Scanner from '../screens/qrCode/Scanner';
import TabNavigation from './TabNavigation';
import DisplayBarcodeVlaue from '../screens/qrCode/DisplayBarcodeVlaue';
import CollectionDetail from '../screens/collectionDetail/CollectionDetail';
import NewQrCode from '../screens/barcodeScan/NewQrCode';
import FinalDetail from '../screens/finalDetail/FinalDetail';
import AddBrand from '../screens/addBrand/AddBrand';
import ExcelExportScreen from '../screens';
import Testing from '../screens/testingScreen/Testing';
import AddConcernPerson from '../screens/addNewConcernPerson/AddConcernPerson';
import GenerateQRcode from '../screens/generateQRcode/GenerateQRcode';
import SelectedGarments from '../screens/selectedExhibitionGarments/SelectedGarments';
import SingleGarmentColection from '../screens/singleGarmentDetail/SingleGarmentCollection';
import OrderDetail from '../screens/orderDetail/OrderDetail';
import SelectedMeetingCollection from '../screens/selectedCollectionForMeeting/SelectedMeetingCollection';
import CustomerPortal from '../screens/customerPortal/CustomerPortal';
import AdminPortal from '../screens/adminPortal/AdminPortal';
import AllEmployeeData from '../screens/allEmployeesData/AllEmployeeData';
import AllOrderData from '../screens/allOrdersData/AllOrderData';
import OrderDetailAdmin from '../screens/orderDetailforAdmin/OrderDetailAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/apiConfig';
// import { AuthContext } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';
import SwipeGesture from '../screens/swipable/Swipable';
import SingleCollectionDetail from '../screens/singleGarmentDetail/SingleCollectionDetail';
import UploadImage from '../components/UploadImage';
import OrderDetailForCustomer from '../screens/customerPortal/OrderDetailForCustomer';
import SendEmail2 from '../screens/sendEmail/SendEmail2';
import AllLoginCustomer from '../screens/allLoginCustomer/AllLoginCustomer';
import ShowFullImage from '../screens/customerPortal/ShowFullImage';
import index2 from '../screens/index2';


const handleLogout = async (navigation) => {

  const token = await AsyncStorage.getItem('accessToken');
  console.log(token, 'token in stack');

  // const navigation = useNavigation();
  try {
    // Fetch the token from wherever it is stored on the client side

    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log(response, "response")
    if (response.ok) {
      // Logout successful
      Alert.alert('Logout successful');
      navigation.navigate('Login')
      // Add any additional logic you want to perform after logout

    } else {
      // Handle logout error
      console.error('Logout failed');

      // Add any error handling logic here
    }
  } catch (error) {
    console.error('An error occurred during logout:', error);
    // Handle any network or other errors during logout
  }
};

const Stack = createNativeStackNavigator();
const CustomHeader2 = props => {
  console.log(props.options.title);
  const navigation = useNavigation()

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
      <Appbar.Action icon="logout" color="#000" onPress={() => handleLogout(props.navigation)} />
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
    fontFamily: 'Lato-Regular'

  },
});



const animationConfig = {
  animation: 'slide_from_right',
  anianimationDuration: 1050,
};

function StackNavigation() {
  const [isSignedIn, setIsSignedIn] = React.useState(null);

  React.useEffect(() => {
    checkIsSignedIn();
  }, []);
  // React.useEffect(async() => {
  //   const token = await AsyncStorage.getItem('accessToken');
  //   console.log(token , 'token in stack')
  // } , [])

  const checkIsSignedIn = async () => {
    try {
      const signedInValue = await AsyncStorage.getItem('token');
      setIsSignedIn(!!signedInValue); // Convert the value to a boolean
    } catch (error) {
      console.error('Error retrieving signed-in status:', error);
    }
  };
  console.log(isSignedIn, "isSignedIn")
  // const {userInfo, splashLoading} = React.useContext(AuthContext);
  if (isSignedIn === null) {
    // You can render a loading screen or return null
    return null;
  }


  return (
    <NavigationContainer>

      <Stack.Navigator
        //  initialRouteName={isSignedIn ? 'TabNavigation' : 'Login'}
        initialRouteName='Login'
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
          name="TabNavigation"
          component={TabNavigation}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            headerShown: false,
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
          name='SingleCustomer'
          component={SingleCustomer}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Customer List',
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
          name='SingleCollection'
          component={SingleCollection}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Collection Detail',
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
          name='AddBrand'
          component={AddBrand}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Add New Brand',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='AddConcernPerson'
          component={AddConcernPerson}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Add New Concern Person',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='CollectionDetail'
          component={CollectionDetail}
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
        <Stack.Screen
          name='SendEmail'
          component={SendEmail}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Send Email',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='SendEmail2'
          component={SendEmail2}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Send Email 2',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='QrCode'
          component={QrCode}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'QR Code',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='Scanner'
          component={Scanner}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            headerShown: false
            // title: 'QR Code',
            // headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          name='DisplayBarcodeVlaue'
          component={DisplayBarcodeVlaue}
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Barcode Value',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={NewQrCode}
          name='NewQrCode'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Barcode Value',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={FinalDetail}
          name='FinalDetail'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Final Detail',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={Testing}
          name='Testing'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Orders',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={GenerateQRcode}
          name='GenerateQRcode'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Generate QR code',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={SelectedGarments}
          name='SelectedGarments'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Selected Exhibition Garments',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={SingleGarmentColection}
          name='SingleGarmentColection'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Selected Garment Collections',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={SingleCollectionDetail}
          name='SingleCollectionDetail'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Single Collection Detail',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={OrderDetail}
          name='orderDetail'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Order Detail',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={SelectedMeetingCollection}
          name='SelectedMeetingCollection'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Selected Meeting Collection',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={CustomerPortal}
          name='CustomerPortal'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Customer Portal',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={AdminPortal}
          name='AdminPortal'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Admin Portal',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={AllEmployeeData}
          name='AllEmployeeData'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'All Employee Data',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={AllLoginCustomer}
          name='AllLoginCustomer'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'All Customers',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={AllOrderData}
          name='AllOrderData'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'All Order Data',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={OrderDetailAdmin}
          name='OrderDetailAdmin'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: ' Order Data Admin',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={OrderDetailForCustomer}
          name='OrderDetailForCustomer'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: ' Order Detail For Customer',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={SwipeGesture}
          name='SwipeGesture'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'swipable',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={UploadImage}
          name='UploadImage'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'UploadImage',
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen
          component={ShowFullImage}
          name='ShowFullImage'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'Full Image',
            headerTitleAlign: 'center',
          }} />
            {/* <Stack.Screen
          component={index2}
          name='index2'
          options={{
            ...animationConfig,
            orientation: 'portrait',
            title: 'testing',
            headerTitleAlign: 'center',
          }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
