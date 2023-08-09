import { StyleSheet } from "react-native";
import { hp, wp } from "../../../App";

export const QrCodeStyle = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
      },
      center: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      imageDiv:{
        backgroundColor:"#fff",
        marginTop: hp(5),
        borderRadius:10,
        borderColor:'#fff',
        borderWidth:5
      },
      btnView:{
        display:'flex',
        marginVertical:hp(5),
        rowGap: 20,
        width:wp(50),
        justifyContent:'center',
        alignSelf:'center'
      },
      btn:{
        backgroundColor:'#EEEEEE',
        display:'flex',
        justifyContent:'center',
        alignSelf:'center',
        // marginVertical:20,
        width:wp(40)
      },
      btnText:{
        color:'#2f2260'
      },
      detailText: {
        color: '#2f2260',
        fontSize: 18,
        fontWeight: '500',
        marginTop: hp(2),
        fontFamily:'Lato-Regular'
      },
})