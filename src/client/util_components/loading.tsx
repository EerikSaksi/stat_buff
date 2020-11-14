import React from 'react'
import CenteredView from './centered_view'
import {ActivityIndicator} from 'react-native'

const Loading: React.FC = () => {
  return(
    <CenteredView>
      <ActivityIndicator/>
    </CenteredView>
  )
}
export default Loading
