import React, {useRef, useState} from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions, StatusBar } from "react-native";
import SpriteSelector from "../sprites/sprite_selector";
import TopView from "../util_components/top_view";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    top: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  sprite: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    width: width,
  },
  skillTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
});

const AppDemo: React.FC = () => {
  const [scrollOffset, setScrollOffset] = useState(0)
  return (
    <ScrollView
      onScroll = {({nativeEvent}) => setScrollOffset(nativeEvent.contentOffset.x / width)}
      horizontal={true}
      decelerationRate={0}
      snapToInterval={width} //your element width
      snapToAlignment={"center"}
    >
      <View style={styles.view}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.text}>Welcome to Status Buff, where your character gets stronger as you do!</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.container}>
              <Text>Squat</Text>
              <Text>30kg x 8</Text>
            </View>
            <View style={styles.container}>
              <Text>Bench Press</Text>
              <Text>20kg x 8</Text>
            </View>
            <View style={styles.container}>
              <Text>Deadlift</Text>
              <Text>40kg x 8</Text>
            </View>
          </View>
          <View style={styles.sprite}>
            <Text style={styles.skillTitle}>Skill Level: Noob</Text>
            <Text>Attack Damage 0.3</Text>
            <SpriteSelector spriteName="noob" />
          </View>
        </View>
      </View>
      <View style={styles.view}>
        <SpriteSelector spriteName="intermediate" />
      </View>
    </ScrollView>
  );
};
export default AppDemo;
