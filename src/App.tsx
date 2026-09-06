import React, { useState, useEffect } from 'react';
import { UserPreferences, WorkoutPlan, Exercise, PersonalRecord, WeightLog, WorkoutHistoryRecord } from './types';
import { initialUserPreferences, sampleExercises, sampleWorkoutPlans, samplePersonalRecords, sampleWeightLogs } from './data/mockData';
import { AndroidFrame } from './components/AndroidFrame';
import { OnboardingView } from './components/OnboardingView';
import { HomeDashboardView } from './components/HomeDashboardView';
import { WorkoutsView } from './components/WorkoutsView';
import { ProgressView } from './components/ProgressView';
import { HistoryView } from './components/HistoryView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { AndroidProjectInspector } from './components/AndroidProjectInspector';
import { Home, Dumbbell, Activity, Calendar, User, Code2, Smartphone } from 'lucide-react';

export default function App() {
  // Local persistence state
  const [prefs, setPrefs] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('fitforge_prefs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return initialUserPreferences;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'workouts' | 'progress' | 'history' | 'profile'>('home');
  const [activeWorkoutForPlayer, setActiveWorkoutForPlayer] = useState<WorkoutPlan | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [viewMode, setViewMode] = useState<'simulator' | 'inspector'>('simulator');

  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(samplePersonalRecords);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(sampleWeightLogs);
  const [historyRecords, setHistoryRecords] = useState<WorkoutHistoryRecord[]>([
    {
      id: 'h1',
      workoutPlanId: 'w1_push_day',
      workoutTitle: 'Push Day: Chest & Triceps',
      dateTimestamp: Date.now() - 86400000 * 1.5,
      durationSeconds: 45 * 60,
      exercisesCompleted: 5,
      setsCompleted: 16,
      totalVolumeKg: 3420,
      estimatedCalories: 380
    },
    {
      id: 'h2',
      workoutPlanId: 'w2_pull_day',
      workoutTitle: 'Pull Day: Back & Biceps',
      dateTimestamp: Date.now() - 86400000 * 3,
      durationSeconds: 42 * 60,
      exercisesCompleted: 4,
      setsCompleted: 14,
      totalVolumeKg: 2890,
      estimatedCalories: 390
    }
  ]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('fitforge_prefs', JSON.stringify(prefs));
  }, [prefs]);

  const handleUpdatePrefs = (updated: Partial<UserPreferences>) => {
    setPrefs((prev) => ({ ...prev, ...updated }));
  };

  const handleFinishWorkout = (summary: {
    durationMinutes: number;
    exercisesDone: number;
    setsDone: number;
    caloriesBurned: number;
  }) => {
    if (!activeWorkoutForPlayer) return;

    const newRecord: WorkoutHistoryRecord = {
      id: `h_${Date.now()}`,
      workoutPlanId: activeWorkoutForPlayer.id,
      workoutTitle: activeWorkoutForPlayer.title,
      dateTimestamp: Date.now(),
      durationSeconds: summary.durationMinutes * 60,
      exercisesCompleted: summary.exercisesDone,
      setsCompleted: summary.setsDone,
      totalVolumeKg: summary.setsDone * 60 * 10,
      estimatedCalories: summary.caloriesBurned
    };

    setHistoryRecords((prev) => [newRecord, ...prev]);
    // increment streak
    handleUpdatePrefs({
      currentStreak: prefs.currentStreak + 1,
      bestStreak: Math.max(prefs.bestStreak, prefs.currentStreak + 1)
    });
  };

  const handleAddWeightLog = (weightKg: number) => {
    const newLog: WeightLog = {
      id: `wl_${Date.now()}`,
      weightKg,
      date: 'Today',
      timestamp: Date.now()
    };
    setWeightLogs((prev) => [...prev, newLog]);
    handleUpdatePrefs({ currentWeightKg: weightKg });
  };

  const handleResetData = () => {
    localStorage.removeItem('fitforge_prefs');
    setPrefs({ ...initialUserPreferences, isOnboardingCompleted: false });
    setActiveTab('home');
  };

  // Find exercises matching the active workout
  const currentWorkoutExercises = activeWorkoutForPlayer
    ? sampleExercises.filter((e) => activeWorkoutForPlayer.exerciseIds.includes(e.id))
    : [];

  // If viewing Android Studio code inspector
  if (viewMode === 'inspector') {
    return (
      <AndroidProjectInspector onSwitchToSimulator={() => setViewMode('simulator')} />
    );
  }

  return (
    <AndroidFrame activeTabTitle="FitForge">
      {/* Top Header Mode Switcher (Between Simulator and Project Inspector) */}
      <div className="shrink-0 h-10 px-5 flex items-center justify-between border-b border-[#222222] bg-[#0A0A0A] text-xs text-neutral-400">
        <div className="flex items-center gap-1.5 font-black text-[#FF5F1F] tracking-wider">
          <span>FITFORGE</span>
          <span className="text-[10px] text-neutral-500 font-normal">v1.0.0</span>
        </div>

        <button
          onClick={() => setViewMode('inspector')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#FF5F1F]/40 text-neutral-300 transition-colors text-[11px] font-semibold"
          title="Inspect the generated Kotlin & Gradle Android Studio project"
        >
          <Code2 className="w-3.5 h-3.5 text-[#FF5F1F]" />
          <span>Inspect Android Project Code</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        {!prefs.isOnboardingCompleted ? (
          <OnboardingView
            initialPrefs={prefs}
            onComplete={(updated) => handleUpdatePrefs(updated)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeDashboardView
                prefs={prefs}
                todayWorkout={sampleWorkoutPlans[0]}
                onStartWorkout={(workout) => setActiveWorkoutForPlayer(workout)}
                onNavigateTab={(tab) => setActiveTab(tab as any)}
                onToggleLocation={(loc) => handleUpdatePrefs({ workoutLocation: loc })}
              />
            )}

            {activeTab === 'workouts' && (
              <WorkoutsView
                workoutPlans={sampleWorkoutPlans}
                exercises={sampleExercises}
                activeLocation={prefs.workoutLocation === 'BOTH' ? 'GYM' : prefs.workoutLocation}
                onStartWorkout={(workout) => setActiveWorkoutForPlayer(workout)}
                onSelectExercise={(exercise) => setSelectedExercise(exercise)}
              />
            )}

            {activeTab === 'progress' && (
              <ProgressView
                prefs={prefs}
                personalRecords={personalRecords}
                weightLogs={weightLogs}
                onAddWeightLog={handleAddWeightLog}
                onAddNewPR={(name, weight, reps) => {
                  setPersonalRecords((prev) => [
                    { exerciseId: `pr_${Date.now()}`, exerciseName: name, weightKg: weight, reps, date: 'Today', isNew: true },
                    ...prev
                  ]);
                }}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView historyRecords={historyRecords} />
            )}

            {activeTab === 'profile' && (
              <ProfileSettingsView
                prefs={prefs}
                onUpdatePrefs={handleUpdatePrefs}
                onResetData={handleResetData}
              />
            )}

            {/* Bottom Navigation Bar (Matching Android Material 3) */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[inherit] mx-auto h-16 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#222222] px-4 flex items-center justify-around z-40">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'workouts', label: 'Workouts', icon: Dumbbell },
                { id: 'progress', label: 'Progress', icon: Activity },
                { id: 'history', label: 'History', icon: Calendar },
                { id: 'profile', label: 'Profile', icon: User },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isSelected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className="flex flex-col items-center justify-center flex-1 h-full relative transition-all group"
                  >
                    <div
                      className={`p-1.5 rounded-xl transition-all ${
                        isSelected
                          ? 'text-[#FF5F1F] bg-[#FF5F1F]/15 shadow-[0_0_12px_rgba(255,95,31,0.2)]'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-semibold tracking-tight transition-colors ${
                        isSelected ? 'text-[#FF5F1F] font-bold' : 'text-neutral-500'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Workout Player Modal (if active) */}
        {activeWorkoutForPlayer && (
          <WorkoutPlayerModal
            workout={activeWorkoutForPlayer}
            exerciseList={currentWorkoutExercises.length > 0 ? currentWorkoutExercises : sampleExercises.slice(0, 3)}
            onClose={() => setActiveWorkoutForPlayer(null)}
            onFinishWorkout={handleFinishWorkout}
          />
        )}

        {/* Exercise Detail Modal (if selected) */}
        {selectedExercise && (
          <ExerciseDetailModal
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        )}
      </div>
    </AndroidFrame>
  );
}
