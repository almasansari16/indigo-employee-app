import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../App';

export const LoginStyle = StyleSheet.create({
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
    marginTop:hp(3)
  },
  horizontalLine:{
    borderBottomColor:'#EEEEEE',
    borderBottomWidth:2,
    width:wp(15),
    marginTop:hp(2),
    height:2,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    width:wp(80),
    borderColor:"#EEEEEE",
    borderWidth:1,
    borderRadius:wp(10),
    marginBottom:hp(2)
    // marginVertical:10
  },
  loginBtn: {
    width: wp(50),
    height: hp(6),
    // width:wp(80),
    borderColor:"#EEEEEE",
    borderWidth:1,
    borderRadius:wp(10),
    marginVertical:hp(2)
  },
  btnText:{
    color: '#EEEEEE',
    textAlign: 'center',
    fontSize:hp(2.5),
    fontWeight:'500',

  }
});
