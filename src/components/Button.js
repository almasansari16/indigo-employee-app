import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { wp } from '../../App';

const Button = ({ title, onPress, style, textStyle,icon  }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
     {icon}
      <Text style={[styles.buttonText, textStyle]}>{title}  </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    // width:wp(40),
    borderRadius:wp(10)
  },
  buttonText: {
    color: '#282561',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily:'Lato-Bold',

  },
});

export default Button;
