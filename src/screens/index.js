import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import { wp } from '../../App';

function Color() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ba6b4d', '#f9f1da', '#ba6b4d']}
        style={styles.linearGradient}
        start={{x: 0.3, y: 0}}
        end={{x: 1, y: 1}}
      >
        <Text>Vertical Gradient</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    width: wp(100)

  },
})
export default Color