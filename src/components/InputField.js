import React from 'react';
import {TextInput, Text, StyleSheet, View} from 'react-native';
import {hp, wp} from '../../App';

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  label,
  keyboardType,
  style,
}) => {
  return (
    <View style={{marginVertical:10}}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: hp(1.5),
    fontWeight: '500',
    color: 'white',
    // marginRight: 210,
    textAlign: 'left',
    marginBottom: 5,
  },

  input: {
    // width: wp(90),
    justifyContent: 'center',
    paddingLeft: wp(2.5),
    height: hp(7),
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    // marginBottom: hp(1),
  },
});

export default InputField;
