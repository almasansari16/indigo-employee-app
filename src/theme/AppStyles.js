import { StyleSheet, useColorScheme } from "react-native";
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
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
    backgroundColor: '#2f2260'
})