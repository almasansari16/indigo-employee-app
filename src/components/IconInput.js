import React from 'react'
import { View, TextInput, StyleSheet , Text} from 'react-native'
import { Icon, IconType } from './Icon'
import { hp, wp } from '../../App'



const IconInput = ({icon , placeholder, onChangeText, value}) => {
  return (
    <View style={styles.View}>
            {icon}
        <TextInput placeholder={placeholder} onChangeText={onChangeText} value={value} placeholderTextColor={'gray'}/>
    </View>
  )
}

export default IconInput


const styles = StyleSheet.create({
    View: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        width: wp(90),
        height: hp(7),
        marginTop: hp(4),
        borderRadius: 8
    },
    input: {

    }
})

