import { renderHook, act } from "@testing-library/react-hooks";
import useExerciseSearch from "../components/user/exercise_modal/exercise_search/use_exercise_search.tsx";
test("no matches for empty query", () => {
  const { result } = renderHook(() => useExerciseSearch(""))
  expect(result.current.matchingExercises).toStrictEqual([])
});

test("Should find bench press", () => {
  const { result } = renderHook(() => useExerciseSearch("Bench"));
  expect(result.current.matchingExercises[0].name).toBe("Bench Press")
});

test("Should not return more than 10 elements", () => {
  const { result } = renderHook(() => useExerciseSearch("a"));
  expect(result.current.matchingExercises.length).toBeLessThan(11)
});

test("Alias search works", () => {
  const { result } = renderHook(() => useExerciseSearch("trap bar"));
  expect(result.current.matchingExercises[0].name).toStrictEqual("Hex Bar Deadlift")
});

test("Bodypart filter filters bench press out", () => {
  const { result } = renderHook(() => useExerciseSearch("Bench", ["Chest"]));
  expect(result.current.matchingExercises.some(({name}) => name === "Bench Press")).toBe(false)
});


