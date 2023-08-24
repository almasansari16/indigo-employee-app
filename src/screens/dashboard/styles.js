import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../App';

export const dashboardStyles = StyleSheet.create({
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:100
  },
  links: {
    display: 'flex',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:hp(5),
    width: wp(80),
    height: hp(20),
    borderColor:"#EEEEEE",
    borderWidth:1,
    borderRadius:wp(5),
    alignItems:'center'
  },
  linksText:{
    fontSize:wp(6),
    fontWeight:'500',
    color:'#EEEEEE',
    fontFamily:'Lato-Regular',
  },

});
