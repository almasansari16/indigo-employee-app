import { hp, wp } from "../../../App";

const { StyleSheet } = require("react-native");

export const SingleCustomerStyle = StyleSheet.create({
    detailText :{
        color:'#EEEEEE',
        fontSize: wp(5),
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: hp(5)
    }
})