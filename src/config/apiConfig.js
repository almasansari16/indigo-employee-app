// apiConfig.js
import publicIP from 'react-native-public-ip';

export let BASE_URL = '';

export const configureBaseUrl = async () => {
  try {
    const ip = await publicIP();
    const PUBLIC_URL = 'http://203.170.79.58:8080/api';
    const LOCAL_URL = 'http://172.16.200.253:8080/api';
    const publicIpValue = '103.249.154.92';

    // Check if the live IP is the same as the public IP
    BASE_URL = ip === publicIpValue ? LOCAL_URL : PUBLIC_URL;

    console.log(BASE_URL, 'BASE-URL........');
  } catch (error) {
    console.error(error);
    // Handle error when unable to get IP address
  }
};


// 103.249.154.92