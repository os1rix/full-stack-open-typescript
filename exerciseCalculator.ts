interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: number[], target: number): Result => {
  const totalHours = hours.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)

  let success = null
  let rating = null
  let ratingDescription = ""

  const trainingDays = hours.filter((x) => x > 0).length
  const averageHours = totalHours / hours.length
  if (averageHours == target) {
    success = true
    rating = 2
    ratingDescription = "Well done!"
  } else if (averageHours >= target) {
    success = true
    rating = 3
    ratingDescription = "Excellent effort!"
  } else {
    success = false
    rating = 1
    ratingDescription = "More work to do to reach goals!"
  }

  const result: Result = {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHours,
  }
  return result
}

const args = process.argv.slice(2)
const hours = args.slice(0, -1).map(Number)
const target = Number(args[args.length - 1])

console.log(calculateExercises(hours, target))
