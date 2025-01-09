import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

//@ts-expect-error some match overload stuff
app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmiCategory = calculateBmi(height, weight);
  res.json({
    weight: weight,
    height: height,
    bmi: bmiCategory,
  });
});

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

//@ts-expect-error some match overload stuff
app.post("/exercises", (req: Request<ExerciseRequest>, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log(req.body);

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((num) => typeof num === "number") ||
    typeof target !== "number"
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const exercisesArray = Array.isArray(daily_exercises)
    ? daily_exercises.map(Number)
    : [Number(daily_exercises)];

  const result = calculateExercises(exercisesArray, Number(target));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
