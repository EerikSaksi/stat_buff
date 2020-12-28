import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SpriteHealthBar from "./sprite_health_bar";
import SpriteSelector from "./sprite_selector";

const styles = StyleSheet.create({
  sprites: {
    flexDirection: "row",
    flex: 3,
    alignItems: "flex-end",
  },
  sprite: {
    flex: 1,
    justifyContent: "center",
  },
});
type Animation = "idle" | "onHit" | "attackOrDie";
const SpriteBattle: React.FC<{
  deliveredHits: number;
  setDeliveredHits: (value: number | ((prevVar: number) => number)) => void;
  skillTitle: string | undefined;
  dph: number;
  currentHealth: number;
  hits: number;
  maxHealth: number;
  enemyName: string;
}> = ({ deliveredHits, setDeliveredHits, skillTitle, dph, currentHealth, hits, maxHealth, enemyName }) => {
  const [totalDamage, setTotalDamage] = useState(0);
  //store total dealt damage (updated whenever the user hits)
  useEffect(() => {
    setTotalDamage(() => {
      const newDamage = deliveredHits * dph;
      //if we killed the enemy just skip to the end
      if (currentHealth < newDamage) {
        setDeliveredHits(hits);
      }
      return newDamage;
    });
  }, [deliveredHits]);
  //these denote the current animation that the sprite should perform
  const [playerAnimation, setPlayerAnimation] = useState<Animation | undefined>('attackOrDie');
  const [enemyAnimation, setEnemyAnimation] = useState<Animation | undefined>(undefined);

  //the onFinish hook of the player sprite calls this. This results in a loop where the sprites wait for each others animations to finish
  const playerAnimationFinished = useCallback(async () => {
    setEnemyAnimation("onHit");
    setDeliveredHits((deliveredHits) => deliveredHits < hits ? deliveredHits + 1 : deliveredHits);
  }, [totalDamage, hits]);
  const enemyAnimationFinished = useCallback(async () => {
    //setting the animation to undefined and back to attack triggers a state change
    setPlayerAnimation(undefined);
    setPlayerAnimation("attackOrDie");
    //we only want to trigger an animation repeatedly if the enemy is not doing a dying animation
    setEnemyAnimation(undefined);
  }, [totalDamage]);

  return (
    <React.Fragment>
      <View style={styles.sprites}>
        <View style={styles.sprite}>
          <SpriteSelector aspectRatio={0.7} spriteName={skillTitle} currentAnimation={playerAnimation} animationFinished={deliveredHits < hits ? playerAnimationFinished : undefined} />
        </View>
        <View style={styles.sprite}>
          <SpriteHealthBar maxHealth={maxHealth} currentHealth={currentHealth - totalDamage} style={{ width: "70%" }} />
          <SpriteSelector
            aspectRatio={0.7}
            spriteName={enemyName}
            currentAnimation={totalDamage < currentHealth ? enemyAnimation : "attackOrDie"}
            animationFinished={deliveredHits < hits - 1 ? enemyAnimationFinished : undefined}
          />
        </View>
      </View>
    </React.Fragment>
  );
};
export default SpriteBattle;
