import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Icon, IconType} from './Icon';
import {hp, wp} from '../../App';

const IconInput = ({icon,style, placeholder, placeholderTextColor, autoCapitalize, onChangeText, value, error}) => {
  return (
    <>
      <View style={[styles.View , style]}>
        {icon}
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, error && styles.errorInput]}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default IconInput;

const styles = StyleSheet.create({
  View: {
    flexDirection: 'row',
   borderColor:'#282561',
   borderWidth:2,
    // width: wp(90),
    height: hp(7),
    marginTop: hp(4),
    borderRadius: wp(10),
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily:'Lato-Regular',
    fontSize:wp(4.5),
    color:'#282561',
  },
  errorInput: {
    // borderColor: 'red',
    // borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
    fontFamily:'Lato-Regular',
  },
});
