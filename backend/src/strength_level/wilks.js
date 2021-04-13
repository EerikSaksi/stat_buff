const calcRelative = (hardcoded, inputWeight) => {
  const ratio = Math.min((inputWeight - hardcoded.min) / (hardcoded.max - hardcoded.min));
  const normalizedRatio = ratio / (1 + Math.exp(-(ratio + 2) / 3))
  console.log(ratio)
};
const ratios = [102, 129, 161, 197, 235];
ratios.forEach((weight) => calcRelative({ min: 102, max: 235 }, weight));

