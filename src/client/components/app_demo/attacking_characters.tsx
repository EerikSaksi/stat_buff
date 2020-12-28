import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import SpriteSelector from "../../sprites/sprite_selector";
const styles = StyleSheet.create({
  threeCharacters: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  spriteContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  spriteAlignedEnd:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  topContainer: {
    width: "100%",
    top: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
  },
});
const AttackingCharacters: React.FC<{ inView: boolean }> = ({ inView }) => {
  const [transition, setTransition] = useState(0);

  //this is the main driver for transitions. It activates the current transition with a switch statement and then sets the transition to next
  useEffect(() => {
    const interval = setInterval(() => {
      setTransition((oldTransition) => {
        switch (oldTransition) {
          case 0:
            break;
        }
        return oldTransition + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <React.Fragment>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Join a team track workouts to deal damage to your teams' enemy</Text>
      </View>
      <View style={styles.threeCharacters }> 
        <View style={styles.spriteAlignedEnd}>
          <SpriteSelector currentAnimation = {'attackOrDie'} aspectRatio={0.5} spriteName={"novice"} />
          <SpriteSelector aspectRatio={0.5} spriteName={"Fire Devil"} />
        </View>
        <View style={styles.spriteContainer }>
          <SpriteSelector aspectRatio={0.5} spriteName={"apprentice"} />
        </View>
        <View style={styles.spriteAlignedEnd}>
          <SpriteSelector aspectRatio={0.5} spriteName={"noob"} />
        </View>
      </View>
    </React.Fragment>
  );
};
export default AttackingCharacters;
