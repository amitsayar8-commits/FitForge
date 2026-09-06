import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Maximize2, Minimize2, Smartphone } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  activeTabTitle?: string;
  isDarkTheme?: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  activeTabTitle = 'FitForge',
  isDarkTheme = true
}) => {
  const [time, setTime] = useState('09:41');
  const [isPhoneFramed, setIsPhoneFramed] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#050505] p-2 sm:p-6 select-none">
      {/* Device View Controls */}
      <div className="w-full max-w-md mb-3 flex items-center justify-between text-xs text-neutral-400 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF5F1F] animate-pulse shadow-[0_0_8px_#FF5F1F]" />
          <span className="font-semibold text-neutral-200">Android 15 (Material 3)</span>
          <span className="text-neutral-500">•</span>
          <span>Google Pixel 9 Pro</span>
        </div>
        <button
          onClick={() => setIsPhoneFramed(!isPhoneFramed)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#FF5F1F]/40 text-neutral-300 transition-colors"
          title={isPhoneFramed ? 'Switch to Full Width View' : 'Switch to Android Phone Bezel'}
        >
          {isPhoneFramed ? <Maximize2 className="w-3.5 h-3.5 text-[#FF5F1F]" /> : <Smartphone className="w-3.5 h-3.5 text-[#FF5F1F]" />}
          <span>{isPhoneFramed ? 'Expand' : 'Phone Bezel'}</span>
        </button>
      </div>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${
          isPhoneFramed
            ? 'max-w-[412px] h-[860px] max-h-[92vh] rounded-[44px] ring-12 ring-[#171717] border-4 border-[#262626] shadow-[0_25px_70px_-10px_rgba(0,0,0,0.95)] overflow-hidden'
            : 'max-w-2xl min-h-[90vh] rounded-2xl border border-[#262626] overflow-hidden'
        } ${isDarkTheme ? 'bg-[#0A0A0A] text-neutral-100' : 'bg-slate-50 text-slate-900'}`}
      >
        {/* Android Status Bar */}
        <div className="w-full shrink-0 h-11 px-7 flex items-center justify-between z-30 select-none text-[13px] font-semibold text-neutral-300 bg-[#0A0A0A]">
          <span>{time}</span>

          {/* Punch-hole Front Camera */}
          <div className="w-3.5 h-3.5 rounded-full bg-[#050505] border border-neutral-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[11px] font-mono">98%</span>
              <Battery className="w-4 h-4 fill-[#FF5F1F] text-[#FF5F1F]" />
            </div>
          </div>
        </div>

        {/* App Content Screen */}
        <div className="flex-1 w-full flex flex-col overflow-y-auto relative custom-scrollbar bg-[#0A0A0A]">
          {children}
        </div>

        {/* Android Navigation Gesture Pill */}
        {isPhoneFramed && (
          <div className="w-full shrink-0 h-6 flex items-center justify-center pb-2 pointer-events-none z-30 bg-[#0A0A0A]">
            <div className="w-32 h-1 rounded-full bg-neutral-700/60" />
          </div>
        )}
      </div>
    </div>
  );
};
