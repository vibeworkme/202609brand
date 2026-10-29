import React from 'react';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { STRENGTH_TYPES } from '../data/strengthTypes';
import { DiagnosisResult, StrengthTypeKey, UserBasicInfo } from '../types';
import { SpeechBubbleTitle, CardCharacterAvatar } from './StationeryIllustrations';

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

  const allScoreEntries = (Object.keys(STRENGTH_TYPES) as StrengthTypeKey[]).map((key) => ({
    key,
    name: STRENGTH_TYPES[key].name,
    score: diagnosis.scores[key] || 0,
    hex: STRENGTH_TYPES[key].themeColor.hex
  }));
  const maxScore = Math.max(...allScoreEntries.map((item) => item.score), 12);

  const handleToggleKeyword = (kw: string) => {
    let updated = [...diagnosis.selectedKeywords];
    if (updated.includes(kw)) {
      if (updated.length > 1) {
        updated = updated.filter((k) => k !== kw);
      }
    } else if (updated.length < 3) {
      updated.push(kw);
    } else {
      updated = [...updated.slice(1), kw];
    }
    onUpdateKeywords(updated);
  };

  return (
    <div className="w-full">
      {/* =====================================================================
          1. SUNNY YELLOW SHOWCASE HEADER + SPLIT COLOR-BLOCK PRIMARY CARD
      ====================================================================== */}
      <section className="bg-[#FDD116] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <SpeechBubbleTitle>
              {basicInfo.name || '나'}님의 <span className="text-[#FDD116]">강점 타입</span> 리포트!
            </SpeechBubbleTitle>
          </div>

          {/* Signature Split Color-Block Result Card */}
          <div className="relative bg-white rounded-[26px] overflow-hidden shadow-md">
            {/* Solid Right Color Block matching Primary Type */}
            <div
              className="hidden md:block absolute inset-y-0 right-0 w-[34%]"
              style={{ backgroundColor: primaryTypeInfo.themeColor.hex }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-9 gap-7">
              {/* Left Narrative Column (7 cols) */}
              <div className="md:col-span-7">
                <div
                  className="flex items-end gap-4 pb-4 border-b"
                  style={{ borderColor: `${primaryTypeInfo.themeColor.hex}66` }}
                >
                  <CardCharacterAvatar
                    variant={diagnosis.primaryType}
                    className="-mt-4"
                  />
                  <div className="pb-1">
                    <p
                      className="text-xs sm:text-sm font-bold mb-1"
                      style={{ color: primaryTypeInfo.themeColor.hex }}
                    >
                      {primaryTypeInfo.kicker}
                    </p>
                    <h1
                      className="font-display font-bold text-2xl sm:text-4xl tracking-tight"
                      style={{ color: primaryTypeInfo.themeColor.hex }}
                    >
                      {primaryTypeInfo.typeLabel}
                    </h1>
                  </div>
                </div>

                <div className="pt-5">
                  <p className="text-xs sm:text-sm font-bold text-[#5E6572] mb-1">
                    대표 강점 · {primaryTypeInfo.badge} · {primaryTypeInfo.englishTitle}
                  </p>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#161616] mb-3">
                    “{primaryTypeInfo.oneLiner}”
                  </h2>
                  <p className="text-sm sm:text-base text-[#333840] leading-relaxed">
                    {primaryTypeInfo.description}
                  </p>
                </div>
              </div>

              {/* Right Stationery Score Sheet overlapping the Color Block (5 cols) */}
              <div
                className="md:col-span-5 rounded-2xl p-4 md:p-0"
                style={{
                  backgroundColor: primaryTypeInfo.themeColor.hex
                }}
              >
                <div className="bg-grid-paper-subtle rounded-xl p-5 border-2 border-[#161616] shadow-sm">
                  <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-[#DCE1E7]">
                    <span className="font-display font-bold text-xs text-[#161616]">
                      [ 6대 강점 분포 노트 ]
                    </span>
                    <span className="text-xs font-bold text-[#5E6572] tabular-nums">
                      점수 현황
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {allScoreEntries.map((entry) => {
                      const ratio = Math.min(
                        100,
                        Math.max(8, Math.round((entry.score / maxScore) * 100))
                      );
                      const isPrimary = entry.key === diagnosis.primaryType;
                      return (
                        <div key={entry.key}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span
                              className={`font-bold ${
                                isPrimary ? 'text-[#161616]' : 'text-[#555B65]'
                              }`}
                            >
                              {entry.name} {isPrimary ? '(대표)' : ''}
                            </span>
                            <span className="font-bold text-[#161616] tabular-nums">
                              {entry.score}점
                            </span>
                          </div>
                          <div className="w-full h-2 bg-[#E5E8EC] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${ratio}%`,
                                backgroundColor: isPrimary ? entry.hex : '#8B93A1'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-[#161616]/80">
            본 진단은 전문 심리검사가 아닌, 나의 경험을 브랜드 언어로 정리하기 위한 자기 탐색용 참고 가이드입니다.
          </p>
        </div>
      </section>

      {/* =====================================================================
          2. GRAPH-PAPER DETAILS: SYNERGY, BEHAVIORS, JOBS, KEYWORDS
      ====================================================================== */}
      <section className="bg-grid-paper py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Secondary Strengths Synergy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1E7]">
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#161616] mb-4">
              01. 함께 발휘되는 보조 강점 시너지
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[secondary1Info, secondary2Info].map((sec, idx) => (
                <div
                  key={sec.key}
                  className="p-5 rounded-2xl bg-[#FAFAFB] border border-[#E2E6EC]"
                >
                  <p
                    className="text-xs font-extrabold mb-1"
                    style={{ color: sec.themeColor.hex }}
                  >
                    보조 강점 0{idx + 1} · {sec.badge}
                  </p>
                  <h4 className="font-display font-bold text-lg text-[#161616] mb-1.5">
                    {sec.typeLabel}
                  </h4>
                  <p className="text-sm text-[#4A505A] leading-relaxed">{sec.oneLiner}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Behaviors & Recommended Jobs Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Behaviors */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1E7]">
              <h3 className="font-display font-bold text-lg text-[#161616] mb-4">
                02. 강점이 드러나는 구체적 행동 특징
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-[#2E333B]">
                {primaryTypeInfo.behaviors.map((beh, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <span
                      className="font-display font-bold text-xs mt-1 tabular-nums shrink-0"
                      style={{ color: primaryTypeInfo.themeColor.hex }}
                    >
                      0{idx + 1}
                    </span>
                    <span>{beh}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1E7]">
              <h3 className="font-display font-bold text-lg text-[#161616] mb-4">
                03. 추천 활동 및 직무 분야
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#1E232A]">
                {primaryTypeInfo.recommendedJobs.map((job, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-3 rounded-xl bg-[#FAFAFB] border border-[#E5E8EC] font-bold flex items-center gap-2.5"
                  >
                    <Check
                      className="w-4 h-4 shrink-0 stroke-[3]"
                      style={{ color: primaryTypeInfo.themeColor.hex }}
                    />
                    <span>{job}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Self-Care Caution Note */}
          <div className="bg-[#FFFBEB] rounded-3xl p-6 sm:p-7 border border-[#F5D97E]">
            <h3 className="font-display font-bold text-base sm:text-lg text-[#161616] mb-1.5">
              04. 지치지 않기 위한 셀프케어 체크포인트
            </h3>
            <p className="text-sm sm:text-base text-[#3B3F46] leading-relaxed">
              {primaryTypeInfo.cautions}
            </p>
          </div>

          {/* Interactive Keyword Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1E7]">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#161616]">
                05. 프로필에 담을 브랜드 키워드 3개 선택
              </h3>
              <span className="text-xs font-bold text-[#5E6572] tabular-nums">
                선택됨 {diagnosis.selectedKeywords.length} / 3
              </span>
            </div>
            <p className="text-sm text-[#5E6572] mb-5">
              나를 가장 잘 나타내는 단어 3개를 골라주세요. 완성될 1페이지 프로필 상단에 대표 키워드로 표시됩니다.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {diagnosis.recommendedKeywords.map((kw) => {
                const isSelected = diagnosis.selectedKeywords.includes(kw);
                return (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleToggleKeyword(kw)}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold border-2 transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'border-[#161616] bg-[#161616] text-[#FDD116]'
                        : 'border-[#D5DBE3] bg-white text-[#3B4048] hover:border-[#161616]'
                    }`}
                  >
                    <span>#{kw}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation CTA */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              id="diagnosis-back-btn"
              type="button"
              onClick={onBackToQuestions}
              className="min-h-[52px] px-6 py-3 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-base hover:bg-[#FAFAFA] transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>질문 수정하기</span>
            </button>

            <button
              id="diagnosis-next-btn"
              type="button"
              onClick={onNext}
              className="min-h-[52px] px-8 py-3 rounded-full bg-[#161616] text-white font-bold text-base hover:bg-[#2B2B2B] shadow-md transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.99]"
            >
              <span className="text-[#FDD116]">브랜드 문장</span>
              <span>만들러 가기</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
