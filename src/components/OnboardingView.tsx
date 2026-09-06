import React, { useState } from 'react';
import { UserPreferences, FitnessGoal, WorkoutLocation, ExperienceLevel } from '../types';
import { ArrowRight, ArrowLeft, Check, Dumbbell, Home, Zap, Shield, Flame } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: (updated: Partial<UserPreferences>) => void;
  initialPrefs: UserPreferences;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete, initialPrefs }) => {
  const [step, setStep] = useState(0); // 0 to 5
  const [goal, setGoal] = useState<FitnessGoal>(initialPrefs.primaryGoal);
  const [location, setLocation] = useState<WorkoutLocation>(initialPrefs.workoutLocation);
  const [level, setLevel] = useState<ExperienceLevel>(initialPrefs.experienceLevel);
  const [days, setDays] = useState<number>(initialPrefs.workoutDaysPerWeek);
  const [duration, setDuration] = useState<number>(initialPrefs.workoutDurationMinutes);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete({
        isOnboardingCompleted: true,
        primaryGoal: goal,
        workoutLocation: location,
        experienceLevel: level,
        workoutDaysPerWeek: days,
        workoutDurationMinutes: duration
      });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#0A0A0A] text-neutral-100 min-h-full">
      {/* Top Header & Progress Steps */}
      <div>
        <div className="flex items-center justify-between mb-5">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="p-2 rounded-xl bg-[#141414] border border-[#222222] text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8" />
          )}

          {/* 6 Step Progress Indicators */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === step
                    ? 'w-6 bg-[#FF5F1F] shadow-[0_0_8px_rgba(255,95,31,0.5)]'
                    : idx < step
                    ? 'w-3 bg-[#FF5F1F]/50'
                    : 'w-2 bg-[#222222]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => handleNext()}
            className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors font-medium px-2 py-1"
          >
            {step === 5 ? 'Done' : 'Skip'}
          </button>
        </div>

        {/* Dynamic Screen Content */}
        {step === 0 && (
          <div className="flex flex-col items-center text-center pt-8 animate-fadeIn">
            <div className="w-24 h-24 rounded-[2rem] bg-[#FF5F1F]/10 border border-[#FF5F1F]/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,95,31,0.2)]">
              <Zap className="w-12 h-12 text-[#FF5F1F] fill-[#FF5F1F]/20" />
            </div>

            <p className="text-sm font-semibold tracking-wider text-[#FF5F1F] uppercase mb-2">
              Welcome to
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
              FITFORGE
            </h1>
            <p className="text-base text-neutral-300 italic max-w-xs mb-8">
              "Your personalized GYM & Home workout companion."
            </p>

            {/* Value Props */}
            <div className="w-full space-y-3 text-left">
              <div className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF5F1F]/15 flex items-center justify-center text-[#FF5F1F]">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dual Mode Training</h4>
                  <p className="text-xs text-neutral-400">Seamlessly switch between Gym gear and Home setups</p>
                </div>
              </div>

              <div className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF5F1F]/15 flex items-center justify-center text-[#FF5F1F]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Interactive Workout Engine</h4>
                  <p className="text-xs text-neutral-400">Live sets, rest audio-haptic timers & auto progression</p>
                </div>
              </div>

              <div className="p-4 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF5F1F]/15 flex items-center justify-center text-[#FF5F1F]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Offline Capable</h4>
                  <p className="text-xs text-neutral-400">Room database keeps your workout data persistent and local</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="pt-2 animate-fadeIn">
            <span className="text-xs font-semibold text-[#FF5F1F] tracking-wider uppercase">Step 2 of 6</span>
            <h2 className="text-2xl font-black text-white mt-1 mb-2">What is your primary goal?</h2>
            <p className="text-xs text-neutral-400 mb-5">We'll adjust your rep ranges, volume, and conditioning balance.</p>

            <div className="space-y-2.5">
              {[
                { title: 'Build Muscle', desc: 'Maximize hypertrophy, volume and sculpted definition', emoji: '💪' },
                { title: 'Lose Fat', desc: 'Burn calories and boost metabolic conditioning rate', emoji: '🔥' },
                { title: 'Get Stronger', desc: 'Focus on heavy progressive overload on compound lifts', emoji: '🏋️' },
                { title: 'Improve Fitness', desc: 'Enhance cardiovascular capacity and overall vitality', emoji: '⚡' },
                { title: 'Improve Endurance', desc: 'Sustained muscular stamina and high-rep resilience', emoji: '🏃' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => setGoal(item.title as FitnessGoal)}
                  className={`w-full p-4 rounded-[1.5rem] border text-left transition-all flex items-center justify-between ${
                    goal === item.title
                      ? 'bg-[#141414] border-[#FF5F1F] ring-1 ring-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.15)]'
                      : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className={`text-sm font-bold ${goal === item.title ? 'text-[#FF5F1F]' : 'text-white'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                  {goal === item.title && (
                    <div className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center text-black shrink-0 shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="pt-2 animate-fadeIn">
            <span className="text-xs font-semibold text-[#FF5F1F] tracking-wider uppercase">Step 3 of 6</span>
            <h2 className="text-2xl font-black text-white mt-1 mb-2">Where do you workout?</h2>
            <p className="text-xs text-neutral-400 mb-6">Choose your environment. You can switch between them anytime.</p>

            <div className="space-y-3">
              {[
                {
                  loc: 'GYM' as WorkoutLocation,
                  title: '🏋️ GYM',
                  subtitle: 'Full access to barbells, squat racks, dumbbells, and cable machines.'
                },
                {
                  loc: 'HOME' as WorkoutLocation,
                  title: '🏠 HOME',
                  subtitle: 'Bodyweight, resistance bands, kettlebells, and compact home equipment.'
                },
                {
                  loc: 'BOTH' as WorkoutLocation,
                  title: '⚡ BOTH',
                  subtitle: 'Dynamic hybrid plans adaptable whether you are at home or at the gym.'
                }
              ].map((item) => (
                <button
                  key={item.loc}
                  onClick={() => setLocation(item.loc)}
                  className={`w-full p-4 rounded-[1.5rem] border text-left transition-all flex items-center justify-between ${
                    location === item.loc
                      ? 'bg-[#141414] border-[#FF5F1F] ring-1 ring-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.15)]'
                      : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div>
                    <h4 className={`text-base font-bold ${location === item.loc ? 'text-[#FF5F1F]' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">{item.subtitle}</p>
                  </div>
                  {location === item.loc && (
                    <div className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center text-black shrink-0 shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="pt-2 animate-fadeIn">
            <span className="text-xs font-semibold text-[#FF5F1F] tracking-wider uppercase">Step 4 of 6</span>
            <h2 className="text-2xl font-black text-white mt-1 mb-2">What's your experience level?</h2>
            <p className="text-xs text-neutral-400 mb-6">Ensures exercise complexity and intensity suit your current background.</p>

            <div className="space-y-3">
              {[
                {
                  lvl: 'Beginner' as ExperienceLevel,
                  title: '🌱 Beginner',
                  desc: '< 1 year training. Learning proper biomechanics and consistent habits.'
                },
                {
                  lvl: 'Intermediate' as ExperienceLevel,
                  title: '🔥 Intermediate',
                  desc: '1–3 years experience. Solid form and looking for progressive overload.'
                },
                {
                  lvl: 'Advanced' as ExperienceLevel,
                  title: '⚡ Advanced',
                  desc: '3+ years. High training tolerance, periodization, and personal records.'
                }
              ].map((item) => (
                <button
                  key={item.lvl}
                  onClick={() => setLevel(item.lvl)}
                  className={`w-full p-4 rounded-[1.5rem] border text-left transition-all flex items-center justify-between ${
                    level === item.lvl
                      ? 'bg-[#141414] border-[#FF5F1F] ring-1 ring-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.15)]'
                      : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div>
                    <h4 className={`text-base font-bold ${level === item.lvl ? 'text-[#FF5F1F]' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">{item.desc}</p>
                  </div>
                  {level === item.lvl && (
                    <div className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center text-black shrink-0 shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="pt-2 animate-fadeIn">
            <span className="text-xs font-semibold text-[#FF5F1F] tracking-wider uppercase">Step 5 of 6</span>
            <h2 className="text-2xl font-black text-white mt-1 mb-2">How many days can you workout?</h2>
            <p className="text-xs text-neutral-400 mb-6">Select a sustainable schedule to build your training streak.</p>

            <div className="space-y-2.5">
              {[
                { count: 2, label: '2 Days / week', desc: 'Full Body Split with maximum recovery' },
                { count: 3, label: '3 Days / week', desc: 'Classic Push / Pull / Legs or Full Body' },
                { count: 4, label: '4 Days / week', desc: 'Optimal Upper / Lower hypertrophy split' },
                { count: 5, label: '5 Days / week', desc: 'Bro Split or PPL + Upper/Lower hybrid' },
                { count: 6, label: '6 Days / week', desc: 'Dedicated 6-Day Push / Pull / Legs routine' },
              ].map((item) => (
                <button
                  key={item.count}
                  onClick={() => setDays(item.count)}
                  className={`w-full p-4 rounded-[1.5rem] border text-left transition-all flex items-center justify-between ${
                    days === item.count
                      ? 'bg-[#141414] border-[#FF5F1F] ring-1 ring-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.15)]'
                      : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div>
                    <h4 className={`text-sm font-bold ${days === item.count ? 'text-[#FF5F1F]' : 'text-white'}`}>
                      {item.label}
                    </h4>
                    <p className="text-xs text-neutral-400">{item.desc}</p>
                  </div>
                  {days === item.count && (
                    <div className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center text-black shrink-0 shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="pt-2 animate-fadeIn">
            <span className="text-xs font-semibold text-[#FF5F1F] tracking-wider uppercase">Step 6 of 6</span>
            <h2 className="text-2xl font-black text-white mt-1 mb-2">How long is each workout?</h2>
            <p className="text-xs text-neutral-400 mb-6">We'll design the exact number of sets and rest intervals for your schedule.</p>

            <div className="space-y-2.5">
              {[
                { mins: 15, label: '15 Minutes', desc: 'Quick HIIT, tabata & core burn' },
                { mins: 30, label: '30 Minutes', desc: 'Express focused session' },
                { mins: 45, label: '45 Minutes', desc: 'Standard balanced muscle building session' },
                { mins: 60, label: '60 Minutes', desc: 'Full hypertrophy and accessory volume' },
                { mins: 90, label: '90 Minutes', desc: 'Heavy strength blocks & deep accessory work' },
              ].map((item) => (
                <button
                  key={item.mins}
                  onClick={() => setDuration(item.mins)}
                  className={`w-full p-4 rounded-[1.5rem] border text-left transition-all flex items-center justify-between ${
                    duration === item.mins
                      ? 'bg-[#141414] border-[#FF5F1F] ring-1 ring-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.15)]'
                      : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div>
                    <h4 className={`text-sm font-bold ${duration === item.mins ? 'text-[#FF5F1F]' : 'text-white'}`}>
                      {item.label}
                    </h4>
                    <p className="text-xs text-neutral-400">{item.desc}</p>
                  </div>
                  {duration === item.mins && (
                    <div className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center text-black shrink-0 shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="pt-6 pb-2">
        <button
          onClick={handleNext}
          className="w-full h-14 rounded-2xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_4px_25px_rgba(255,95,31,0.35)] active:scale-[0.98]"
        >
          <span>{step === 5 ? 'GET STARTED' : 'CONTINUE'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
