const exercises = require('./exercises.json')

const a = -216.0475144;
const b = 16.2606339;
const c = -0.002388645;
const d = -0.00113732;
const e = 7.01863e-6;
const f = -1.291e-8;
const wilks = (x, W) => {
  return W / (a + b * x + c * Math.pow(x, 2) + d * Math.pow(x, 3) + e * Math.pow(x, 4) + f * Math.pow(x, 5));
};

const predict_y = (input_repetitions, input_weight, input_exercise_slug, input_bodyweight) => {
  const max_one_rm = exercises[input_exercise_slug]
  const one_rm = input_weight * (1 + input_repetitions / 30);
  const x = wilks(input_bodyweight, one_rm / max_one_rm);
  return 115471.14623106 * x - 8.801363625876917;
};
console.log(predict_y(9, 50,  'shoulder-press', 83))
