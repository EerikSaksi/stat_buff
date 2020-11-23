import React from 'react'
import {View} from 'react-native'
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
const TopView: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <View style={styles.top}>
      {children}
    </View >
  )
}
export default TopView
