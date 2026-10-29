import React from 'react';
import { AppState } from '../types';

interface NavbarProps {
  currentScreen: AppState['currentScreen'];
  onNavigate: (screen: AppState['currentScreen']) => void;
  onLoadSample: () => void;
  onReset: () => void;
  hasSavedData: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onLoadSample
}) => {
  const steps: { id: AppState['currentScreen']; label: string }[] = [
    { id: 'landing', label: '서비스 소개' },
    { id: 'questionnaire', label: '경험 질문' },
    { id: 'diagnosis', label: '강점 진단' },
    { id: 'statement', label: '브랜드 문장' },
    { id: 'profile', label: '1페이지 프로필' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E8EC] no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          id="nav-logo-btn"
          type="button"
          onClick={() => onNavigate('landing')}
          className="font-display font-bold text-lg sm:text-xl text-[#161616] tracking-tight whitespace-nowrap shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        >
          나의 브랜드 발견소
        </button>

        {/* Zone 2: 5 Clean Single-Line Text Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#555B65]"
          aria-label="단계 내비게이션"
        >
          {steps.map((step) => {
            const isActive = currentScreen === step.id;
            return (
              <button
                key={step.id}
                id={`nav-step-${step.id}`}
                type="button"
                onClick={() => onNavigate(step.id)}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-[#161616] font-extrabold border-[#F25235]'
                    : 'border-transparent hover:text-[#161616] hover:border-[#161616]/30'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Utility Action */}
        <div className="flex items-center shrink-0">
          <button
            id="nav-sample-load-btn"
            type="button"
            onClick={onLoadSample}
            className="px-4 py-2 rounded-full bg-[#161616] text-white text-xs sm:text-sm font-bold hover:bg-[#2c2c2c] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            예시로 체험하기
          </button>
        </div>
      </div>
    </header>
  );
};
