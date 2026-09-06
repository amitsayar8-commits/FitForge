import React, { useState } from 'react';
import { WorkoutHistoryRecord } from '../types';
import { Calendar, Clock, Flame, Dumbbell, ChevronRight, X, Check } from 'lucide-react';

interface HistoryViewProps {
  historyRecords: WorkoutHistoryRecord[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({ historyRecords }) => {
  const [selectedRecord, setSelectedRecord] = useState<WorkoutHistoryRecord | null>(null);

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 bg-[#0A0A0A] text-neutral-100">
      <div>
        <h1 className="text-2xl font-black text-white">Workout History</h1>
        <p className="text-xs text-neutral-400">Review your past completed sessions and volume</p>
      </div>

      <div className="space-y-3">
        {historyRecords.map((item) => {
          const dateStr = new Date(item.dateTimestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <div
              key={item.id}
              onClick={() => setSelectedRecord(item)}
              className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] hover:border-[#FF5F1F]/40 cursor-pointer transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#FF5F1F]" />
                  <span className="text-xs font-semibold text-neutral-300">{dateStr}</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#FF5F1F]">
                  {Math.round(item.durationSeconds / 60)} min
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{item.workoutTitle}</h3>

              <div className="flex items-center justify-between pt-2 border-t border-[#222222] text-xs text-neutral-400">
                <div className="flex items-center gap-3">
                  <span>{item.exercisesCompleted} Exercises</span>
                  <span>•</span>
                  <span>{item.setsCompleted} Sets</span>
                </div>

                <div className="flex items-center gap-1 text-[#FF5F1F] font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>~{item.estimatedCalories} kcal (Est.)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-5 flex items-center justify-center animate-fadeIn">
          <div className="w-full max-w-sm rounded-[2rem] bg-[#121212] border border-[#262626] p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#FF5F1F] uppercase tracking-wider">COMPLETED SESSION</span>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-xl bg-[#181818] border border-[#262626] text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl font-black text-white">{selectedRecord.workoutTitle}</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]">
                <span className="text-neutral-400 block text-[10px]">DURATION</span>
                <span className="text-white font-bold">{Math.round(selectedRecord.durationSeconds / 60)} minutes</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]">
                <span className="text-neutral-400 block text-[10px]">TOTAL SETS</span>
                <span className="text-white font-bold">{selectedRecord.setsCompleted} sets</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]">
                <span className="text-neutral-400 block text-[10px]">EXERCISES</span>
                <span className="text-white font-bold">{selectedRecord.exercisesCompleted} exercises</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]">
                <span className="text-neutral-400 block text-[10px]">ESTIMATED BURN</span>
                <span className="text-[#FF5F1F] font-bold">~{selectedRecord.estimatedCalories} kcal</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full py-3 rounded-xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black font-black text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(255,95,31,0.3)]"
            >
              CLOSE RECORD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
