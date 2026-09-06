import React from 'react';
import { UserPreferences, WorkoutPlan } from '../types';
import { Play, Flame, Clock, Award, ChevronRight, Dumbbell, Home, ShieldAlert, Sparkles, Activity } from 'lucide-react';

interface HomeDashboardViewProps {
  prefs: UserPreferences;
  todayWorkout: WorkoutPlan;
  onStartWorkout: (workout: WorkoutPlan) => void;
  onNavigateTab: (tab: string) => void;
  onToggleLocation: (loc: 'GYM' | 'HOME') => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  prefs,
  todayWorkout,
  onStartWorkout,
  onNavigateTab,
  onToggleLocation
}) => {
  // Determine greeting based on current time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning 👋' : hour < 17 ? 'Good Afternoon ⚡' : 'Good Evening 🔥';

  // Calculate weekly completion ratio
  const weeklyGoal = prefs.workoutDaysPerWeek || 4;
  const weeklyDone = 3;
  const progressPercent = Math.min(100, Math.round((weeklyDone / weeklyGoal) * 100));

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-5 bg-[#0A0A0A] text-neutral-100">
      {/* 1. Header: Greeting & Profile Avatar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-neutral-400">{greeting}</p>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
            Ready to crush your goals?
          </h1>
        </div>
        <button
          onClick={() => onNavigateTab('profile')}
          className="w-11 h-11 rounded-full bg-[#141414] border-2 border-[#FF5F1F] flex items-center justify-center text-[#FF5F1F] font-bold text-sm shadow-[0_0_20px_rgba(255,95,31,0.3)] hover:scale-105 transition-transform"
        >
          {prefs.userName.slice(0, 2).toUpperCase()}
        </button>
      </div>

      {/* 2. Workout Environment Switcher (GYM / HOME) */}
      <div className="p-1 rounded-2xl bg-[#141414] border border-[#222222] flex items-center">
        <button
          onClick={() => onToggleLocation('GYM')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            prefs.workoutLocation === 'GYM'
              ? 'bg-[#FF5F1F] text-black font-black shadow-[0_2px_15px_rgba(255,95,31,0.35)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>🏋️ GYM WORKOUTS</span>
        </button>
        <button
          onClick={() => onToggleLocation('HOME')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            prefs.workoutLocation === 'HOME'
              ? 'bg-[#FF5F1F] text-black font-black shadow-[0_2px_15px_rgba(255,95,31,0.35)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>🏠 HOME WORKOUTS</span>
        </button>
      </div>

      {/* 3. Weekly Progress Card (Design Reference from UI Kit) */}
      <div className="p-5 rounded-[2rem] bg-[#121212] border border-[#222222] relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white tracking-wide uppercase">Weekly Progress</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1C1C1C] text-neutral-300 border border-[#282828]">
              {weeklyDone} / {weeklyGoal} done
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#FF5F1F]">
            <Flame className="w-3.5 h-3.5 fill-[#FF5F1F]" />
            <span>{prefs.currentStreak} Day Streak</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Circular Progress Ring */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-neutral-800"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#FF5F1F] transition-all duration-1000 ease-out"
                strokeDasharray={`${progressPercent}, 100`}
                strokeLinecap="round"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-black text-white">{progressPercent}%</span>
              <span className="text-[9px] text-neutral-400 font-bold">TARGET</span>
            </div>
          </div>

          {/* Stat Badges */}
          <div className="flex-1 space-y-2">
            <div className="p-2.5 rounded-xl bg-[#181818] border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#FF5F1F]" />
                <span className="text-[11px] text-neutral-300 font-medium">Calories (Est.)</span>
              </div>
              <span className="text-xs font-bold text-white">1,840 kcal</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#181818] border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF5F1F]" />
                <span className="text-[11px] text-neutral-300 font-medium">Active Time</span>
              </div>
              <span className="text-xs font-bold text-white">3h 45m</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          <button
            onClick={() => onNavigateTab('workouts')}
            className="p-3 rounded-2xl bg-[#141414] border border-[#222222] hover:border-[#FF5F1F]/50 flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF5F1F]/10 flex items-center justify-center text-[#FF5F1F] group-hover:scale-110 transition-transform">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-300 mt-1.5">Exercises</span>
          </button>

          <button
            onClick={() => onNavigateTab('progress')}
            className="p-3 rounded-2xl bg-[#141414] border border-[#222222] hover:border-[#FF5F1F]/50 flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF5F1F]/10 flex items-center justify-center text-[#FF5F1F] group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-300 mt-1.5">Progress</span>
          </button>

          <button
            onClick={() => onNavigateTab('progress')}
            className="p-3 rounded-2xl bg-[#141414] border border-[#222222] hover:border-[#FF5F1F]/50 flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF5F1F]/10 flex items-center justify-center text-[#FF5F1F] group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-300 mt-1.5">Records</span>
          </button>

          <button
            onClick={() => onNavigateTab('history')}
            className="p-3 rounded-2xl bg-[#141414] border border-[#222222] hover:border-[#FF5F1F]/50 flex flex-col items-center text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF5F1F]/10 flex items-center justify-center text-[#FF5F1F] group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-300 mt-1.5">History</span>
          </button>
        </div>
      </div>

      {/* 5. Today's Workout Hero Card (Featured Banner) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FF5F1F]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Today's Workout</h2>
          </div>
          <button
            onClick={() => onNavigateTab('workouts')}
            className="text-xs font-semibold text-[#FF5F1F] hover:underline flex items-center gap-0.5"
          >
            See all
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 rounded-[2rem] bg-gradient-to-br from-[#161616] via-[#121212] to-[#0A0A0A] border border-[#262626] relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF5F1F]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Badges */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-[#FF5F1F]/15 text-[#FF5F1F] border border-[#FF5F1F]/30">
                {todayWorkout.environment === 'GYM' ? '🏋️ GYM' : '🏠 HOME'}
              </span>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-[#1C1C1C] text-neutral-300 border border-[#282828]">
                {todayWorkout.difficulty}
              </span>
            </div>
            <span className="text-xs font-semibold text-neutral-400">
              ~{todayWorkout.estimatedCalories} kcal <span className="text-[10px] text-neutral-500">(Est.)</span>
            </span>
          </div>

          <h3 className="text-lg font-black text-white relative z-10">{todayWorkout.title}</h3>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 relative z-10">{todayWorkout.subtitle}</p>

          {/* Workout Attributes */}
          <div className="flex items-center gap-4 mt-4 text-xs text-neutral-300 relative z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#1A1A1A] border border-[#282828]">
              <Clock className="w-3.5 h-3.5 text-[#FF5F1F]" />
              <span>{todayWorkout.durationMinutes} min</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#1A1A1A] border border-[#282828]">
              <Dumbbell className="w-3.5 h-3.5 text-[#FF5F1F]" />
              <span>{todayWorkout.exerciseIds.length} Exercises</span>
            </div>
          </div>

          {/* Large CTA Start Workout Button */}
          <button
            onClick={() => onStartWorkout(todayWorkout)}
            className="w-full mt-5 h-13 rounded-2xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_4px_25px_rgba(255,95,31,0.35)] active:scale-[0.98] relative z-10"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START WORKOUT</span>
          </button>
        </div>
      </div>

      {/* 6. Medical Disclaimer (Safety section 22) */}
      <div className="p-3.5 rounded-2xl bg-[#121212] border border-[#222222] flex items-start gap-2.5 text-[11px] text-neutral-400 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
        <p>
          FitForge provides general fitness information and is not a substitute for professional medical advice.
          Stop exercising if you experience pain or unusual symptoms and consult an appropriate professional.
        </p>
      </div>
    </div>
  );
};
