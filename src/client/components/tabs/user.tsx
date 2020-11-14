import React, {useEffect} from 'react'
import {gql, useLazyQuery} from '@apollo/client'
import CenteredView from '../../util_components/centered_view'
import {useTokenQuery, getCurrentTokenID} from './hooks/use_token_query';
const User: React.FC = () => {
  useEffect(() => {
  }, [])
  return(
    <CenteredView>

    </CenteredView>
  )

}
export default User
