import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Color = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: SCREEN_WIDTH / 2,
          borderLeftColor: 'transparent',
          borderBottomWidth: SCREEN_HEIGHT / 2.5,
          borderBottomColor: 'transparent',
          borderRightWidth: SCREEN_WIDTH / 2,
          borderRightColor: 'blue',
        }}
      />
    </View>
  );
};

export default Color;
