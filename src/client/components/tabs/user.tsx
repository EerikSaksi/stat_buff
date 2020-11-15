import React, {useEffect, useState} from 'react'
import {Text} from 'react-native'
import CenteredView from '../../util_components/centered_view'
import {useTokenQuery, getCurrentTokenID} from '../../hooks/use_token_query';
import Loading from '../../util_components/loading';

type NavigationProps = {params: {username: string}};

const User: React.FC<{route: NavigationProps}> = ({route}) => {
  const {username} = route.params
  const [tokenID, setTokenID] = useState<string | undefined>(undefined)
  const {loading, data} = useTokenQuery(tokenID)
  useEffect(() => {
    const fetchUserData = async () => {
      setTokenID(await getCurrentTokenID())
    }
    fetchUserData()
  }, [])
  if (loading) {
    return (<Loading />)
  }
  return (
    <CenteredView>
      <Text>{data && data.user ? data.user.username : "User not found"}</Text>
    </CenteredView>
  )

}
export default User
