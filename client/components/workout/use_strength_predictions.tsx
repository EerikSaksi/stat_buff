import React, { useState, useEffect } from "react";
const exercises = require("./exercises.json");

const wilks = (x: number, W: number, isMale: boolean) => {
  let a: number, b: number, c: number, d: number, e: number, f: number;
  if (isMale) {
    a = -216.0475144;
    b = 16.2606339;
    c = -0.002388645;
    d = -0.00113732;
    e = 7.01863e-6;
    f = -1.291e-8;
  } else {
    a = 594.31747775582;
    b = -27.23842536447;
    c = 0.82112226871;
    d = -0.00930733913;
    e = 4.731582e-5;
    f = -9.054e-8;
  }
  return W / (a + b * x + c * Math.pow(x, 2) + d * Math.pow(x, 3) + e * Math.pow(x, 4) + f * Math.pow(x, 5));
};

type predictions = {
  oneRepMax: number;
  percentile: number;
}

const useStrengthPredictions = (
  input_repetitions: number | undefined,
  input_weight: number | undefined,
  input_exercise_slug: number,
  input_bodyweight: number,
  isMale: boolean
) => {
  const [predictions, setPredictions] = useState<undefined | predictions>();
  useEffect(() => {
    if (input_weight && input_repetitions) {
      const max_one_rm = exercises[input_exercise_slug] * (isMale ? 1 : 0.57);
      const one_rm = input_weight * (1 + input_repetitions / 30);
      const x = wilks(input_bodyweight, one_rm / max_one_rm, isMale);
      setPredictions({percentile: 115471.14623106 * x - 8.801363625876917, oneRepMax: one_rm})
    }
  }, []);
  return predictions
};
export default useStrengthPredictions;
