import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../App';

export const dashboardStyles = StyleSheet.create({
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:hp(5),
    columnGap:wp(8)
    
  },
  links: {
    width: wp(40),
    height: hp(30),
    backgroundColor: '#EEEEEE',
    borderRadius: wp(5),
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  },
  linksText:{
    fontSize:wp(5),
    fontWeight:'500'
  }
});
