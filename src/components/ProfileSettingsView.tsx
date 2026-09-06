import React, { useState } from 'react';
import { UserPreferences, FitnessGoal, WorkoutLocation, ExperienceLevel } from '../types';
import { User, Settings, Moon, Sun, Bell, Volume2, ShieldCheck, RefreshCw, Check } from 'lucide-react';

interface ProfileSettingsViewProps {
  prefs: UserPreferences;
  onUpdatePrefs: (updated: Partial<UserPreferences>) => void;
  onResetData: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  prefs,
  onUpdatePrefs,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [name, setName] = useState(prefs.userName);
  const [age, setAge] = useState(prefs.userAge);
  const [height, setHeight] = useState(prefs.userHeightCm);
  const [weight, setWeight] = useState(prefs.currentWeightKg);
  const [targetWeight, setTargetWeight] = useState(prefs.targetWeightKg);
  const [goal, setGoal] = useState<FitnessGoal>(prefs.primaryGoal);
  const [location, setLocation] = useState<WorkoutLocation>(prefs.workoutLocation);
  const [level, setLevel] = useState<ExperienceLevel>(prefs.experienceLevel);
  const [days, setDays] = useState(prefs.workoutDaysPerWeek);
  const [duration, setDuration] = useState(prefs.workoutDurationMinutes);

  const [sound, setSound] = useState(prefs.soundEnabled);
  const [vibration, setVibration] = useState(prefs.vibrationEnabled);
  const [unit, setUnit] = useState(prefs.unitSystem);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePrefs({
      userName: name,
      userAge: Number(age),
      userHeightCm: Number(height),
      currentWeightKg: Number(weight),
      targetWeightKg: Number(targetWeight),
      primaryGoal: goal,
      workoutLocation: location,
      experienceLevel: level,
      workoutDaysPerWeek: Number(days),
      workoutDurationMinutes: Number(duration)
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 bg-[#0A0A0A] text-neutral-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Profile & Preferences</h1>
          <p className="text-xs text-neutral-400">Personalize training parameters and audio-haptics</p>
        </div>
      </div>

      {/* Profile vs Settings Switcher */}
      <div className="p-1 rounded-2xl bg-[#141414] border border-[#222222] flex items-center">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-[#FF5F1F] text-black font-black shadow-[0_2px_12px_rgba(255,95,31,0.3)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          User Profile
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-[#FF5F1F] text-black font-black shadow-[0_2px_12px_rgba(255,95,31,0.3)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          App Settings
        </button>
      </div>

      {savedMessage && (
        <div className="p-3.5 rounded-2xl bg-[#FF5F1F]/20 border border-[#FF5F1F]/40 text-[#FF5F1F] text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>Profile changes updated successfully!</span>
        </div>
      )}

      {activeTab === 'profile' ? (
        <form onSubmit={handleSaveProfile} className="space-y-3.5">
          {/* Name & Age */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
              />
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Current (kg)</label>
              <input
                type="number"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Target (kg)</label>
              <input
                type="number"
                step="0.5"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
              />
            </div>
          </div>

          {/* Goal selection */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as FitnessGoal)}
              className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
            >
              <option value="Build Muscle">Build Muscle</option>
              <option value="Lose Fat">Lose Fat</option>
              <option value="Get Stronger">Get Stronger</option>
              <option value="Improve Fitness">Improve Fitness</option>
              <option value="Improve Endurance">Improve Endurance</option>
            </select>
          </div>

          {/* Location & Experience */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Training Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as WorkoutLocation)}
                className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
              >
                <option value="GYM">GYM</option>
                <option value="HOME">HOME</option>
                <option value="BOTH">BOTH</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">Experience</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as ExperienceLevel)}
                className="w-full h-11 px-3 rounded-xl bg-[#141414] border border-[#222222] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-13 rounded-2xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(255,95,31,0.3)] active:scale-[0.98]"
          >
            Save Profile
          </button>
        </form>
      ) : (
        /* Settings Tab */
        <div className="space-y-3">
          {/* Unit Toggle */}
          <div className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Measurement Units</h4>
              <p className="text-[10px] text-neutral-400">Kilograms (kg) vs Pounds (lb)</p>
            </div>
            <div className="flex items-center gap-1 bg-[#181818] border border-[#262626] p-1 rounded-xl">
              <button
                onClick={() => {
                  setUnit('metric');
                  onUpdatePrefs({ unitSystem: 'metric' });
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  unit === 'metric' ? 'bg-[#FF5F1F] text-black shadow-sm' : 'text-neutral-400'
                }`}
              >
                kg
              </button>
              <button
                onClick={() => {
                  setUnit('imperial');
                  onUpdatePrefs({ unitSystem: 'imperial' });
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  unit === 'imperial' ? 'bg-[#FF5F1F] text-black shadow-sm' : 'text-neutral-400'
                }`}
              >
                lb
              </button>
            </div>
          </div>

          {/* Sound Audio Toggle */}
          <div className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Rest Timer Sound</h4>
              <p className="text-[10px] text-neutral-400">Audio chime on rest countdown finish</p>
            </div>
            <input
              type="checkbox"
              checked={sound}
              onChange={(e) => {
                setSound(e.target.checked);
                onUpdatePrefs({ soundEnabled: e.target.checked });
              }}
              className="w-5 h-5 accent-[#FF5F1F] rounded cursor-pointer"
            />
          </div>

          {/* Vibration Toggle */}
          <div className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Haptic Vibration</h4>
              <p className="text-[10px] text-neutral-400">Tactile cue on set and rest transitions</p>
            </div>
            <input
              type="checkbox"
              checked={vibration}
              onChange={(e) => {
                setVibration(e.target.checked);
                onUpdatePrefs({ vibrationEnabled: e.target.checked });
              }}
              className="w-5 h-5 accent-[#FF5F1F] rounded cursor-pointer"
            />
          </div>

          {/* About App & Version */}
          <div className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] space-y-1 text-xs">
            <h4 className="font-bold text-white">About FitForge</h4>
            <p className="text-neutral-400 text-[11px]">Version 1.0.0 (Production Release)</p>
            <p className="text-neutral-500 text-[10px]">
              Built with Kotlin, Jetpack Compose, Material 3, and Room Architecture.
            </p>
          </div>

          {/* Reset All Data */}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all workout data and onboarding?')) {
                onResetData();
              }
            }}
            className="w-full py-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Workout Data & Onboarding</span>
          </button>
        </div>
      )}
    </div>
  );
};
