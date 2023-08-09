import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const SignupStyles = StyleSheet.create({
  container: {
    backgroundColor: '#2f2260',
    flex: 1,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginTop: hp(3),
    fontFamily: 'Lato-Regular'

  },
  horizontalLine: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    width: wp(20),
    marginTop: hp(2),
    height: 2,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    width: wp(80),
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: wp(10),
    marginBottom: hp(2),
    fontFamily: 'Lato-Regular',
    color: "#EEEEEE"
    // marginVertical:10
  },
  signupBtn: {
    width: wp(50),
    height: hp(6),
    // width:wp(80),
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: wp(10),
    marginVertical: hp(2)
  },
  btnText: {
    color: '#EEEEEE',
    textAlign: 'center',
    fontSize: hp(2.5),
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'Lato-Regular'

  },
  linkText: {
    color: '#EEEEEE',
    textAlign: 'center',
    fontSize: hp(1.8),
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: hp(2),
    fontFamily: 'Lato-Regular',
    

  },
  boldText: {
    fontWeight: '700',
    fontSize: hp(2),
    fontFamily: 'Lato-Regular'

  }
})