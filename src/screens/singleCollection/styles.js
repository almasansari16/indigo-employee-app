import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const SingleCollectionStyle = StyleSheet.create({
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
        minWidth:wp(80)
    },
    btnView:{
        position:'absolute',
        bottom: hp(-50),
    },
    btn : {
        backgroundColor:"#EEEEEE",
        paddingVertical: hp(2)
    }
})