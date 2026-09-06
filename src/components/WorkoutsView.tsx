import React, { useState } from 'react';
import { WorkoutPlan, Exercise } from '../types';
import { Play, Dumbbell, Home, Search, Filter, Info, ChevronRight, Check } from 'lucide-react';

interface WorkoutsViewProps {
  workoutPlans: WorkoutPlan[];
  exercises: Exercise[];
  onStartWorkout: (workout: WorkoutPlan) => void;
  onSelectExercise: (exercise: Exercise) => void;
  activeLocation: 'GYM' | 'HOME';
}

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({
  workoutPlans,
  exercises,
  onStartWorkout,
  onSelectExercise,
  activeLocation: initialLocation
}) => {
  const [activeTab, setActiveTab] = useState<'routines' | 'exercises'>('routines');
  const [selectedLocation, setSelectedLocation] = useState<'GYM' | 'HOME'>(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Workout categories
  const gymCategories = ['All', 'Push / Pull / Legs', 'Upper / Lower', 'Full Body', 'Bro Split'];
  const homeCategories = ['All', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'HIIT', 'No Equipment'];

  const categories = selectedLocation === 'GYM' ? gymCategories : homeCategories;

  // Filtered workout plans
  const filteredPlans = workoutPlans.filter((plan) => {
    const matchesLocation = plan.environment === selectedLocation || plan.environment === 'BOTH';
    const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
    const matchesSearch =
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesCategory && matchesSearch;
  });

  // Filtered exercises
  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 bg-[#0A0A0A] text-neutral-100">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Workouts & Library</h1>
        <p className="text-xs text-neutral-400">Structured routines and exercise breakdown</p>
      </div>

      {/* Mode & Category Bar */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#141414] border border-[#222222]">
        <button
          onClick={() => setActiveTab('routines')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'routines'
              ? 'bg-[#FF5F1F] text-black font-black shadow-[0_2px_15px_rgba(255,95,31,0.35)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Workout Routines
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'exercises'
              ? 'bg-[#FF5F1F] text-black font-black shadow-[0_2px_15px_rgba(255,95,31,0.35)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Exercise Database ({exercises.length})
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={activeTab === 'routines' ? 'Search workout plans...' : 'Search exercises or target muscles...'}
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF5F1F] transition-colors"
        />
      </div>

      {activeTab === 'routines' ? (
        <>
          {/* Gym vs Home Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedLocation('GYM');
                setSelectedCategory('All');
              }}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                selectedLocation === 'GYM'
                  ? 'bg-[#FF5F1F]/15 border-[#FF5F1F] text-[#FF5F1F] shadow-[0_0_15px_rgba(255,95,31,0.15)]'
                  : 'bg-[#141414] border-[#222222] text-neutral-400 hover:text-white'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>GYM Plans</span>
            </button>
            <button
              onClick={() => {
                setSelectedLocation('HOME');
                setSelectedCategory('All');
              }}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                selectedLocation === 'HOME'
                  ? 'bg-[#FF5F1F]/15 border-[#FF5F1F] text-[#FF5F1F] shadow-[0_0_15px_rgba(255,95,31,0.15)]'
                  : 'bg-[#141414] border-[#222222] text-neutral-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>HOME Plans</span>
            </button>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF5F1F] text-black font-bold shadow-sm'
                    : 'bg-[#141414] border border-[#222222] text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Routine Cards List */}
          <div className="space-y-3 pt-1">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] hover:border-[#FF5F1F]/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF5F1F]/15 text-[#FF5F1F] border border-[#FF5F1F]/30">
                        {plan.environment}
                      </span>
                      <span className="text-[10px] text-neutral-400">{plan.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{plan.title}</h3>
                  </div>
                  <span className="text-xs font-semibold text-neutral-400">
                    {plan.durationMinutes} min
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mb-3 line-clamp-2">{plan.subtitle}</p>

                <div className="flex items-center justify-between pt-2 border-t border-[#222222]">
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {plan.exerciseIds.length} Exercises • ~{plan.estimatedCalories} kcal (Est.)
                  </span>

                  <button
                    onClick={() => onStartWorkout(plan)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black text-xs font-black flex items-center gap-1.5 transition-colors shadow-[0_2px_12px_rgba(255,95,31,0.3)]"
                  >
                    <Play className="w-3 h-3 fill-black" />
                    <span>Start</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Exercise Library Tab */
        <div className="space-y-2.5">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              onClick={() => onSelectExercise(ex)}
              className="p-3.5 rounded-[1.25rem] bg-[#121212] border border-[#222222] hover:border-[#FF5F1F]/40 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#262626] flex items-center justify-center text-[#FF5F1F] text-xs font-black">
                  {ex.category.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                  <p className="text-xs text-neutral-400">
                    Target: <span className="text-neutral-300">{ex.targetMuscle}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#181818] border border-[#262626] text-neutral-400">
                  {ex.equipment}
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
