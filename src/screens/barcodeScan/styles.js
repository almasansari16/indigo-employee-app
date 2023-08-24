import { hp, wp } from '../../../App';

const {StyleSheet} = require('react-native');

export const BarcodeStyle = StyleSheet.create({
  container: {
    // backgroundColor: '#000',
    flex: 1,
    position:'relative'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageDiv:{
    backgroundColor:"#fff",
    marginTop: hp(5),
    borderRadius:10,
    borderColor:'#fff',
    borderWidth:5
  },
  btnView:{
    display:'flex',
    flexDirection:'row',
    marginVertical:hp(5),
    width:wp(100),
    justifyContent:'space-around',
    alignSelf:'flex-end',

  },
  btn:{
    backgroundColor:'#EEEEEE',
    display:'flex',
    justifyContent:'center',
    alignSelf:'center',
  },
  btn2:{
    backgroundColor:'#EEEEEE',
    display:'flex',
    justifyContent:'center',
    alignSelf:'center',
    top:0
  },
  btnText:{
    color:'#2f2260'
  }
});
