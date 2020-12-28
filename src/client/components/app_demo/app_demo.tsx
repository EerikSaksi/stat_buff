import React, {useRef, useState} from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions} from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  view: {
    width: width,
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
      </View>
      <View style={styles.view}>
      </View>
    </ScrollView>
  );
};
export default AppDemo;
