import React, { useState, useEffect, useRef } from 'react';
import { WorkoutPlan, Exercise } from '../types';
import { X, Play, Pause, SkipForward, CheckCircle2, RotateCcw, Volume2, Sparkles, ChevronRight, Award } from 'lucide-react';

interface WorkoutPlayerModalProps {
  workout: WorkoutPlan;
  exerciseList: Exercise[];
  onClose: () => void;
  onFinishWorkout: (summary: {
    durationMinutes: number;
    exercisesDone: number;
    setsDone: number;
    caloriesBurned: number;
  }) => void;
}

export const WorkoutPlayerModal: React.FC<WorkoutPlayerModalProps> = ({
  workout,
  exerciseList,
  onClose,
  onFinishWorkout
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [weightKg, setWeightKg] = useState<number>(60);
  const [reps, setReps] = useState<number>(10);
  const [totalCompletedSets, setTotalCompletedSets] = useState(0);

  // Timer states
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isSessionPaused, setIsSessionPaused] = useState(false);

  // Rest Timer states
  const [isResting, setIsResting] = useState(false);
  const [restSecondsLeft, setRestSecondsLeft] = useState(90);
  const [totalRestTarget, setTotalRestTarget] = useState(90);
  const [isRestPaused, setIsRestPaused] = useState(false);

  // Celebration state
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);

  const currentExercise = exerciseList[currentExerciseIndex] || exerciseList[0];
  const totalSetsForCurrent = currentExercise?.defaultSets || 4;

  // Web Audio chime for rest timer finish
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // AudioContext might be restricted until user gesture
    }
  };

  // Workout Session Timer
  useEffect(() => {
    if (isSessionPaused || isWorkoutCompleted) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSessionPaused, isWorkoutCompleted]);

  // Rest Timer Countdown
  useEffect(() => {
    if (!isResting || isRestPaused || isWorkoutCompleted) return;
    const interval = setInterval(() => {
      setRestSecondsLeft((prev) => {
        if (prev <= 1) {
          playChime();
          setIsResting(false);
          // Advance set
          advanceToNextSet();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isResting, isRestPaused, isWorkoutCompleted]);

  const advanceToNextSet = () => {
    if (currentSet < totalSetsForCurrent) {
      setCurrentSet((s) => s + 1);
    } else {
      // Move to next exercise
      if (currentExerciseIndex < exerciseList.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentSet(1);
      } else {
        // All exercises completed
        setIsWorkoutCompleted(true);
      }
    }
  };

  const handleCompleteSet = () => {
    setTotalCompletedSets((prev) => prev + 1);
    // Trigger rest timer
    setRestSecondsLeft(totalRestTarget);
    setIsResting(true);
    setIsRestPaused(false);
  };

  const handleSkipRest = () => {
    setIsResting(false);
    advanceToNextSet();
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isWorkoutCompleted) {
    return (
      <div className="absolute inset-0 z-50 bg-[#0A0A0A] p-6 flex flex-col justify-between text-neutral-100 animate-fadeIn">
        <div className="flex flex-col items-center text-center pt-8">
          <div className="w-20 h-20 rounded-full bg-[#FF5F1F]/20 border-2 border-[#FF5F1F] flex items-center justify-center text-[#FF5F1F] mb-6 shadow-[0_0_35px_rgba(255,95,31,0.35)] animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-[#FF5F1F] uppercase tracking-widest">WORKOUT FINISHED</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-2">Incredible Effort! ⚡</h2>
          <p className="text-xs text-neutral-400 max-w-xs mb-8">
            You completed {workout.title}. Your training volume and streak have been logged locally!
          </p>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-3 mb-6 text-left">
            <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#222222]">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Total Duration</span>
              <p className="text-lg font-bold text-white mt-0.5">{formatTime(sessionSeconds)}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#222222]">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Sets Completed</span>
              <p className="text-lg font-bold text-white mt-0.5">{totalCompletedSets} sets</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#222222]">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Est. Burn</span>
              <p className="text-lg font-bold text-[#FF5F1F] mt-0.5">~{workout.estimatedCalories} kcal</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#222222]">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Streak</span>
              <p className="text-lg font-bold text-[#FF5F1F] mt-0.5">🔥 +1 Day</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onFinishWorkout({
              durationMinutes: Math.max(1, Math.round(sessionSeconds / 60)),
              exercisesDone: exerciseList.length,
              setsDone: totalCompletedSets,
              caloriesBurned: workout.estimatedCalories
            });
            onClose();
          }}
          className="w-full h-14 rounded-2xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black font-black text-sm tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(255,95,31,0.35)] active:scale-[0.98]"
        >
          RETURN TO DASHBOARD
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#0A0A0A] text-neutral-100 flex flex-col justify-between overflow-y-auto p-5 animate-fadeIn">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#FF5F1F]/20 text-[#FF5F1F] border border-[#FF5F1F]/30">
              LIVE SESSION
            </span>
            <span className="text-xs font-mono font-bold text-neutral-300">
              ⏱️ {formatTime(sessionSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSessionPaused(!isSessionPaused)}
              className="p-2 rounded-xl bg-[#141414] border border-[#222222] text-neutral-300 hover:text-white"
            >
              {isSessionPaused ? <Play className="w-4 h-4 text-[#FF5F1F]" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#141414] border border-[#222222] text-neutral-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Exercise Progress Header */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
          <span>Exercise {currentExerciseIndex + 1} of {exerciseList.length}</span>
          <span className="text-[#FF5F1F] font-semibold">{currentExercise?.category}</span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">{currentExercise?.name}</h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Target: <span className="text-neutral-200 font-medium">{currentExercise?.targetMuscle}</span>
        </p>

        {/* Exercise Illustration Box */}
        <div className="w-full h-40 mt-3 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#FF5F1F]/10 border border-[#FF5F1F]/20 flex items-center justify-center text-2xl font-black mb-2">
            🏋️
          </div>
          <p className="text-xs font-semibold text-neutral-300">{currentExercise?.equipment}</p>
          <span className="text-[10px] text-neutral-500 mt-0.5">Tempo: 2-0-1 • Focus on Mind-Muscle Connection</span>
        </div>

        {/* Active Set Tracker Card */}
        <div className="mt-4 p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              SET {currentSet} OF {totalSetsForCurrent}
            </span>
            <span className="text-[10px] text-[#FF5F1F] font-semibold bg-[#FF5F1F]/10 px-2 py-0.5 rounded border border-[#FF5F1F]/20">
              Target: {currentExercise?.defaultReps} reps
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Weight Input */}
            <div className="p-3 rounded-xl bg-[#181818] border border-[#262626] flex flex-col">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">Weight (kg)</span>
              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={() => setWeightKg((w) => Math.max(0, w - 2.5))}
                  className="w-7 h-7 rounded-lg bg-[#242424] text-white font-bold flex items-center justify-center text-sm hover:bg-[#303030]"
                >
                  -
                </button>
                <span className="text-base font-black text-white">{weightKg}</span>
                <button
                  onClick={() => setWeightKg((w) => w + 2.5)}
                  className="w-7 h-7 rounded-lg bg-[#242424] text-white font-bold flex items-center justify-center text-sm hover:bg-[#303030]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Reps Input */}
            <div className="p-3 rounded-xl bg-[#181818] border border-[#262626] flex flex-col">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">Completed Reps</span>
              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={() => setReps((r) => Math.max(1, r - 1))}
                  className="w-7 h-7 rounded-lg bg-[#242424] text-white font-bold flex items-center justify-center text-sm hover:bg-[#303030]"
                >
                  -
                </button>
                <span className="text-base font-black text-white">{reps}</span>
                <button
                  onClick={() => setReps((r) => r + 1)}
                  className="w-7 h-7 rounded-lg bg-[#242424] text-white font-bold flex items-center justify-center text-sm hover:bg-[#303030]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* REST TIMER SECTION (Shown when user completes a set) */}
        {isResting && (
          <div className="mt-4 p-4 rounded-[1.5rem] bg-[#121212] border-2 border-[#FF5F1F] shadow-[0_0_35px_rgba(255,95,31,0.25)] animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FF5F1F] animate-ping" />
                <span className="text-xs font-black text-[#FF5F1F] uppercase tracking-wider">RESTING</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRestSecondsLeft((s) => s + 30)}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#1C1C1C] border border-[#282828] text-neutral-300 font-bold hover:bg-[#252525]"
                >
                  +30s
                </button>
                <button
                  onClick={handleSkipRest}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#1C1C1C] border border-[#282828] text-neutral-300 font-bold hover:bg-[#252525]"
                >
                  Skip
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center py-2">
              <span className="text-4xl font-black font-mono text-white tracking-wider">
                {formatTime(restSecondsLeft)}
              </span>
            </div>

            {/* Quick Rest Preset Buttons */}
            <div className="flex items-center justify-between gap-1.5 mt-2 pt-2 border-t border-[#222222] text-xs">
              {[30, 45, 60, 90, 120, 180].map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    setTotalRestTarget(sec);
                    setRestSecondsLeft(sec);
                  }}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                    totalRestTarget === sec
                      ? 'bg-[#FF5F1F] text-black shadow-sm'
                      : 'bg-[#181818] border border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-4 space-y-2">
        <button
          onClick={handleCompleteSet}
          disabled={isResting}
          className={`w-full h-14 rounded-2xl font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_4px_25px_rgba(255,95,31,0.35)] ${
            isResting
              ? 'bg-[#181818] border border-[#262626] text-neutral-500 cursor-not-allowed'
              : 'bg-[#FF5F1F] hover:bg-[#ff753b] text-black active:scale-[0.98]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>{isResting ? 'REST IN PROGRESS...' : 'COMPLETE SET'}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (currentExerciseIndex < exerciseList.length - 1) {
                setCurrentExerciseIndex((i) => i + 1);
                setCurrentSet(1);
                setIsResting(false);
              }
            }}
            className="h-11 rounded-xl bg-[#141414] border border-[#222222] text-neutral-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip Exercise</span>
          </button>

          <button
            onClick={() => setIsWorkoutCompleted(true)}
            className="h-11 rounded-xl bg-[#141414] border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <span>Finish Early</span>
          </button>
        </div>
      </div>
    </div>
  );
};
