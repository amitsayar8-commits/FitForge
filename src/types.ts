export type FitnessGoal =
  | 'Build Muscle'
  | 'Lose Fat'
  | 'Get Stronger'
  | 'Improve Fitness'
  | 'Improve Endurance';

export type WorkoutLocation = 'GYM' | 'HOME' | 'BOTH';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserPreferences {
  isOnboardingCompleted: boolean;
  primaryGoal: FitnessGoal;
  workoutLocation: WorkoutLocation;
  experienceLevel: ExperienceLevel;
  workoutDaysPerWeek: number;
  workoutDurationMinutes: number;
  userName: string;
  userAge: number;
  userHeightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  unitSystem: 'metric' | 'imperial';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  defaultRestSeconds: number;
  currentStreak: number;
  bestStreak: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'HIIT' | 'Mobility';
  targetMuscle: string;
  secondaryMuscles: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  environment: WorkoutLocation;
  description: string;
  instructions: string[];
  defaultSets: number;
  defaultReps: string;
  defaultDurationSec: number;
  defaultRestSeconds: number;
  tips: string;
  commonMistakes: string;
  isFavorite?: boolean;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  subtitle: string;
  environment: 'GYM' | 'HOME';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  estimatedCalories: number;
  exerciseIds: string[];
  isCustom?: boolean;
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  date: string;
  isNew?: boolean;
}

export interface WorkoutHistoryRecord {
  id: string;
  workoutPlanId: string;
  workoutTitle: string;
  dateTimestamp: number;
  durationSeconds: number;
  exercisesCompleted: number;
  setsCompleted: number;
  totalVolumeKg: number;
  estimatedCalories: number;
}

export interface WeightLog {
  id: string;
  weightKg: number;
  date: string;
  timestamp: number;
}
