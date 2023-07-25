import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../App';
import {AppStyles} from '../../theme/AppStyles';

export const FinalOrderDetailStyles = StyleSheet.create({
  container: {
    // backgroundColor:AppStyles.backgroundColor,
    flex: 1,
    position: 'relative',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:hp(5)
  },
  heading: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    // marginTop: hp(2),
    fontFamily:'Lato-Regular'
  },
  detailView: {
    backgroundColor: '#EEEEEE',
    borderRadius: wp(5),
    width:wp(90),
    marginTop: hp(4),
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  detailView2: {
    backgroundColor: '#EEEEEE',
    borderRadius: wp(5),
    width:wp(90),
    marginTop:-7,
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  detailText: {
    color: '#2f2260',
    fontSize: 18,
    fontWeight: '500',
    marginTop: hp(2),
    fontFamily:'Lato-Regular'
  },
  btnView: {
    display: 'flex',
    marginVertical: hp(5),
    rowGap: 20,
  },
  btn:{
    backgroundColor:'#EEEEEE'

  },
  modalInput:{
    borderColor:'#2f2260',
    borderWidth:2,
    borderRadius:wp(10)
  },
  modalBtn:{
    backgroundColor:'#2f2260',
    display:'flex',
    justifyContent:'center',
    alignSelf:'center',
    marginVertical:20,
    width:wp(40)
  },
  btnText:{
    color:'#FFF',
    fontFamily:'Lato-Regular'
  },
  icon :{
    display:'flex',
    justifyContent:'flex-end',
    alignSelf:'flex-end',
    marginTop:-8,
  }
});
