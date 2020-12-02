import React from 'react'
import {Text} from 'react-native'
import TopView from '../../../util_components/top_view'

const YourGroup: React.FC<{groupname: string}> = ({groupname}) => {
  return(
    <TopView>
      <Text>{`You're a part of "${groupname}"`}</Text>
    </TopView>
  )
}
export default YourGroup
