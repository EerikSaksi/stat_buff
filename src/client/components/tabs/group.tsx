import React, {useState} from 'react'
import {gql, useQuery} from '@apollo/client'
import {Text, TextInput, StyleSheet, View, FlatList, StatusBar} from 'react-native'
import CenteredView from '../../util_components/centered_view'
import Loading from '../../util_components/loading'

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const GROUP_INFO = gql`query group_info($username: String!){
  user(username: $username) {
    groupByGroupname{
      name
    }
  }
}`
const SEARCH_GROUPS = gql`query search_groups($query: String!){
  groups(filter: {name:{startsWithInsensitive: $query}}, first: 5){
  	nodes{
      name
  	}
  }
}`
type NavigationProps = {params: {username: string}};

const Group: React.FC<{route: NavigationProps}> = ({route}) => {
  console.log('group')
  const {username} = route.params
  const [query, setQuery] = useState("")

  //used to search for groups (don't search if no query)
  const {data: searchData, loading: searchLoading} = useQuery(SEARCH_GROUPS, {
    variables: {query},
    skip: query === ""
  })

  //try fetch group info
  const {data: groupData, loading: groupLoading, error} = useQuery(GROUP_INFO, {
    variables: {username},
  })

  return (
    <React.Fragment>
      <View style={{position: 'absolute', width: '100%', top: StatusBar.currentHeight}}>
        <View style={styles.top}>
          <TextInput placeholder="Search for teams" value={query} onChangeText={(t) => setQuery(t)} />
          <FlatList data={searchData ? searchData.groups.nodes.map(group => group.name) : []} renderItem={({item}) => <Text>{item}</Text>} />
        </View>
      </View>
      {
        groupLoading
          ?
          <Loading />
          :
          <CenteredView >
            {
              groupData
                ?
                <Text>{` part of: "$groupData.user.groupByGroupname.name`}</Text>
                :
                <Text>You have not joined a team.</Text>
            }

          </CenteredView>

      }
    </React.Fragment >
  )
}
export default Group
