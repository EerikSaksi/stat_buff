import React, {useState} from 'react'
import {gql, useMutation, useQuery, useReactiveVar} from '@apollo/client'
import {Text, TextInput, View, FlatList} from 'react-native'
import TopView from '../../../util_components/top_view'
import {usernameVar} from '../../../apollo/cache'


const SEARCH_GROUPS = gql`query search_groups($query: String!){
  groups(filter: {name:{startsWithInsensitive: $query}}, first: 5){
  	nodes{
      nodeId
      name
  	}
  }
}`
const UPDATE_GROUP = gql`mutation updategroup($username: String!, $groupname: String!){
  updateUser(input: {username: $username, patch: {groupname: $groupname}}){
    clientMutationId
  }
}`

const JoinGroup: React.FC<{refetchParentGroup: () => void}> = ({refetchParentGroup}) => {
  const [query, setQuery] = useState("")
  const username = useReactiveVar(usernameVar)

  //used to search for groups (don't search if no query)
  const {data: searchData} = useQuery(SEARCH_GROUPS, {
    variables: {query},
    skip: query === ""
  })

  const [updateGroup] = useMutation(UPDATE_GROUP, {
    //whenever you update group also refetch user data
    onCompleted: () => refetchParentGroup()
  })

  return (
    <TopView>
      <TextInput placeholder="Search for teams" value={query} onChangeText={(t) => setQuery(t)} />
      <FlatList data={searchData ? searchData.groups.nodes.map(group => group.name) : []}
        renderItem={({item: groupname}) => <View key = {groupname} style={{borderBottomWidth: 1}} onTouchEnd={() => updateGroup({variables: {username, groupname}})} ><Text>{groupname}</Text></View>} />
    </TopView>
  )
}
export default JoinGroup
