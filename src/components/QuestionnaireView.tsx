import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  User,
  Phone,
  Bookmark
} from 'lucide-react';
import { QUESTIONS, LIFE_STAGES } from '../data/questionsData';
import { UserAnswers, UserBasicInfo } from '../types';

interface QuestionnaireViewProps {
  basicInfo: UserBasicInfo;
  setBasicInfo: React.Dispatch<React.SetStateAction<UserBasicInfo>>;
  answers: UserAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<UserAnswers>>;
  onComplete: () => void;
  onBackToLanding: () => void;
  onFillCurrentSample: (questionId: number) => void;
}

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  basicInfo,
  setBasicInfo,
  answers,
  setAnswers,
  onComplete,
  onBackToLanding,
  onFillCurrentSample
}) => {
  // Step 0 is Basic Info, Step 1 to 6 are the 6 experience domains
  const [currentStep, setCurrentStep] = useState<number>(0);

  const totalSteps = 7; // Step 0 (기본정보) + 6 Questions
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const currentQuestion = currentStep > 0 ? QUESTIONS[currentStep - 1] : null;

  // Toggle option selection
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
      } else {
        if (currentAnswer.selectedOptionIds.length >= maxSelect) {
          // Replace first or limit
          newSelected = [...currentAnswer.selectedOptionIds.slice(1), optionId];
        } else {
          newSelected = [...currentAnswer.selectedOptionIds, optionId];
        }
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

  // Handle custom text change
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

  // Check if current step can proceed
  const canProceed = () => {
    if (currentStep === 0) {
      return basicInfo.name.trim().length > 0;
    }
    if (!currentQuestion) return false;
    const ans = answers[currentQuestion.id];
    // Can proceed if at least 1 option is chosen OR custom text is entered
    return (ans?.selectedOptionIds && ans.selectedOptionIds.length > 0) || (ans?.customText && ans.customText.trim().length > 0);
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Progress Bar & Step Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#665e6b] mb-2">
          <span>
            {currentStep === 0 ? '기본 정보 입력' : `${currentStep} / 6번째 질문`}
          </span>
          <span className="text-[#542344] font-bold">{progressPercent}% 진행</span>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-2.5 bg-[#e8e4dc] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#542344] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step dots for easy glance */}
        <div className="flex items-center justify-between mt-3 px-1">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                // Allow navigating to any visited step
                setCurrentStep(idx);
              }}
              title={idx === 0 ? '기본 정보' : `${idx}번 질문`}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                idx === currentStep
                  ? 'bg-[#542344] scale-125'
                  : idx < currentStep
                  ? 'bg-[#a37fa0]'
                  : 'bg-[#dedbd4]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 0: Basic Info Form */}
      {currentStep === 0 && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#e5e1d8] shadow-xs">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-md bg-[#efe9f0] text-[#542344] text-xs font-bold mb-3">
              시작하기 전에
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#231c26] tracking-tight mb-2">
              반갑습니다! 당신의 이름을 알려주세요
            </h2>
            <p className="text-sm sm:text-base text-[#68606e]">
              완성될 1페이지 브랜드 프로필에 표시될 기본 정보입니다. 언제든 나중에 수정할 수 있습니다.
            </p>
          </div>

          <div className="space-y-6">
            {/* Name input */}
            <div>
              <label htmlFor="basic-name-input" className="block text-base font-bold text-[#2b252f] mb-2">
                이름 또는 활동명 <span className="text-[#962e2e]">*</span>
              </label>
              <input
                id="basic-name-input"
                type="text"
                value={basicInfo.name}
                onChange={(e) =>
                  setBasicInfo((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="예: 김지은"
                className="w-full text-lg px-4 py-3.5 rounded-xl border-2 border-[#d9d4cb] focus:border-[#542344] focus:outline-hidden transition bg-[#faf9f8]"
              />
            </div>

            {/* Life stage select */}
            <div>
              <label className="block text-base font-bold text-[#2b252f] mb-2">
                현재 나의 상황 / 주된 관심
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
                      className={`p-3.5 rounded-xl text-left text-sm font-semibold border-2 transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#542344] bg-[#f8f2f8] text-[#542344]'
                          : 'border-[#e4dfd6] bg-white text-[#453d49] hover:bg-[#faf9f8]'
                      }`}
                    >
                      <span>{stage}</span>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-[#542344]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact / SNS (optional) */}
            <div>
              <label htmlFor="basic-contact-input" className="block text-base font-bold text-[#2b252f] mb-1">
                연락처 또는 SNS 주소 <span className="text-xs font-normal text-[#817786]">(선택)</span>
              </label>
              <p className="text-xs text-[#786e7c] mb-2">
                이메일, 인스타그램, 블로그 등 프로필에 기재하고 싶은 주소를 적어주세요.
              </p>
              <input
                id="basic-contact-input"
                type="text"
                value={basicInfo.contactOrSns}
                onChange={(e) =>
                  setBasicInfo((prev) => ({ ...prev, contactOrSns: e.target.value }))
                }
                placeholder="예: jieun.kim@email.com / instagram @jieun_brand"
                className="w-full text-base px-4 py-3 rounded-xl border border-[#d9d4cb] focus:border-[#542344] focus:outline-hidden transition bg-[#faf9f8]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 1~6: Question Cards */}
      {currentStep > 0 && currentQuestion && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#e5e1d8] shadow-xs">
          {/* Question Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-md bg-[#efe9f0] text-[#542344] text-xs sm:text-sm font-bold">
                {currentQuestion.areaTitle}
              </span>
              <button
                type="button"
                onClick={() => onFillCurrentSample(currentQuestion.id)}
                className="text-xs font-semibold text-[#542344] bg-[#f7f2f8] px-3 py-1.5 rounded-lg border border-[#e7d8e9] hover:bg-[#efe4f1] transition flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>예시 답변 채우기</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#231c26] tracking-tight leading-snug mb-2">
              {currentQuestion.question}
            </h2>
            <p className="text-sm sm:text-base text-[#6b6270] leading-relaxed">
              {currentQuestion.description}
            </p>
            {currentQuestion.isMultiSelect && (
              <p className="text-xs font-semibold text-[#542344] mt-2">
                * 가장 공감되는 항목을 최대 {currentQuestion.maxSelect || 2}개까지 선택해주세요.
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => {
              const selectedIds =
                answers[currentQuestion.id]?.selectedOptionIds || [];
              const isSelected = selectedIds.includes(option.id);

              return (
                <div
                  key={option.id}
                  onClick={() => handleToggleOption(option.id)}
                  className={`p-4 sm:p-5 rounded-xl border-2 transition cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#542344] bg-[#f9f4f9] text-[#2c222f] shadow-xs'
                      : 'border-[#e8e4dc] bg-white text-[#453d49] hover:border-[#cfc7d4] hover:bg-[#faf9f8]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition ${
                      isSelected
                        ? 'bg-[#542344] border-[#542344] text-white'
                        : 'border-[#cfc9bf] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-base sm:text-lg leading-snug">
                      {option.label}
                    </div>
                    {option.subLabel && (
                      <div className="text-xs sm:text-sm text-[#736978] mt-1">
                        {option.subLabel}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subjective Short Text Area */}
          <div className="pt-6 border-t border-[#ece7de]">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={`question-text-${currentQuestion.id}`}
                className="block text-base font-bold text-[#29222e]"
              >
                {currentQuestion.textPrompt}
              </label>
            </div>
            <p className="text-xs text-[#7e7383] mb-3">
              💡 {currentQuestion.textHelperTip}
            </p>
            <textarea
              id={`question-text-${currentQuestion.id}`}
              rows={3}
              value={answers[currentQuestion.id]?.customText || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={currentQuestion.textPlaceholder}
              className="w-full text-base p-4 rounded-xl border border-[#d9d4cb] focus:border-[#542344] focus:outline-hidden transition bg-[#faf9f8] leading-relaxed resize-none"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons (Large & Accessible) */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          id="question-prev-btn"
          type="button"
          onClick={handlePrev}
          className="min-h-[52px] px-6 py-3 rounded-xl border border-[#d2ccc3] text-[#4d4452] font-bold text-base hover:bg-white hover:border-[#9c91a0] transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{currentStep === 0 ? '홈으로' : '이전'}</span>
        </button>

        <button
          id="question-next-btn"
          type="button"
          onClick={handleNext}
          disabled={!canProceed()}
          className={`min-h-[52px] px-8 py-3 rounded-xl font-bold text-base flex items-center gap-2 transition cursor-pointer shadow-xs ${
            canProceed()
              ? 'bg-[#542344] text-white hover:bg-[#431936] active:scale-95'
              : 'bg-[#d8d3cb] text-[#857d76] cursor-not-allowed'
          }`}
        >
          <span>{currentStep === 6 ? '강점 진단 확인하기' : '다음 질문'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
