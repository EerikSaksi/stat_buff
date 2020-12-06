import React, {useState} from 'react'
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const STATS = gql`query($groupname: String!){
  group(name: $groupname){
    usersByGroupname{
      nodes{
        workoutsByUsername{
          nodes{
            createdAt
            averageRir
            sets
            hits
          }
        }
        userExercisesByUsername{
          nodes{
            slugName
            updatedAt
            repetitions
            liftmass
            strongerpercentage
          }
        }
      }
    }
  }
}`


function sort_by_created(a , b ) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}
function sort_by_updated(a, b) {
    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
}

type NavigationProps = {params: {groupname: string}};
const Statistics: React.FC<{route: NavigationProps}> = ({route}) => {  
  const [statsList, setStatsList] = useState<any[]>([])
  const { groupname } = route.params;
  useQuery(STATS, {
    variables: {groupname},
    //we need to sort the data with respect to updatedAt or createdAt
    onCompleted: (data) => {
      //sort the workout entries and user exercise entries with respect to themselves
      console.log(data.group.usersByGroupname.nodes)
      const sortedWorkouts = data.group.usersByGroupname.nodes.workoutsByUsername.nodes.sort(sort_by_created)
      const sortedUserExercises = data.group.usersByGroupname.nodes.userExercisesByUsername.nodes.sort(sort_by_updated)

      //the final sorted list will be a merge of the two (done in O(m + n) time)
      setStatsList(() => {
        var toReturn = new Array(sortedWorkouts.length + sortedUserExercises.length)
        var t = 0;
        var u = 0;
        var w = 0;
        while (u < sortedUserExercises.length && w < sortedWorkouts.length){
          const exerciseTime = new Date(sortedUserExercises[u].updatedAt).getTime()
          const workoutTime = new Date(sortedUserExercises[w].createdAt).getTime()
          if (exerciseTime < workoutTime){
            toReturn[t++] = sortedWorkouts[u++]
          }
          else {
            toReturn[t++] = sortedUserExercises[u++]
          }
        }
        while (u < sortedUserExercises.length){
          toReturn[t++] = sortedUserExercises[u++]
        }
        while (w < sortedWorkouts.length){
          toReturn[t++] = sortedWorkouts[u++]
        }
        return toReturn
      })
    }
  })
  console.log(statsList)
  return (
    null
  )

}
export default Statistics
