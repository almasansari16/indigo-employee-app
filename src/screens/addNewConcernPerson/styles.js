import { hp, wp } from "../../../App";

const { StyleSheet } = require("react-native");

const AddConcernPersonStyle = StyleSheet.create({
    subHeading: {
        color: '#282561',
        textAlign: 'center',
        fontSize: wp(5.5),
        fontWeight: '700',
        marginTop: hp(3)
    },
    modalbtn: {
        backgroundColor: '#282561',
        padding: 5,
        width: wp(40),
        alignSelf: 'center',
        marginTop: hp(3)
    },
    input: {
        width: wp(90),
        alignSelf: 'center'
    }
})

export default AddConcernPersonStyle;