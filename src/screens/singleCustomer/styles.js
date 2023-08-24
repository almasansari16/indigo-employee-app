import { hp, wp } from "../../../App";

const { StyleSheet } = require("react-native");

export const SingleCustomerStyle = StyleSheet.create({
    detailText :{
        color:'#2f2260',
        fontSize: wp(4.5),
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: hp(5)
    },
    brandName : {
        color:'#EEEEEE',
        fontSize: wp(8),
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: hp(5),
        marginTop:hp(2)
    },
    personView:{
        backgroundColor: '#EEEEEE',
        borderRadius:wp(5),
        marginVertical:hp(2),
        padding:5
    },
    btn:{
        backgroundColor:'#EEEEEE',
        marginTop:10,
        padding:5,
        width:wp(40),
        alignSelf:'center',
        marginBottom:hp(2)
    }
})