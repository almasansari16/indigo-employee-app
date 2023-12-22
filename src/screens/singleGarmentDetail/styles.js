import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const SingleGarmentStyle = StyleSheet.create({
    detailText :{
        color:'#282561',
        fontSize: wp(5),
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: hp(5)
    },
    collectionDetail:{
        backgroundColor : "#EEEEEE", 
        borderRadius: 12,
        paddingHorizontal:wp(5),
        paddingVertical: hp(2),
        marginTop: hp(5),
        width:wp(80),
        marginBottom:hp(10)
    },
    btnView:{
       display :'flex',
       justifyContent:'center',
       alignSelf:'center',
       marginTop:hp(10)
    },
    btn : {
        backgroundColor:"#282561",
        paddingVertical: hp(1),
        
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