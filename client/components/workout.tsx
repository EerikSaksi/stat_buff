import React, { useState, useCallback } from "react";
import { List, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useQuery } from "@apollo/client";
import WorkoutExercise from "./workout/workout_exercise";
const FETCH_WORKOUT_PLAN = gql`
  query {
    activeUser {
      nodeId
      workoutPlans {
        nodes {
          nodeId
          workoutExercises {
            sets
            reps
            exercise {
              nodeId
              name
            }
          }
        }
      }
    }
  }
`;
const Workout: React.FC = () => {
  const { data } = useQuery(FETCH_WORKOUT_PLAN);
  const [expandedId, setExpandedId] = useState(1);
  return (
    <SafeAreaView>
      <List.AccordionGroup
        expandedId={expandedId}
        onAccordionPress={(expandedId) => {
          if (typeof expandedId === "number") {
            setExpandedId((oldExpandedId) => (oldExpandedId === expandedId ? 0 : expandedId));
          }
        }}
      >
        {data
          ? data.activeUser.workoutPlans.nodes[0].workoutExercises.map((wE, id) => (
              <WorkoutExercise name={wE.exercise.name} sets={wE.sets} targetReps={wE.reps} id={id + 1} />
            ))
          : undefined}
      </List.AccordionGroup>
    </SafeAreaView>
  );
};
export default Workout;
