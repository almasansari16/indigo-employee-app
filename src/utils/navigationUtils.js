// navigationUtils.js
import { CommonActions } from '@react-navigation/native';

export const navigateToLogin = ({navigation}) => {
  navigation.navigate('Login');
};
export const navigateToDashboard = ({navigation}) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'TabNavigation', 
      })
    );
  };