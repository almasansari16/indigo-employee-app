import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const SingleCollectionStyle = StyleSheet.create({
    detailText :{
        color:'#282561',
        fontSize: wp(5),
        fontWeight: '600',
        fontFamily: 'Lato-Regular',
        lineHeight: hp(4)
    },
    collectionDetail:{
        backgroundColor : "#EEEEEE", 
        borderRadius: 12,
        paddingHorizontal:wp(5),
        paddingVertical: hp(2),
        marginTop: hp(2),
        maxWidth:wp(80),
        marginBottom:hp(5)
    },
    garmentDetail : {
        backgroundColor : "#EEEEEE", 
        width:wp(80),
        borderRadius: 12,
        paddingHorizontal:wp(5),
        paddingVertical: hp(2),
        marginBottom:hp(5),
     
    }, 
    btnView:{
        position:'absolute',
        bottom: hp(-50),
    },
    btn : {
        backgroundColor:"#EEEEEE",
        paddingVertical: hp(2),
        width: wp(60),
        alignSelf:'center',
        marginTop:10
    }
})