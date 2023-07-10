import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../App';

export const CustomerDetailStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    position: 'relative',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    marginTop: hp(2),
  },
  detailView: {
    backgroundColor: '#EEEEEE',
    borderRadius: wp(5),
    marginTop:hp(4),
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
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    marginTop: hp(2),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: wp(100),
    bottom: -250,
  },
});
