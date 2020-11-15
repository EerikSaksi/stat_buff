import React from 'react'
import {gql, useQuery} from '@apollo/client'
import {Text} from 'react-native'
import CenteredView from '../../util_components/centered_view'
import Loading from '../../util_components/loading'

const GROUP_INFO = gql `query group_info($username: String!){
  user(username: $username) {
    groupByGroupname{
      name
    }
  }
}`
const SEARCH_GROUPS = gql`query search_groups($query: String!){
  groups(filter: {name:{startsWithInsensitive: $query}} first: 5){
  	nodes{
      name
  	}
  }
}`
type NavigationProps = {params: {username: string}};

const Group: React.FC<{route: NavigationProps}> = ({route}) => {
  const {username} = route.params

  //try fetch group info
  const {data, loading} = useQuery(GROUP_INFO, {
    variables: {username}
  })
  if (loading){
    return <Loading/>
  }
  return (
    <CenteredView>
      <Text>uh oh</Text>
    </CenteredView>
  )

}
export default Group
