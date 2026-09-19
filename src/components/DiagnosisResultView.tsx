import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Briefcase,
  Layers,
  HeartHandshake,
  Tag,
  ShieldAlert,
  Info
} from 'lucide-react';
import { STRENGTH_TYPES } from '../data/strengthTypes';
import { DiagnosisResult, StrengthTypeKey, UserBasicInfo } from '../types';

interface DiagnosisResultViewProps {
  basicInfo: UserBasicInfo;
  diagnosis: DiagnosisResult;
  onUpdateKeywords: (keywords: string[]) => void;
  onNext: () => void;
  onBackToQuestions: () => void;
}

export const DiagnosisResultView: React.FC<DiagnosisResultViewProps> = ({
  basicInfo,
  diagnosis,
  onUpdateKeywords,
  onNext,
  onBackToQuestions
}) => {
  const primaryTypeInfo = STRENGTH_TYPES[diagnosis.primaryType];
  const secondary1Info = STRENGTH_TYPES[diagnosis.secondaryTypes[0]];
  const secondary2Info = STRENGTH_TYPES[diagnosis.secondaryTypes[1]];

  const handleToggleKeyword = (kw: string) => {
    let updated = [...diagnosis.selectedKeywords];
    if (updated.includes(kw)) {
      if (updated.length > 1) {
        updated = updated.filter((k) => k !== kw);
      }
    } else {
      if (updated.length < 3) {
        updated.push(kw);
      } else {
        updated = [...updated.slice(1), kw];
      }
    }
    onUpdateKeywords(updated);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Banner Disclaimer */}
      <div className="flex items-start gap-2.5 p-3.5 sm:p-4 rounded-xl bg-[#f5f2ee] border border-[#e4dfd6] text-xs sm:text-sm text-[#665c6c] mb-8">
        <Info className="w-4 h-4 text-[#542344] shrink-0 mt-0.5" />
        <span>
          <strong>안내:</strong> 본 진단 결과는 전문 심리검사가 아니며, 살아온 소중한 경험 속에서 자신의 고유한 역량을 재발견하고 브랜딩하기 위한 <strong>자기 탐색용 참고자료</strong>입니다.
        </span>
      </div>

      {/* Primary Strength Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e5e1d8] shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#eeeae2]">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#f3edf4] text-[#542344] text-xs sm:text-sm font-bold mb-2">
              대표 강점 유형 (Primary)
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#231c26] tracking-tight flex items-center gap-3">
              <span>{basicInfo.name || '나'}님의 대표 강점은</span>
              <span className="text-[#542344] underline decoration-[#d9a8c7] decoration-4 underline-offset-6">
                [{primaryTypeInfo.name}]
              </span>
            </h1>
            <p className="text-base sm:text-lg font-semibold text-[#574d5b] mt-2">
              “{primaryTypeInfo.oneLiner}”
            </p>
          </div>

          <div className="self-start sm:self-center px-4 py-2 rounded-2xl bg-[#542344] text-white text-center shrink-0">
            <span className="text-[11px] font-medium block text-white/80">시그니처 배지</span>
            <span className="text-sm font-bold tracking-wide">{primaryTypeInfo.badge}</span>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="py-6">
          <p className="text-base sm:text-lg text-[#403744] leading-relaxed">
            {primaryTypeInfo.description}
          </p>
        </div>

        {/* Secondary Strengths Synergies */}
        <div className="mt-4 pt-6 border-t border-[#eeeae2]">
          <h3 className="text-sm font-bold text-[#685e6d] uppercase tracking-wider mb-3">
            함께 발휘되는 보조 강점 2가지
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-[#faf9f7] border border-[#e8e4dc]">
              <div className="flex items-center gap-2 font-bold text-base text-[#241d27] mb-1">
                <span className="w-5 h-5 rounded-full bg-[#542344] text-white text-xs flex items-center justify-center">
                  1
                </span>
                <span>{secondary1Info.name}</span>
                <span className="text-xs font-medium text-[#7d7281]">({secondary1Info.badge})</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5d5462] leading-relaxed">
                {secondary1Info.oneLiner}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#faf9f7] border border-[#e8e4dc]">
              <div className="flex items-center gap-2 font-bold text-base text-[#241d27] mb-1">
                <span className="w-5 h-5 rounded-full bg-[#542344] text-white text-xs flex items-center justify-center">
                  2
                </span>
                <span>{secondary2Info.name}</span>
                <span className="text-xs font-medium text-[#7d7281]">({secondary2Info.badge})</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5d5462] leading-relaxed">
                {secondary2Info.oneLiner}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Behavioral Traits & Recommended Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Behaviors */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e5e1d8] shadow-xs">
          <div className="flex items-center gap-2 text-base font-bold text-[#231c26] mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#542344]" />
            <h3>강점을 보여주는 구체적 행동 특징</h3>
          </div>
          <ul className="space-y-3 text-sm sm:text-base text-[#463d4a]">
            {primaryTypeInfo.behaviors.map((beh, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#542344] mt-2 shrink-0" />
                <span>{beh}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Jobs & Fields */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e5e1d8] shadow-xs">
          <div className="flex items-center gap-2 text-base font-bold text-[#231c26] mb-4">
            <Briefcase className="w-5 h-5 text-[#542344]" />
            <h3>활용할 수 있는 활동 및 직무 분야</h3>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-[#463d4a]">
            {primaryTypeInfo.recommendedJobs.map((job, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-lg bg-[#faf8f9] border border-[#eee5ef] font-medium text-[#3b323e]"
              >
                {job}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Caution & Self-Care Tips */}
      <div className="bg-[#fef9f7] rounded-2xl p-6 border border-[#f0e4dc] mb-8">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#b35327] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base text-[#8a3814] mb-1">
              주의해야 할 약점과 셀프케어 팁
            </h4>
            <p className="text-sm sm:text-base text-[#5c3e32] leading-relaxed">
              {primaryTypeInfo.cautions}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Keywords Selection */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5e1d8] shadow-xs mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#542344]" />
            <h3 className="text-lg font-bold text-[#231c26]">
              추천 브랜드 키워드 5개
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#542344] bg-[#f7f2f8] px-2.5 py-1 rounded-md">
            프로필에 담을 키워드 3개 선택
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#6c6271] mb-5">
          나를 가장 잘 표현하는 단어를 클릭하여 선택해보세요. (프로필에는 선택된 3개가 대표로 노출됩니다)
        </p>

        <div className="flex flex-wrap gap-2.5">
          {diagnosis.recommendedKeywords.map((kw) => {
            const isSelected = diagnosis.selectedKeywords.includes(kw);
            return (
              <button
                key={kw}
                type="button"
                onClick={() => handleToggleKeyword(kw)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'border-[#542344] bg-[#542344] text-white shadow-xs'
                    : 'border-[#dfd9d0] bg-[#faf9f8] text-[#4d4452] hover:border-[#bda8be]'
                }`}
              >
                <span>#{kw}</span>
                {isSelected && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          id="diagnosis-back-btn"
          type="button"
          onClick={onBackToQuestions}
          className="min-h-[52px] px-6 py-3 rounded-xl border border-[#d2ccc3] text-[#4d4452] font-bold text-base hover:bg-white transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>질문 수정하기</span>
        </button>

        <button
          id="diagnosis-next-btn"
          type="button"
          onClick={onNext}
          className="min-h-[52px] px-8 py-3 rounded-xl bg-[#542344] text-white font-bold text-base hover:bg-[#431936] transition flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <span>브랜드 문장 만들기</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
