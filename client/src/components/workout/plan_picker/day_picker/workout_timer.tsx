import React, { useRef, useEffect, useState } from "react";
import { Volume } from "../../../../generated/graphql";
import { Button } from "react-native-paper";
import {View} from "react-native";

const WorkoutTimer: React.FC<{ volumes: Volume[][] }> = ({ volumes }) => {
  const startTime = useRef<Date | undefined>();
  const [minutes, setMinutes] = useState<undefined | number>();

  useEffect(() => {
    if (!startTime.current) {
      //user has tracked a lift, then start the timer
      if (volumes.some((row) => row.some((val) => val !== undefined))) {
        startTime.current = new Date();
        setMinutes(0);
      }
    }
    const interval = setInterval(() => {
      if (startTime.current) {
        setMinutes(Math.floor((+new Date() - +startTime.current) / 60000));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [startTime, volumes]);
  if (minutes === undefined) {
    return null;
  }
  return (
    <View style={{ position: "absolute", bottom: 0, flex: 1, justifyContent: 'center', alignItems: 'flex-end', width: '100%', padding: 8 }}>
      <Button mode = "contained" icon={{source: "stop-circle" }}>{minutes} min</Button>
    </View>
  );
};
export default WorkoutTimer;
