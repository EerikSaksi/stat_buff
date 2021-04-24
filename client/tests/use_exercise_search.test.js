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
