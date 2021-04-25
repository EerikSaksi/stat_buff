import { renderHook, act } from "@testing-library/react-hooks";
import useExerciseSearch from "../components/user/exercise_modal/exercise_search/use_exercise_search.tsx";

test("Should find bench press", () => {
  const { result } = renderHook(() => useExerciseSearch("Bench"));
  expect(result.current.matchingExercises[0].name).toBe("Bench Press");
});

test("Should not return more than 10 elements", () => {
  const { result } = renderHook(() => useExerciseSearch("a"));
  expect(result.current.matchingExercises.length).toBeLessThan(11);
});

test("Alias search works", () => {
  const { result } = renderHook(() => useExerciseSearch("trap bar"));
  expect(result.current.matchingExercises[0].name).toStrictEqual("Hex Bar Deadlift");
});

test("Bodypart filter only one exercise", () => {
  const { result } = renderHook(() => useExerciseSearch("a", ["Chest"]));
  for (const exercise of result.current.matchingExercises) {
    expect(exercise.bodyPart).toBe("Chest");
  }
});

test("Bodypart filter works for multiple", () => {
  const { result } = renderHook(() => useExerciseSearch("a", ["Legs", "Back"]));
  expect(result.current.matchingExercises.every(exercise => exercise.bodyPart === "Legs" || exercise.bodyPart === "Back"));
});

test("Exercise equipment works", () => {
  const { result } = renderHook(() => useExerciseSearch("a", ["dumbbell", "barbell"]));
  expect(result.current.matchingExercises.every(exercise => exercise.bodyPart === "dumbbell" || exercise.bodyPart === "barbell"));
});
