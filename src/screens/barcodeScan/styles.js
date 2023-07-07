import { hp, wp } from '../../../App';

const {StyleSheet} = require('react-native');

export const BarcodeStyle = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
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
    justifyContent:'center',
    alignItems:'flex-end',
    marginTop:hp(8),
    width:wp(90)
  }
});
