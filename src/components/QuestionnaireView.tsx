import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Check, RotateCcw } from 'lucide-react';
import { QUESTIONS, LIFE_STAGES } from '../data/questionsData';
import { UserAnswers, UserBasicInfo } from '../types';
import { SpeechBubbleTitle, CardCharacterAvatar } from './StationeryIllustrations';

interface QuestionnaireViewProps {
  basicInfo: UserBasicInfo;
  setBasicInfo: React.Dispatch<React.SetStateAction<UserBasicInfo>>;
  answers: UserAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<UserAnswers>>;
  onComplete: () => void;
  onBackToLanding: () => void;
  onFillCurrentSample: (questionId: number) => void;
  onReset: () => void;
  hasSavedData: boolean;
}

const STEP_ACCENTS = [
  { hex: '#161616', label: 'STEP 00 · 기본 프로필', avatar: 'green' as const },
  { hex: '#F25235', label: 'STEP 01 · 오랫동안 해온 일', avatar: 'coral' as const },
  { hex: '#00994C', label: 'STEP 02 · 자주 부탁받는 일', avatar: 'green' as const },
  { hex: '#0D4085', label: 'STEP 03 · 문제 해결 방식', avatar: 'navy' as const },
  { hex: '#E04F5F', label: 'STEP 04 · 돌봄·공동체 경험', avatar: 'coral' as const },
  { hex: '#D97706', label: 'STEP 05 · 좋아하는 배움 분야', avatar: 'green' as const },
  { hex: '#1479C9', label: 'STEP 06 · 돕고 싶은 대상', avatar: 'navy' as const }
];

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  basicInfo,
  setBasicInfo,
  answers,
  setAnswers,
  onComplete,
  onBackToLanding,
  onFillCurrentSample,
  onReset,
  hasSavedData
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const totalSteps = 7; // Step 0 (기본정보) + 6 Questions
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);
  const currentQuestion = currentStep > 0 ? QUESTIONS[currentStep - 1] : null;
  const activeAccent = STEP_ACCENTS[currentStep] || STEP_ACCENTS[0];

  const handleToggleOption = (optionId: string) => {
    if (!currentQuestion) return;

    const currentAnswer = answers[currentQuestion.id] || {
      selectedOptionIds: [],
      customText: ''
    };

    let newSelected: string[] = [];

    if (currentQuestion.isMultiSelect) {
      const maxSelect = currentQuestion.maxSelect || 2;
      if (currentAnswer.selectedOptionIds.includes(optionId)) {
        newSelected = currentAnswer.selectedOptionIds.filter((id) => id !== optionId);
      } else if (currentAnswer.selectedOptionIds.length >= maxSelect) {
        newSelected = [...currentAnswer.selectedOptionIds.slice(1), optionId];
      } else {
        newSelected = [...currentAnswer.selectedOptionIds, optionId];
      }
    } else {
      newSelected = [optionId];
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        selectedOptionIds: newSelected
      }
    }));
  };

  const handleTextChange = (text: string) => {
    if (!currentQuestion) return;

    const currentAnswer = answers[currentQuestion.id] || {
      selectedOptionIds: [],
      customText: ''
    };

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        customText: text
      }
    }));
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return basicInfo.name.trim().length > 0;
    }
    if (!currentQuestion) return false;
    const ans = answers[currentQuestion.id];
    return (
      Boolean(ans?.selectedOptionIds && ans.selectedOptionIds.length > 0) ||
      Boolean(ans?.customText && ans.customText.trim().length > 0)
    );
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBackToLanding();
    }
  };

  return (
    <div className="w-full">
      {/* Top Graph-Paper Planner Progress Header */}
      <section className="bg-grid-paper border-b border-[#E5E8EC] pt-8 pb-7 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <SpeechBubbleTitle className="scale-90 origin-left">
              나만의 <span className="text-[#FDD116]">경험 노트</span> 채우기
            </SpeechBubbleTitle>

            <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-[#333840] tabular-nums">
              <span>
                {currentStep === 0 ? '기본 정보' : `질문 0${currentStep} / 06`} · {progressPercent}%
              </span>
              {hasSavedData && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#68707C] hover:text-[#F25235] transition cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>초기화</span>
                </button>
              )}
            </div>
          </div>

          {/* Crisp Black & Yellow Planner Progress Bar */}
          <div className="w-full h-3 bg-[#E9ECEF] rounded-full overflow-hidden border border-[#161616]/15">
            <div
              className="h-full bg-[#161616] transition-transform duration-200 origin-left"
              style={{ transform: `scaleX(${progressPercent / 100})` }}
            />
          </div>

          {/* Interactive Step Tabs */}
          <div className="grid grid-cols-7 gap-1.5 mt-3">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const isCurrent = idx === currentStep;
              const isDone = idx < currentStep;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={`py-1.5 rounded-lg text-xs font-bold tabular-nums transition cursor-pointer border ${
                    isCurrent
                      ? 'bg-[#FDD116] border-[#161616] text-[#161616]'
                      : isDone
                      ? 'bg-[#161616] border-[#161616] text-white'
                      : 'bg-white border-[#DCE1E7] text-[#7A828E] hover:border-[#161616]'
                  }`}
                >
                  {idx === 0 ? '시작' : `0${idx}`}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Sunny Yellow / Stationery Form Canvas */}
      <section className="bg-[#FDD116] py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* STEP 0: BASIC INFO */}
          {currentStep === 0 && (
            <div className="bg-white rounded-[26px] p-6 sm:p-10 shadow-md">
              <div className="flex items-end gap-4 pb-5 mb-7 border-b border-[#E5E8EC]">
                <CardCharacterAvatar variant="green" className="-mt-4" />
                <div className="pb-1">
                  <p className="text-xs sm:text-sm font-bold text-[#00994C] mb-1">
                    플래너 첫 장을 여는 마음으로
                  </p>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#161616] tracking-tight text-balance">
                    반갑습니다! 당신의 이름을 알려주세요
                  </h2>
                </div>
              </div>

              <div className="space-y-7">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="basic-name-input"
                    className="block text-base font-extrabold text-[#161616] mb-2"
                  >
                    01. 이름 또는 활동명 <span className="text-[#F25235]">*</span>
                  </label>
                  <input
                    id="basic-name-input"
                    type="text"
                    value={basicInfo.name}
                    onChange={(e) =>
                      setBasicInfo((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="예: 김지은"
                    className="w-full text-lg font-semibold px-4 py-3.5 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden transition bg-[#FAFAFB]"
                  />
                </div>

                {/* Life Stage Selector */}
                <div>
                  <label className="block text-base font-extrabold text-[#161616] mb-2">
                    02. 현재 나의 상황 · 주된 관심
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {LIFE_STAGES.map((stage) => {
                      const isSelected = basicInfo.lifeStage === stage;
                      return (
                        <button
                          key={stage}
                          type="button"
                          onClick={() =>
                            setBasicInfo((prev) => ({ ...prev, lifeStage: stage }))
                          }
                          className={`p-3.5 rounded-xl text-left text-sm font-bold border-2 transition cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'border-[#161616] bg-[#FFF8CC] text-[#161616]'
                              : 'border-[#E2E6EC] bg-white text-[#3B4048] hover:border-[#161616]/50'
                          }`}
                        >
                          <span>{stage}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-md bg-[#161616] text-[#FDD116] flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact / SNS */}
                <div>
                  <label
                    htmlFor="basic-contact-input"
                    className="block text-base font-extrabold text-[#161616] mb-1"
                  >
                    03. 연락처 또는 SNS 주소{' '}
                    <span className="text-xs font-normal text-[#68707C]">(선택)</span>
                  </label>
                  <p className="text-xs text-[#68707C] mb-2">
                    완성될 1페이지 브랜드 프로필 하단에 기재될 이메일, 인스타그램, 블로그 주소입니다.
                  </p>
                  <input
                    id="basic-contact-input"
                    type="text"
                    value={basicInfo.contactOrSns}
                    onChange={(e) =>
                      setBasicInfo((prev) => ({ ...prev, contactOrSns: e.target.value }))
                    }
                    placeholder="예: jieun.kim@email.com / instagram @jieun_brand"
                    className="w-full text-base px-4 py-3 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden transition bg-[#FAFAFB]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 1~6: EXPERIENCE QUESTIONS */}
          {currentStep > 0 && currentQuestion && (
            <div className="bg-white rounded-[26px] overflow-hidden shadow-md">
              {/* Top Solid Stationery Accent Strip */}
              <div
                className="h-3 w-full"
                style={{ backgroundColor: activeAccent.hex }}
                aria-hidden="true"
              />

              <div className="p-6 sm:p-10">
                {/* Question Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E5E8EC]">
                  <div className="flex items-center gap-3.5">
                    <CardCharacterAvatar
                      variant={activeAccent.avatar}
                      className="w-16 h-20 sm:w-20 sm:h-24 -mt-2"
                    />
                    <div>
                      <p
                        className="text-xs sm:text-sm font-extrabold mb-1"
                        style={{ color: activeAccent.hex }}
                      >
                        {currentQuestion.areaTitle}
                      </p>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-[#161616] leading-snug text-balance">
                        {currentQuestion.question}
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onFillCurrentSample(currentQuestion.id)}
                    className="self-start sm:self-center px-3.5 py-2 rounded-full border-2 border-[#161616] bg-white hover:bg-[#FDD116]/30 text-xs font-extrabold text-[#161616] transition cursor-pointer whitespace-nowrap shrink-0"
                  >
                    + 예시 답변 채우기
                  </button>
                </div>

                <p className="text-sm sm:text-base text-[#4A505A] leading-relaxed mb-3">
                  {currentQuestion.description}
                </p>
                {currentQuestion.isMultiSelect && (
                  <p
                    className="text-xs sm:text-sm font-extrabold mb-5"
                    style={{ color: activeAccent.hex }}
                  >
                    가장 공감되는 항목을 최대 {currentQuestion.maxSelect || 2}개까지 체크해보세요.
                  </p>
                )}

                {/* Checklist Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option) => {
                    const selectedIds =
                      answers[currentQuestion.id]?.selectedOptionIds || [];
                    const isSelected = selectedIds.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleToggleOption(option.id)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'border-[#161616] bg-[#FFFBEB]'
                            : 'border-[#E2E6EC] bg-white hover:border-[#161616]/40 hover:bg-[#FAFAFB]'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md mt-0.5 flex items-center justify-center shrink-0 border-2 transition ${
                            isSelected
                              ? 'bg-[#161616] border-[#161616] text-[#FDD116]'
                              : 'border-[#C5CCD6] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>

                        <div className="flex-1">
                          <div className="font-bold text-base sm:text-lg text-[#161616] leading-snug">
                            {option.label}
                          </div>
                          {option.subLabel && (
                            <div className="text-xs sm:text-sm text-[#5E6572] mt-1">
                              {option.subLabel}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Subjective Graph-Paper Memo Box */}
                <div className="bg-grid-paper-subtle rounded-2xl p-5 border border-[#DCE1E7]">
                  <label
                    htmlFor={`question-text-${currentQuestion.id}`}
                    className="block text-base font-extrabold text-[#161616] mb-1"
                  >
                    [나의 경험 메모] {currentQuestion.textPrompt}
                  </label>
                  <p className="text-xs text-[#5E6572] mb-3">
                    {currentQuestion.textHelperTip}
                  </p>
                  <textarea
                    id={`question-text-${currentQuestion.id}`}
                    rows={3}
                    value={answers[currentQuestion.id]?.customText || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder={currentQuestion.textPlaceholder}
                    className="w-full text-base p-4 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden transition bg-white leading-relaxed resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Bar */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              id="question-prev-btn"
              type="button"
              onClick={handlePrev}
              className="min-h-[52px] px-6 py-3 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-base hover:bg-[#FAFAFA] transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{currentStep === 0 ? '소개로' : '이전 단계'}</span>
            </button>

            <button
              id="question-next-btn"
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className={`min-h-[52px] px-8 py-3 rounded-full font-bold text-base flex items-center gap-1.5 transition whitespace-nowrap shrink-0 ${
                canProceed()
                  ? 'bg-[#161616] text-white hover:bg-[#2B2B2B] shadow-md cursor-pointer active:scale-[0.99]'
                  : 'bg-[#161616]/30 text-white/80 cursor-not-allowed'
              }`}
            >
              <span className={canProceed() ? 'text-[#FDD116]' : ''}>
                {currentStep === 6 ? '강점 진단 결과' : '다음 질문'}
              </span>
              <span>{currentStep === 6 ? '확인하기' : '이동하기'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
