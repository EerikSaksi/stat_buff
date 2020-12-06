import { gql, useQuery } from "@apollo/client";
import React from "react";
import useSkillTitle from "../hooks/use_skill_title";
import SpriteSelector from "../sprites/sprite_selector";
import { Modal, View } from "react-native";
import { generateShadow } from "react-native-shadow-generator";
const STRENGTH = gql`
  query {
    strengthStats {
      DPH
    }
  }
`;

const ENEMY_STATS = gql`
  query($username: String!) {
    user(username: $username) {
      groupByGroupName {
        battlesByGroupnameAndBattleNumber {
          nodes {
            enemyLevel
            battleNumber
            currentHealth
            createdAt
            enemyByEnemyLevel {
              maxHealth
              name
            }
          }
        }
      }
    }
  }
`;
const WorkoutModal: React.FC<{ username: string; visible: boolean; setVisible: (val: boolean) => void }> = ({ username, visible, setVisible }) => {
  // const { data: strengthData } = useQuery(STRENGTH);
  // const { data: enemyData } = useQuery(ENEMY_STATS, {
  //   variables: {username}
  // });
  // const { skillTitle } = useSkillTitle(strengthData && strengthData.strengthStats ? strengthData.strengthStats.DPH : undefined);
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"} transparent={true}>
      <View style={{ margin: "10%", marginTop: "30%", marginBottom: "30%", flex: 1, backgroundColor: "white", ...generateShadow(24), justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 1,  flexDirection: "row", justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ flex: 1}}>
            <SpriteSelector spriteName={"apprentice"} aspectRatio = {0.5} />
          </View>
          <View style={{ flex: 1, height: '100%'}}>
            <SpriteSelector spriteName={"Mudcrab"} aspectRatio = {0.5}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default WorkoutModal;
