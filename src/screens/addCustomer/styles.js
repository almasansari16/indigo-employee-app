import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../App';

export const AddCustomerStyle = StyleSheet.create({
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
  input: {
    backgroundColor:'red'

  },
  loginBtn: {
    width: wp(60),
    height: hp(6),
    backgroundColor: '#EEEEEE',
    borderRadius: wp(10),
    marginVertical:hp(2)
  },
  btnText:{
    color: 'black',
    textAlign: 'center',
    fontSize:hp(2.8),
    fontWeight:'500'
  },
  btnView:{
    display:'flex',
    justifyContent:'center',
    alignItems:'flex-end',
    marginTop:hp(5),
    width:wp(90)
  },
  btn:{
    backgroundColor: "#282561",
   width:wp(30),
  }
});
