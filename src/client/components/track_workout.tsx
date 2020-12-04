import {gql, useQuery} from '@apollo/client';
import React from 'react'
import useSkillTitle from '../hooks/use_skill_title';
import SpriteSelector from "../sprites/sprite_selector";
const STRENGTH = gql`
  query {
    strengthStats {
      DPH
    }
  }
`;
const TrackWorkout: React.FC = () => {
  const {data} = useQuery(STRENGTH)
  const { skillTitle } = useSkillTitle(data && data.strengthStats ? data.strengthStats.DPH : undefined);
  return(
    <SpriteSelector spriteName = {skillTitle}/>
  )
}
export default TrackWorkout
