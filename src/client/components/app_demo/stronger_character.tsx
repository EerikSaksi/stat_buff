import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SpriteSelector from "../../sprites/sprite_selector";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  topContainer: {
    width: "100%",
    top: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
  sprite: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  skillTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  spriteSelector: {
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const titles = ["Noob", "Novice", "Apprentice", "Intermediate", "Advanced", "Elite"];
const StrongerCharacter: React.FC<{ inView: boolean }> = ({ inView }) => {
  const [liftIndex, setLiftIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (inView) {
        setLiftIndex((oldIndex) => (oldIndex === titles.length - 1 ? oldIndex : oldIndex + 1));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.text}>Welcome to Stat Buff, where your character gets stronger as you do!</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.container}>
          <Text>Squat</Text>
          <Text>{40 + liftIndex * 25}kg x 8</Text>
        </View>
        <View style={styles.container}>
          <Text>Bench Press</Text>
          <Text>{20 + liftIndex * 20}kg x 8</Text>
        </View>
        <View style={styles.container}>
          <Text>Deadlift</Text>
          <Text>{50 + liftIndex * 30}kg x 8</Text>
        </View>
      </View>
      <View style={styles.sprite}>
        <Text style={styles.text}>Skill Level: {titles[liftIndex]}</Text>
        <Text>{(0.6 * liftIndex).toFixed(1)} attack damage</Text>
        <View style={styles.spriteSelector}>
          <SpriteSelector aspectRatio = {0.8} key = {liftIndex} spriteName={titles[liftIndex].toLowerCase()} />
        </View>
      </View>
    </View>
  );
};
export default StrongerCharacter;
