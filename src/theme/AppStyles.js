import { StyleSheet, useColorScheme } from "react-native";
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
const isDarkMode = useColorScheme() === 'dark';
export const AppStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
    text:{
        fontSize:16,
        color: isDarkMode ? "red" : "blue"
    }
})