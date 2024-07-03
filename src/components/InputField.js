import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../App';

const InputField = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  label,
  keyboardType,
  style,
  autoCapitalize,
  icon
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize={autoCapitalize}
        />
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: hp(1.5),
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
    marginBottom: hp(1.5),
    marginLeft: 20,
  },

  input: {
    justifyContent: 'center',
    paddingLeft: wp(2.5),
    height: hp(7),
    fontFamily: 'Lato-Regular',
    // borderRadius: 5,
    // marginBottom: hp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: wp(2),
    height: hp(7),
    // width:wp(80),
    borderColor:"#EEEEEE",
    borderWidth:1,
    borderRadius:wp(10),
    marginBottom:hp(2),
    fontFamily:'Lato-Regular',
    color: "#EEEEEE"
  },
  iconContainer: {
    marginRight: wp(2), // Adjust margin as needed
  }
});

export default InputField;



// import React from 'react';
// import { TextInput, Text, StyleSheet, View } from 'react-native';
// import { hp, wp } from '../../App';

// const InputField = ({
//   value,
//   onChangeText,
//   placeholder,
//   placeholderTextColor,
//   secureTextEntry,
//   label,
//   keyboardType,
//   style,
//   autoCapitalize,
//   icon
// }) => {
//   return (
//     <View style={{ marginVertical: 10 }}>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={[styles.input, style]}
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           keyboardType={keyboardType}
//           secureTextEntry={secureTextEntry}
//           placeholderTextColor={placeholderTextColor}
//           autoCapitalize={autoCapitalize}
//         />
//         {icon && <View style={styles.iconContainer}>{icon}</View>}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   label: {
//     fontSize: hp(1.5),
//     fontWeight: '500',
//     color: 'white',
//     textAlign: 'left',
//     marginBottom: 5,
//     marginLeft: 10,
//     marginBottom: 8
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'grey', // Customize border color as needed
//     borderRadius: 5,
//     paddingHorizontal: wp(2),
//     height: hp(7)
//   },
//   input: {
//     flex: 1,
//     height: '100%', // Adjust height to fill container
//     paddingLeft: wp(2.5),
//     fontFamily: 'Lato-Regular',
//   },
//   iconContainer: {
//     marginRight: wp(2), // Adjust margin as needed
//   }
// });

// export default InputField;
