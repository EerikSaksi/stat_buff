import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import WorkoutDayPicker from "./workout/workout_day_picker";

const FETCH_CURRENT_WORKOUT_PLAN = gql`
  query {
    activeUser {
      nodeId
      userCurrentWorkoutPlan {
        nodeId
        workoutPlan {
          nodeId
          name
          workoutPlanDays {
            nodes {
              nodeId
              name
              workoutExercises {
                sets
                reps
                exercise {
                  nodeId
                  name
                  id
                }
              }
            }
          }
        }
      }
      workoutPlans {
        nodes {
          nodeId
          name
          workoutPlanDays {
            nodes {
              nodeId
              name
              workoutExercises {
                sets
                reps
                exercise {
                  nodeId
                  name
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
const WorkoutPlanPicker: React.FC = () => {
  const { data } = useQuery(FETCH_CURRENT_WORKOUT_PLAN);
  if (!data) {
    return <ActivityIndicator />;
  }
  return <WorkoutDayPicker days={data.activeUser.userCurrentWorkoutPlan.workoutPlan.workoutPlanDays.nodes} />;
};
export default WorkoutPlanPicker;
