import React, {useState} from 'react'
import {gql, useQuery, useReactiveVar} from '@apollo/client';
import {Text, View, StatusBar} from 'react-native'
import Loading from '../../util_components/loading';
import ExerciseModal from "./exercise_modal";
import {usernameVar} from '../../apollo/cache';
import GenericSprite from '../../sprites/generic_sprite';

import BodyStatsModal from "./bodystats_modal"

import {Button} from 'react-native-elements';
import useSkillTitle from '../../hooks/useSkillTitle';


const USER_BODY_STATS = gql`
  query($username: String!){
    bodystatByUsername(username: $username){
      ismale
    }
  }
`


const USER = gql`
query user_query($username: String!){
    user(username: $username){
      username
    }
}
`
const STRENGTH = gql`
query{
  averageStrength
}
`

const User: React.FC = () => {
  const username = useReactiveVar(usernameVar)
  const [strengthModalVisible, setStrengthModalVisible] = useState(false)
  const [bodystatsModalVisible, setBodystatsModalVisible] = useState(false)
  const {data} = useQuery(USER, {
    variables: {username},
  })

  const {data: exerciseData, refetch: exerciseRefetch} = useQuery(STRENGTH, {
    variables: {username}
  })
  const {data: userBodyStats, refetch: userBodyStatsRefetch} = useQuery(USER_BODY_STATS, {
    variables: {username},
    onCompleted: (data) => {
      //haven't input their body stats, then open the option
      if (!data.bodystatByUsername) {
        setBodystatsModalVisible(true)
      }
    }
  })

  const {skillTitle} = useSkillTitle(exerciseData && exerciseData.averageStrength ? parseFloat(exerciseData.averageStrength) : undefined)
  if (!data) {
    return (<Loading />)
  }
  return (
    <View style={{justifyContent: 'center', flex: 10, alignItems: 'center', top: StatusBar.currentHeight}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
        <Button style={{flex: 1}} title='Update Body Stats' onPress={() => setBodystatsModalVisible(true)} />
        <Button style={{flex: 1}} disabled={!(userBodyStats && userBodyStats.bodystatByUsername)} title='Update Lifts' onPress={() => setStrengthModalVisible(true)} />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 30}}> {`Welcome back, ${username}.`} </Text>
        {exerciseData && exerciseData.averageStrength ? <Text style={{textAlign: 'center'}}>{`You're stronger than ${parseFloat(exerciseData.averageStrength).toFixed(2)}% (${skillTitle})`}</Text> : null}
      </View>
      <ExerciseModal visible={strengthModalVisible} setVisible={setStrengthModalVisible} username={username} refetchParent={exerciseRefetch} />
      <BodyStatsModal visible={bodystatsModalVisible} setVisible={setBodystatsModalVisible} username={username} refetchParent={userBodyStatsRefetch} />
      <View style={{flex: 5, justifyContent: 'flex-end', }}>
        <GenericSprite skillTitle = {"intermediate"}/>
      </View>
      <View style={{flex: 1, width: '30%'}}>
        <Button disabled={!(exerciseData && exerciseData.averageStrength)} title='Log workout' onPress={() => setBodystatsModalVisible(true)} />
      </View>
    </View>
  )
}
export default User
