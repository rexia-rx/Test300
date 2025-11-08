import { PrismaClient, ExerciseType } from '@prisma/client';

const prisma = new PrismaClient();

const seedExercises = [
  { name: 'Bench Press', type: ExerciseType.STRENGTH },
  { name: 'Back Squat', type: ExerciseType.STRENGTH },
  { name: 'Deadlift', type: ExerciseType.STRENGTH },
  { name: 'Overhead Press', type: ExerciseType.STRENGTH },
  { name: 'Pull Up', type: ExerciseType.STRENGTH },
  { name: 'Running', type: ExerciseType.CARDIO },
  { name: 'Cycling', type: ExerciseType.CARDIO },
  { name: 'Rowing', type: ExerciseType.CARDIO }
];

async function main(): Promise<void> {
  await prisma.exercise.createMany({
    data: seedExercises,
    skipDuplicates: true
  });

  console.log(`Seeded ${seedExercises.length} predefined exercises.`);
}

main()
  .catch((error) => {
    console.error('Failed to seed database', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
