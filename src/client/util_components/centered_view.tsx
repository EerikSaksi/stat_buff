import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
})

const CenteredView: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (<View style={styles.container} >{children}</View>)
}

export default CenteredView
