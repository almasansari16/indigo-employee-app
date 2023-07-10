import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const Color = () => {
    
        return (
            <View style={{ flex: 1 }}>
                <View
                style={{
                    width: SCREEN_WIDTH,
                    height: 0,
                    borderTopColor: "blue",
                    borderTopWidth: SCREEN_HEIGHT / 2.5,
                    borderRightWidth: SCREEN_WIDTH,
                    borderRightColor: 'transparent'
                }}
                />
            </View>
        )
    
}

export default Color