import { hp, wp } from "../../../App";

const { StyleSheet } = require("react-native");

const AllCollectionStyle = StyleSheet.create({
    input: {
        width:wp(80),
       
       
        fontFamily:'Lato-Regular',
        color: "#282561"
        // marginVertical:10
      },
      addBtn : {
       
     },
     icon : {
         color: '#EEEEEE',
         fontWeight: '700'
     },
     Pagination:{
         color:'white',
         fontSize: 40,
        marginBottom: hp(10)  
     },
})

export default AllCollectionStyle