import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const AddBrandStyle = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  input:{
    width:wp(90)
  },
  subHeading: {
    color :'#282561',
    textAlign:'center',
    fontSize:wp(5.5),
    fontWeight: '700',
    marginTop: hp(3)
  },
  btnText: {
    color: 'black',
    textAlign: 'center',
    fontSize: hp(2.8),
    fontWeight: '500'
  },
  btnView: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: hp(5),
    width: wp(90)
  },
  btn: {
    backgroundColor: "#282561",
    width: wp(30),
  }
})