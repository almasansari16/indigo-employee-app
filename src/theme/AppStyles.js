import { StyleSheet, useColorScheme } from "react-native";
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import { hp } from "../../App";
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
})