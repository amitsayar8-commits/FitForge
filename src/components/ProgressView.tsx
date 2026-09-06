import React, { useState } from 'react';
import { UserPreferences, PersonalRecord, WeightLog } from '../types';
import { Award, Flame, Scale, Plus, Trophy, TrendingUp, Check, Calendar } from 'lucide-react';

interface ProgressViewProps {
  prefs: UserPreferences;
  personalRecords: PersonalRecord[];
  weightLogs: WeightLog[];
  onAddWeightLog: (weightKg: number) => void;
  onAddNewPR: (exerciseName: string, weightKg: number, reps: number) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  prefs,
  personalRecords,
  weightLogs,
  onAddWeightLog,
  onAddNewPR
}) => {
  const [unit, setUnit] = useState<'kg' | 'lb'>(prefs.unitSystem);
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [newWeightInput, setNewWeightInput] = useState('');
  const [celebrationMsg, setCelebrationMsg] = useState<string | null>(null);

  const convertWeight = (valKg: number) => {
    return unit === 'kg' ? valKg : Math.round(valKg * 2.20462 * 10) / 10;
  };

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(newWeightInput);
    if (!isNaN(parsed) && parsed > 20 && parsed < 300) {
      const kg = unit === 'kg' ? parsed : parsed / 2.20462;
      onAddWeightLog(Math.round(kg * 10) / 10);
      setNewWeightInput('');
      setShowAddWeight(false);
      setCelebrationMsg(`Weight entry recorded: ${parsed} ${unit}`);
      setTimeout(() => setCelebrationMsg(null), 3000);
    }
  };

  // Badges calculation
  const badges = [
    { title: 'First Workout', desc: 'Completed your very first FitForge routine', unlocked: true, icon: '⚡' },
    { title: '7 Day Streak', desc: 'Maintained 7 consecutive active days', unlocked: prefs.currentStreak >= 7 || prefs.bestStreak >= 7, icon: '🔥' },
    { title: '30 Day Streak', desc: 'High discipline 30-day streak', unlocked: prefs.bestStreak >= 30, icon: '🏆' },
    { title: '50 Workouts', desc: 'Passed the half-century mark', unlocked: true, icon: '🎖️' },
    { title: 'New Personal Record', desc: 'Set a new all-time personal best', unlocked: true, icon: '👑' }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-5 bg-[#0A0A0A] text-neutral-100">
      {/* Header & Unit Switcher */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Progress & Analytics</h1>
          <p className="text-xs text-neutral-400">Body composition and lifting records</p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-[#141414] border border-[#222222]">
          <button
            onClick={() => setUnit('kg')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              unit === 'kg' ? 'bg-[#FF5F1F] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            kg
          </button>
          <button
            onClick={() => setUnit('lb')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              unit === 'lb' ? 'bg-[#FF5F1F] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            lb
          </button>
        </div>
      </div>

      {celebrationMsg && (
        <div className="p-3 rounded-2xl bg-[#FF5F1F]/20 border border-[#FF5F1F]/40 text-[#FF5F1F] text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{celebrationMsg}</span>
        </div>
      )}

      {/* Streak Dashboard Card */}
      <div className="p-5 rounded-[2rem] bg-[#121212] border border-[#222222] flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FF5F1F]/15 border border-[#FF5F1F]/30 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(255,95,31,0.2)]">
            🔥
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">CURRENT STREAK</span>
            <h3 className="text-xl font-black text-white">{prefs.currentStreak} Days</h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">ALL-TIME BEST</span>
          <p className="text-base font-bold text-[#FF5F1F]">{prefs.bestStreak} Days</p>
        </div>
      </div>

      {/* Body Weight Tracker Section */}
      <div className="p-5 rounded-[2rem] bg-[#121212] border border-[#222222] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#FF5F1F]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Body Weight Tracker</h2>
          </div>
          <button
            onClick={() => setShowAddWeight(!showAddWeight)}
            className="px-2.5 py-1 rounded-xl bg-[#181818] border border-[#262626] text-[#FF5F1F] text-xs font-bold hover:border-[#FF5F1F]/40 flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Weight</span>
          </button>
        </div>

        {/* Current vs Target Comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#181818] border border-[#262626]">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Current Weight</span>
            <p className="text-xl font-black text-white mt-0.5">
              {convertWeight(prefs.currentWeightKg)} <span className="text-xs font-normal text-neutral-400">{unit}</span>
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#181818] border border-[#262626]">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Target Goal</span>
            <p className="text-xl font-black text-[#FF5F1F] mt-0.5">
              {convertWeight(prefs.targetWeightKg)} <span className="text-xs font-normal text-neutral-400">{unit}</span>
            </p>
          </div>
        </div>

        {/* Log weight input form */}
        {showAddWeight && (
          <form onSubmit={handleSaveWeight} className="p-3 rounded-2xl bg-[#181818] border border-[#262626] space-y-2 animate-fadeIn">
            <label className="text-xs font-semibold text-neutral-300">Enter weight in {unit}:</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={newWeightInput}
                onChange={(e) => setNewWeightInput(e.target.value)}
                placeholder={`e.g. ${unit === 'kg' ? '76.5' : '168'}`}
                className="flex-1 h-10 px-3 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 h-10 rounded-xl bg-[#FF5F1F] text-black text-xs font-black hover:bg-[#ff753b]"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* Native Bar Chart Visualization */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-400">Weight Trend (Recent Weeks)</span>
          <div className="flex items-end justify-between h-28 pt-4 pb-2 px-1 border-b border-[#222222]">
            {weightLogs.map((log, idx) => {
              const heightPct = Math.min(100, Math.max(30, ((log.weightKg - 70) / 15) * 100));
              return (
                <div key={log.id || idx} className="flex flex-col items-center gap-1.5 flex-1">
                  <span className="text-[10px] font-mono text-neutral-400">{convertWeight(log.weightKg)}</span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-4 rounded-t-lg bg-[#FF5F1F] hover:bg-[#ff753b] shadow-[0_0_8px_rgba(255,95,31,0.3)] transition-all"
                  />
                  <span className="text-[9px] text-neutral-500 truncate max-w-[48px]">{log.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Personal Records Board */}
      <div className="p-5 rounded-[2rem] bg-[#121212] border border-[#222222] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#FF5F1F]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Personal Records (PR)</h2>
          </div>
          <span className="text-[11px] text-neutral-400">All-time bests</span>
        </div>

        <div className="space-y-2">
          {personalRecords.map((pr) => (
            <div
              key={pr.exerciseId}
              className="p-3.5 rounded-2xl bg-[#181818] border border-[#262626] flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{pr.exerciseName}</h4>
                  {pr.isNew && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#FF5F1F] text-black">
                      NEW PR
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 mt-0.5">Logged: {pr.date}</p>
              </div>

              <div className="text-right">
                <span className="text-base font-black text-[#FF5F1F]">
                  {convertWeight(pr.weightKg)} {unit}
                </span>
                <span className="text-[10px] text-neutral-400 block font-medium">× {pr.reps} reps</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="p-5 rounded-[2rem] bg-[#121212] border border-[#222222] space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#FF5F1F]" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Milestone Badges</h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((b) => (
            <div
              key={b.title}
              className={`p-3.5 rounded-2xl border transition-all ${
                b.unlocked
                  ? 'bg-[#181818] border-[#FF5F1F]/30 shadow-[0_0_15px_rgba(255,95,31,0.08)]'
                  : 'bg-[#121212]/40 border-[#222222] opacity-40'
              }`}
            >
              <div className="text-2xl mb-1">{b.icon}</div>
              <h4 className="text-xs font-bold text-white">{b.title}</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5 leading-tight">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
