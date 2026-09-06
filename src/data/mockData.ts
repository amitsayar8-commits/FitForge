import { Exercise, WorkoutPlan, PersonalRecord, WeightLog, UserPreferences } from '../types';

export const initialUserPreferences: UserPreferences = {
  isOnboardingCompleted: false,
  primaryGoal: 'Build Muscle',
  workoutLocation: 'GYM',
  experienceLevel: 'Intermediate',
  workoutDaysPerWeek: 4,
  workoutDurationMinutes: 45,
  userName: 'Alex Forge',
  userAge: 26,
  userHeightCm: 178,
  currentWeightKg: 76.5,
  targetWeightKg: 80.0,
  unitSystem: 'metric',
  soundEnabled: true,
  vibrationEnabled: true,
  defaultRestSeconds: 90,
  currentStreak: 4,
  bestStreak: 12,
};

export const sampleExercises: Exercise[] = [
  {
    id: 'bench_press',
    name: 'Barbell Bench Press',
    category: 'Chest',
    targetMuscle: 'Chest (Pectoralis Major)',
    secondaryMuscles: 'Triceps, Anterior Deltoids',
    equipment: 'Barbell + Flat Bench',
    difficulty: 'Intermediate',
    environment: 'GYM',
    description: 'The premier compound exercise for upper body horizontal pressing strength and chest hypertrophy.',
    instructions: [
      'Lie flat on bench with eyes directly under the racked bar.',
      'Grip the bar slightly wider than shoulder width with thumbs wrapped.',
      'Retract scapulae and plant feet firmly on the floor.',
      'Unrack bar, lower under control to mid-sternum while tucking elbows at 45 degrees.',
      'Drive upward through the chest back to locked position without flaring elbows.'
    ],
    defaultSets: 4,
    defaultReps: '8-12',
    defaultDurationSec: 0,
    defaultRestSeconds: 90,
    tips: 'Squeeze the bar hard and maintain a stable arch in your thoracic spine.',
    commonMistakes: 'Bouncing bar off chest; flaring elbows out at 90 degrees; lifting glutes off the bench.'
  },
  {
    id: 'incline_db_press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    targetMuscle: 'Clavicular Chest (Upper Pectorals)',
    secondaryMuscles: 'Anterior Deltoids, Triceps',
    equipment: 'Dumbbells + Adjustable Bench',
    difficulty: 'Intermediate',
    environment: 'BOTH',
    description: 'Emphasizes the upper pectorals and stabilizes each arm independently.',
    instructions: [
      'Set bench angle to 30 degrees.',
      'Kick dumbbells up to shoulder level as you lie back.',
      'Press dumbbells up with palms angled slightly inward.',
      'Lower dumbbells until upper arms break 90 degrees, feeling a deep chest stretch.'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    defaultDurationSec: 0,
    defaultRestSeconds: 75,
    tips: 'Keep bench angle at 30° maximum to prevent excessive anterior delt takeover.',
    commonMistakes: 'Arching lower back off the bench; slamming dumbbells together at the top.'
  },
  {
    id: 'push_ups',
    name: 'Standard Push-Ups',
    category: 'Chest',
    targetMuscle: 'Chest & Core',
    secondaryMuscles: 'Triceps, Deltoids, Serratus Anterior',
    equipment: 'Bodyweight (No Equipment)',
    difficulty: 'Beginner',
    environment: 'HOME',
    description: 'Fundamental calisthenics horizontal pressing movement that builds baseline chest strength and core stability.',
    instructions: [
      'Place hands on floor slightly wider than shoulder width.',
      'Engage glutes and core to create a rigid straight line from heels to head.',
      'Lower chest towards floor until elbow angle reaches 90 degrees.',
      'Press through the palms and protract shoulder blades at the peak.'
    ],
    defaultSets: 3,
    defaultReps: '15-20',
    defaultDurationSec: 0,
    defaultRestSeconds: 60,
    tips: 'Keep your gaze slightly ahead on the ground to keep cervical spine neutral.',
    commonMistakes: 'Sagging hips; flaring elbows straight out to sides.'
  },
  {
    id: 'pull_ups',
    name: 'Pull-Ups / Chin-Ups',
    category: 'Back',
    targetMuscle: 'Latissimus Dorsi',
    secondaryMuscles: 'Biceps, Rhomboids, Rear Deltoids',
    equipment: 'Pull-up Bar',
    difficulty: 'Intermediate',
    environment: 'BOTH',
    description: 'The king of vertical pulling for complete upper back width and forearm grip strength.',
    instructions: [
      'Hang from bar with an overhand grip wider than shoulders.',
      'Depress scapulae downward before bending arms.',
      'Drive elbows toward your hips and pull until chin clears the bar.',
      'Lower down under complete control to a full dead hang.'
    ],
    defaultSets: 4,
    defaultReps: '6-10',
    defaultDurationSec: 0,
    defaultRestSeconds: 90,
    tips: 'Think about driving your elbows into your back pockets.',
    commonMistakes: 'Kicking legs or kipping; half reps that do not reach full hang.'
  },
  {
    id: 'barbell_squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    targetMuscle: 'Quadriceps & Glutes',
    secondaryMuscles: 'Hamstrings, Adductors, Spinal Erectors',
    equipment: 'Barbell + Squat Rack',
    difficulty: 'Advanced',
    environment: 'GYM',
    description: 'Gold standard compound movement for total lower body power and structural bone density.',
    instructions: [
      'Rest bar across upper traps (high bar) or rear delts (low bar).',
      'Step back, feet shoulder-width apart, toes flared slightly out.',
      'Inhale deep diaphragmatic breath into belt/core.',
      'Descend by breaking at hips and knees simultaneously until hip crease is below knee level.',
      'Drive through midfoot back to standing.'
    ],
    defaultSets: 4,
    defaultReps: '6-8',
    defaultDurationSec: 0,
    defaultRestSeconds: 120,
    tips: 'Maintain continuous knee tracking directly over toes.',
    commonMistakes: 'Knees caving inward (valgus); rounding lower back in the hole.'
  },
  {
    id: 'bulgarian_split_squat',
    name: 'Bulgarian Split Squat',
    category: 'Legs',
    targetMuscle: 'Quads & Glutes',
    secondaryMuscles: 'Hamstrings, Calves, Core balance',
    equipment: 'Dumbbells or Bodyweight',
    difficulty: 'Intermediate',
    environment: 'BOTH',
    description: 'Unilateral leg builder that addresses muscle imbalances and delivers intense quad burn.',
    instructions: [
      'Stand 2 feet in front of a bench or sturdy chair.',
      'Place rear foot lace-down on the bench.',
      'Lower torso until front thigh is parallel with floor.',
      'Drive upward through front heel to starting stance.'
    ],
    defaultSets: 3,
    defaultReps: '10-12 / leg',
    defaultDurationSec: 0,
    defaultRestSeconds: 75,
    tips: 'Lean slightly forward to bias glute engagement.',
    commonMistakes: 'Front foot placed too close to bench causing knee strain.'
  },
  {
    id: 'tricep_pushdown',
    name: 'Cable Tricep Pushdown',
    category: 'Arms',
    targetMuscle: 'Triceps Lateral & Medial Heads',
    secondaryMuscles: 'Forearms',
    equipment: 'Cable Pulley + Rope or Straight Bar',
    difficulty: 'Beginner',
    environment: 'GYM',
    description: 'Direct triceps isolation with continuous tension throughout the entire range of motion.',
    instructions: [
      'Face cable station with elbows tucked tightly against ribs.',
      'Push attachment down until arms are fully extended.',
      'Spread rope at bottom for extra peak contraction.',
      'Slowly return to 90 degrees without letting elbows drift forward.'
    ],
    defaultSets: 3,
    defaultReps: '12-15',
    defaultDurationSec: 0,
    defaultRestSeconds: 60,
    tips: 'Lock your elbows like a hinge; do not swing shoulders.',
    commonMistakes: 'Leaning excessively over the bar; moving upper arm during the push.'
  },
  {
    id: 'lateral_raise',
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    targetMuscle: 'Lateral Deltoids (Shoulder Width)',
    secondaryMuscles: 'Trapezius, Supraspinatus',
    equipment: 'Dumbbells or Resistance Bands',
    difficulty: 'Beginner',
    environment: 'BOTH',
    description: 'Key isolation exercise to build broad, rounded 3D shoulders.',
    instructions: [
      'Hold light dumbbells at sides with slight forward torso lean.',
      'Raise weights out to sides leading with elbows until parallel with floor.',
      'Pause for a fraction of a second at peak.',
      'Control descent for 2 seconds.'
    ],
    defaultSets: 4,
    defaultReps: '12-15',
    defaultDurationSec: 0,
    defaultRestSeconds: 60,
    tips: 'Pour water at top: tilt pinky fingers slightly higher than thumbs.',
    commonMistakes: 'Using momentum and swinging hips; shrugging traps excessively.'
  },
  {
    id: 'plank_hold',
    name: 'Core Plank Hold',
    category: 'Core',
    targetMuscle: 'Transverse Abdominis & Rectus Abdominis',
    secondaryMuscles: 'Glutes, Shoulders, Lower back',
    equipment: 'Floor Mat',
    difficulty: 'Beginner',
    environment: 'HOME',
    description: 'Isometric anti-extension core builder that strengthens the entire anterior chain.',
    instructions: [
      'Rest on forearms and toes, elbows stacked directly under shoulders.',
      'Squeeze glutes, tuck pelvis, and draw navel toward spine.',
      'Breathe steadily without letting hips sag or pike upward.'
    ],
    defaultSets: 3,
    defaultReps: '45-60s',
    defaultDurationSec: 45,
    defaultRestSeconds: 45,
    tips: 'Focus on maximum tension rather than just surviving time.',
    commonMistakes: 'Lower back sagging down; holding breath.'
  },
  {
    id: 'resistance_band_row',
    name: 'Resistance Band Seated Row',
    category: 'Back',
    targetMuscle: 'Rhomboids, Middle Traps, Lats',
    secondaryMuscles: 'Biceps, Rear Deltoids',
    equipment: 'Resistance Bands',
    difficulty: 'Beginner',
    environment: 'HOME',
    description: 'Great home horizontal pull targeting posture and back density using variable elastic resistance.',
    instructions: [
      'Sit on floor with legs straight, loop band around midfoot.',
      'Hold handles with neutral grip and sit tall with chest high.',
      'Pull handles toward lower ribs, squeezing shoulder blades tightly together.',
      'Slowly resist band back to starting position.'
    ],
    defaultSets: 3,
    defaultReps: '12-15',
    defaultDurationSec: 0,
    defaultRestSeconds: 60,
    tips: 'Pause 1 full second at full contraction.',
    commonMistakes: 'Rounding lower back; shrugging up toward ears.'
  }
];

export const sampleWorkoutPlans: WorkoutPlan[] = [
  {
    id: 'w1_push_day',
    title: 'Push Day: Chest & Triceps',
    subtitle: 'Bench Press, Incline Dumbbells, Lateral Raises & Tricep Finisher',
    environment: 'GYM',
    category: 'Push / Pull / Legs',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    estimatedCalories: 380,
    exerciseIds: ['bench_press', 'incline_db_press', 'lateral_raise', 'tricep_pushdown', 'push_ups']
  },
  {
    id: 'w2_pull_day',
    title: 'Pull Day: Back & Biceps',
    subtitle: 'Heavy Pull-Ups, Rows & Rear Delt Conditioning',
    environment: 'GYM',
    category: 'Push / Pull / Legs',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    estimatedCalories: 410,
    exerciseIds: ['pull_ups', 'resistance_band_row', 'lateral_raise']
  },
  {
    id: 'w3_leg_day',
    title: 'Leg Day: Quads & Glutes',
    subtitle: 'Heavy Barbell Back Squats & Bulgarian Split Squats',
    environment: 'GYM',
    category: 'Push / Pull / Legs',
    difficulty: 'Advanced',
    durationMinutes: 50,
    estimatedCalories: 460,
    exerciseIds: ['barbell_squat', 'bulgarian_split_squat', 'plank_hold']
  },
  {
    id: 'w4_home_fullbody',
    title: 'Home Bodyweight Crusher',
    subtitle: 'No Equipment Needed: Chest, Legs & Core Metabolic Burn',
    environment: 'HOME',
    category: 'Full Body',
    difficulty: 'Beginner',
    durationMinutes: 30,
    estimatedCalories: 260,
    exerciseIds: ['push_ups', 'bulgarian_split_squat', 'plank_hold']
  },
  {
    id: 'w5_home_bands',
    title: 'Resistance Band Hypertrophy',
    subtitle: 'Target Back, Shoulders & Arms Anywhere',
    environment: 'HOME',
    category: 'Upper Body',
    difficulty: 'Intermediate',
    durationMinutes: 35,
    estimatedCalories: 290,
    exerciseIds: ['resistance_band_row', 'lateral_raise', 'push_ups', 'plank_hold']
  }
];

export const samplePersonalRecords: PersonalRecord[] = [
  {
    exerciseId: 'bench_press',
    exerciseName: 'Barbell Bench Press',
    weightKg: 105.0,
    reps: 5,
    date: 'Yesterday',
    isNew: true
  },
  {
    exerciseId: 'barbell_squat',
    exerciseName: 'Barbell Squat',
    weightKg: 140.0,
    reps: 4,
    date: '3 days ago',
    isNew: false
  },
  {
    exerciseId: 'pull_ups',
    exerciseName: 'Weighted Pull-Ups',
    weightKg: 20.0,
    reps: 6,
    date: 'Last week',
    isNew: false
  }
];

export const sampleWeightLogs: WeightLog[] = [
  { id: '1', weightKg: 78.2, date: '4 weeks ago', timestamp: Date.now() - 28 * 86400000 },
  { id: '2', weightKg: 77.8, date: '3 weeks ago', timestamp: Date.now() - 21 * 86400000 },
  { id: '3', weightKg: 77.1, date: '2 weeks ago', timestamp: Date.now() - 14 * 86400000 },
  { id: '4', weightKg: 76.8, date: '1 week ago', timestamp: Date.now() - 7 * 86400000 },
  { id: '5', weightKg: 76.5, date: 'Today', timestamp: Date.now() }
];
