export const calculateBmi = (height: number, weight: number): string => {
  const total = weight / (height / 100) ** 2;
  if (total > 24.9) return "Overweight";
  else if (total < 18.5) return "Underweight";
  else return "Normal weight";
};
if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
}
