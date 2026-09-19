import React from 'react';
import { Compass, Sparkles, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';
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
  onLoadSample,
  onReset,
  hasSavedData
}) => {
  const steps: { id: AppState['currentScreen']; label: string; number: number }[] = [
    { id: 'landing', label: '서비스 소개', number: 1 },
    { id: 'questionnaire', label: '경험 질문', number: 2 },
    { id: 'diagnosis', label: '강점 진단', number: 3 },
    { id: 'statement', label: '브랜드 문장', number: 4 },
    { id: 'profile', label: '1페이지 프로필', number: 5 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f7]/95 backdrop-blur-md border-b border-[#e7e5e1] transition-all no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Slogan */}
        <button
          id="nav-logo-btn"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group transition cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#542344] text-[#faf9f7] flex items-center justify-center shadow-xs group-hover:bg-[#431936] transition">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-[#251f28] tracking-tight block leading-tight">
              나의 브랜드 발견소
            </span>
            <span className="text-[11px] text-[#716875] hidden sm:block leading-tight font-medium">
              경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다
            </span>
          </div>
        </button>

        {/* Middle Steps Nav (visible on tablet/desktop) */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="단계 내비게이션">
          {steps.map((step, idx) => {
            const isActive = currentScreen === step.id;
            return (
              <button
                key={step.id}
                id={`nav-step-${step.id}`}
                onClick={() => onNavigate(step.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-[#542344] text-white shadow-xs'
                    : 'text-[#645c68] hover:bg-[#edeae5] hover:text-[#251f28]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#e2ded8] text-[#554d59]'
                  }`}
                >
                  {step.number}
                </span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            id="nav-sample-load-btn"
            onClick={onLoadSample}
            title="미리 작성된 예시 데이터로 빠르게 체험해보기"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#efe9f0] text-[#542344] hover:bg-[#e4d8e7] transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">예시로 체험하기</span>
            <span className="sm:hidden">예시</span>
          </button>

          {hasSavedData && (
            <button
              id="nav-reset-btn"
              onClick={onReset}
              title="작성된 내용을 모두 비우고 처음부터 시작하기"
              className="p-2 rounded-lg text-[#857b8a] hover:text-[#542344] hover:bg-[#efece8] transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
