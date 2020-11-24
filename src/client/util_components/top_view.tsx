import React from 'react'
import {View, ViewStyle} from 'react-native'
import {StyleSheet, StatusBar} from 'react-native'
const styles = StyleSheet.create({
  top: {
    position: 'absolute', 
    width: '100%', 
    top: StatusBar.currentHeight, 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
const TopView: React.FC<{children: React.ReactNode, style?: ViewStyle}> = ({children, style}) => {
  return (
    <View style={{...styles.top, ...style}}>
      {children}
    </View >
  )
}
export default TopView
