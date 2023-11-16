import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const SendEmailStyle = StyleSheet.create({
    btn:{
        backgroundColor:'#EEEEEE',
        width:wp(80),
        height:hp(5),
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
        borderColor:"#282561",
        borderWidth:1,
        borderRadius:wp(5),
        marginBottom:hp(2),
        fontFamily:'Lato-Regular',
        color: "#282561"
        // marginVertical:10
      },
})