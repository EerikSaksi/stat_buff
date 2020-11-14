import React from 'react'
import {gql, useLazyQuery} from '@apollo/client'
import CenteredView from '../../util_components/centered_view'
import {getCurrentUser} from 'expo-google-sign-in'

const GROUP_BY_TOKEN_ID = gql`query groupbytokenid($tokenId: String!){
    groupByTokenId(tokenId: $tokenId){
      groupname
    }
}`
const Group: React.FC = () => {
  return(
    <CenteredView>

    </CenteredView>
  )

}
export default Group
