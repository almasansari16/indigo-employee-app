import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const SendEmailStyle = StyleSheet.create({
    btn:{
        backgroundColor:'#EEEEEE',
        width:wp(100),
        height:hp(6),
        borderRadius:wp(3),
        marginBottom:hp(3),
        alignSelf:'center'
      },
      view:{
        marginTop: hp(3),
      },
      text :{
         
      },
      input: {
        width:wp(80),
        borderRadius:wp(5),
        fontFamily:'Lato-Regular',
  
        alignSelf:'center',
        color:"#EEEEEE"
      },
      modalInput:{
        width:wp(80),
        borderWidth:1,
        borderRadius:wp(5),
        fontFamily:'Lato-Regular',
        color: "#282561",
        alignSelf:'center',
      }
})