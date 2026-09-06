import React from 'react';
import { Exercise } from '../types';
import { X, Clock, Dumbbell, AlertTriangle, Lightbulb, CheckCircle, Shield } from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({ exercise, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="w-full max-w-md max-h-[90vh] rounded-[2rem] bg-[#121212] border border-[#222222] flex flex-col overflow-hidden text-neutral-100 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between shrink-0 bg-[#141414]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-[#FF5F1F]/20 text-[#FF5F1F] border border-[#FF5F1F]/30">
              {exercise.category}
            </span>
            <span className="text-xs text-neutral-400">{exercise.difficulty}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#181818] border border-[#262626] text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <h2 className="text-xl font-black text-white">{exercise.name}</h2>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{exercise.description}</p>
          </div>

          {/* Muscle Anatomy Card */}
          <div className="p-4 rounded-2xl bg-[#181818] border border-[#262626] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Primary Target:</span>
              <span className="font-bold text-[#FF5F1F]">{exercise.targetMuscle}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Secondary:</span>
              <span className="font-medium text-neutral-300">{exercise.secondaryMuscles}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Equipment:</span>
              <span className="font-medium text-neutral-300">{exercise.equipment}</span>
            </div>
          </div>

          {/* Scheme */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-2xl bg-[#181818] border border-[#262626] flex items-center gap-2.5">
              <Dumbbell className="w-4 h-4 text-[#FF5F1F]" />
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Standard Sets</span>
                <p className="text-xs font-bold text-white">{exercise.defaultSets} sets × {exercise.defaultReps}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#181818] border border-[#262626] flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#FF5F1F]" />
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Rest Interval</span>
                <p className="text-xs font-bold text-white">{exercise.defaultRestSeconds} seconds</p>
              </div>
            </div>
          </div>

          {/* Execution Instructions */}
          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Execution Instructions
            </h4>
            <div className="space-y-2">
              {exercise.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <span className="w-4 h-4 rounded-full bg-[#181818] border border-[#262626] text-[#FF5F1F] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="p-3.5 rounded-2xl bg-[#181818] border border-[#FF5F1F]/30 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-[#FF5F1F] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-[#FF5F1F]">Coach's Pro Tip</h5>
              <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{exercise.tips}</p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="p-3.5 rounded-2xl bg-[#181818] border border-red-500/30 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-red-400">Avoid Common Mistakes</h5>
              <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{exercise.commonMistakes}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222222] bg-[#141414] shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black font-black text-xs uppercase tracking-wider transition-colors shadow-[0_4px_15px_rgba(255,95,31,0.3)]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
