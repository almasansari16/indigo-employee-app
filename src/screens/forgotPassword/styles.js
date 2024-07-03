import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../App';

export const ForgotPasswordStyle = StyleSheet.create({
  container: {
    backgroundColor: '#2f2260',
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginTop: hp(3),
    fontFamily: 'Lato-Regular',
  },
  horizontalLine: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    width: wp(50),
    marginTop: hp(2),
    height: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    marginTop:hp(10),
    width: wp(80),
    color: '#EEEEEE',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: wp(10),
    paddingHorizontal: wp(5),
    marginVertical: hp(2),
    fontFamily: 'Lato-Regular',
  },
  loginBtn: {
    width: wp(50),
    height: hp(6),
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  btnText: {
    color: '#EEEEEE',
    textAlign: 'center',
    fontSize: hp(2.5),
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
  },
  linkText: {
    color: '#EEEEEE',
    fontSize: hp(1.8),
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: hp(2),
    fontFamily: 'Lato-Regular',
  },
});
