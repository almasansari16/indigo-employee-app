import { StyleSheet, useColorScheme } from "react-native";
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import { hp, wp } from "../../App";
const isDarkMode = useColorScheme() === 'dark';
export const AppStyles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: isDarkMode ? '#2f2260' : '#fff',
        // backgroundColor: '#2f2260'
    },
    text:{
        fontSize:16,
        color: isDarkMode ? "#fff" : "#000"
  
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
      },
    backgroundColor: '#2f2260',
    horizontalLine:{
        borderBottomColor:'#EEEEEE',
        borderBottomWidth:2,
        marginTop:hp(2),
        height:2,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      header: {
        height: 64, // Adjust the height as needed
      },
      headerText: {
        fontSize: wp(5.5),
        fontWeight: '600',
        margin: 15,
        textAlign: 'left',
        fontFamily: 'Lato-Regular'
      },
      flexEvenly: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        display: 'flex',
        width: wp(100)
      },
      flexBetween: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        width: wp(100),
        marginHorizontal: wp(10)
      }
})