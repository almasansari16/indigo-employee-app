import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const AddCollectionStyle = StyleSheet.create({
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
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
      },
      input: {
        // marginVertical:10
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
        marginTop:hp(4),
        width:wp(90),
        marginBottom:20
      }
})