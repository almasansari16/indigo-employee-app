import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const meetingCollectionStyle = StyleSheet.create({
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
        width:wp(80)
    },
    btnView:{
       display :'flex',
       justifyContent:'center',
       alignSelf:'center',
       marginTop:hp(10)
    },
    btn : {
        backgroundColor:"#282561",
        paddingVertical: hp(2),
        
    }
})