import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const FinalDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
      },
      heading: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '600',
        textAlign:'center',
        marginTop:hp(3),
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
        marginTop:hp(5),
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
        fontSize: 16,
        fontWeight: '500',
        lineHeight: hp(4),
        // marginTop: hp(1.5),
        fontFamily:'Lato-Regular',
      },
      btnView: {
        display: 'flex',
        marginVertical: hp(5),
        rowGap: 20,
      },
      btn:{
        backgroundColor:'#EEEEEE',
        width:wp(40),
        marginTop:hp(5),
        alignSelf:'flex-end',
        marginBottom: hp(5)
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
      },
      input:{
       color:'#EEEEEE',
       borderRadius:wp(8),
       width:wp(90)
      }
})