import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Edit3, Check } from 'lucide-react';
import {
  BrandStatementComponents,
  DiagnosisResult,
  ProfileDetails,
  UserBasicInfo
} from '../types';
import { generateSentenceByTemplate } from '../utils/brandGenerator';
import { STRENGTH_TYPES } from '../data/strengthTypes';
import { SpeechBubbleTitle } from './StationeryIllustrations';

interface BrandStatementBuilderViewProps {
  basicInfo: UserBasicInfo;
  diagnosis: DiagnosisResult;
  statement: BrandStatementComponents;
  setStatement: React.Dispatch<React.SetStateAction<BrandStatementComponents>>;
  profileDetails: ProfileDetails;
  setProfileDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
  onNext: () => void;
  onBackToDiagnosis: () => void;
}

export const BrandStatementBuilderView: React.FC<BrandStatementBuilderViewProps> = ({
  diagnosis,
  statement,
  setStatement,
  profileDetails,
  setProfileDetails,
  onNext,
  onBackToDiagnosis
}) => {
  const [isEditingFullSentence, setIsEditingFullSentence] = useState<boolean>(false);

  const targetPresets = [
    '경력 복귀와 새로운 시작을 준비하는 여성',
    '복잡한 일과 살림으로 번아웃된 사람',
    '가족 돌봄으로 지쳐 자신을 잃어버린 엄마',
    '혼자서 모든 것을 감당하는 1인 기업가',
    '따뜻한 소통과 연대가 필요한 지역 이웃',
    '나만의 색깔을 알리고 싶은 창작자'
  ];

  const problemPresets = [
    '정리되지 않은 막막함과 시작의 두려움',
    '복잡한 업무와 일상 루틴의 혼란',
    '관계에서의 소통 부재와 외로움',
    '스스로를 돌보지 못해 생기는 심신 소진',
    '배움과 성장의 방향을 잡지 못하는 혼란',
    '생각만 많아 첫걸음을 떼지 못하는 망설임'
  ];

  const primaryInfo = STRENGTH_TYPES[diagnosis.primaryType];
  const strengthPresets = [
    `${primaryInfo.name}의 ${primaryInfo.badge}`,
    '체계적인 정리와 꼼꼼한 기획력',
    '깊은 경청과 따뜻한 소통 능력',
    '위기 앞에서도 주저 없는 현장 실행력',
    '세심한 돌봄과 안전지대 조성 역량',
    '배움을 나누고 성장을 돕는 나침반 역량'
  ];

  const valuePresets = [
    '지속 가능한 삶의 질서와 자신감',
    '명쾌한 로드맵과 든든한 실행 용기',
    '따뜻한 연대와 회복의 기쁨',
    '실질적인 변화와 눈에 보이는 결실',
    '나다운 삶을 살아가는 내면의 힘'
  ];

  const handleComponentChange = (field: keyof BrandStatementComponents, value: string) => {
    setStatement((prev) => {
      const updated = {
        ...prev,
        [field]: value
      };
      const newSentence = generateSentenceByTemplate(prev.selectedTemplateIdx, {
        target: field === 'target' ? value : prev.target,
        problem: field === 'problem' ? value : prev.problem,
        experience: field === 'experience' ? value : prev.experience,
        strength: field === 'strength' ? value : prev.strength,
        value: field === 'value' ? value : prev.value
      });
      return {
        ...updated,
        fullSentence: newSentence
      };
    });
  };

  const handleSelectTemplate = (idx: number) => {
    const newSentence = generateSentenceByTemplate(idx, {
      target: statement.target,
      problem: statement.problem,
      experience: statement.experience,
      strength: statement.strength,
      value: statement.value
    });

    setStatement((prev) => ({
      ...prev,
      selectedTemplateIdx: idx,
      fullSentence: newSentence
    }));
  };

  const candidates = [
    {
      title: '타입 A · 신뢰와 문제해결 중심 (표준 공식)',
      desc: '기본 공식에 충실하여 나의 전문성과 가치를 가장 명료하게 전달합니다.',
      sentence: generateSentenceByTemplate(0, statement),
      hex: '#F25235'
    },
    {
      title: '타입 B · 따뜻한 동행과 공감 중심',
      desc: '대상에 대한 깊은 애정과 함께 걸어가는 태도를 강조합니다.',
      sentence: generateSentenceByTemplate(1, statement),
      hex: '#00994C'
    },
    {
      title: '타입 C · 실행과 성장 도약 중심',
      desc: '새로운 가능성과 단단한 실천 의지를 당차게 드러냅니다.',
      sentence: generateSentenceByTemplate(2, statement),
      hex: '#0D4085'
    }
  ];

  return (
    <div className="w-full">
      {/* =====================================================================
          1. GRAPH-PAPER HERO + JET-BLACK LIVE BRAND SENTENCE BOARD
      ====================================================================== */}
      <section className="bg-grid-paper pt-10 pb-12 px-4 sm:px-6 border-b border-[#E5E8EC]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <SpeechBubbleTitle className="mb-4">
              나를 소개하는 <span className="text-[#FDD116]">한 문장</span> 조립소!
            </SpeechBubbleTitle>
            <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#161616] tracking-tight text-balance">
              세상에 건네는 나만의 브랜드 슬로건
            </h1>
          </div>

          {/* Jet-Black Live Preview Card */}
          <div className="bg-[#161616] text-white rounded-[26px] p-6 sm:p-9 shadow-md">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs sm:text-sm font-extrabold text-[#FDD116]">
                현재 완성된 브랜드 슬로건
              </span>
              <button
                type="button"
                onClick={() => setIsEditingFullSentence(!isEditingFullSentence)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition cursor-pointer whitespace-nowrap shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#FDD116]" />
                <span>{isEditingFullSentence ? '수정 완료' : '문장 직접 다듬기'}</span>
              </button>
            </div>

            {isEditingFullSentence ? (
              <div>
                <textarea
                  rows={3}
                  value={statement.fullSentence}
                  onChange={(e) =>
                    setStatement((prev) => ({ ...prev, fullSentence: e.target.value }))
                  }
                  className="w-full text-base sm:text-lg p-4 rounded-xl bg-white text-[#161616] border-2 border-[#FDD116] focus:outline-hidden font-bold leading-relaxed"
                />
                <p className="text-xs text-white/70 mt-2">
                  직접 수정한 문장은 1페이지 브랜드 프로필의 메인 슬로건으로 그대로 반영됩니다.
                </p>
              </div>
            ) : (
              <p className="text-lg sm:text-2xl font-bold leading-relaxed tracking-wide text-white">
                “{statement.fullSentence}”
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SUNNY YELLOW 3-CANDIDATE TEMPLATE PICKER
      ====================================================================== */}
      <section className="bg-[#FDD116] py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#161616]">
              01. 3가지 문장 스타일 고르기
            </h2>
            <span className="text-xs sm:text-sm font-bold text-[#161616]/80">
              카드를 클릭하면 즉시 적용됩니다
            </span>
          </div>

          <div className="space-y-4">
            {candidates.map((cand, idx) => {
              const isSelected = statement.selectedTemplateIdx === idx;
              return (
                <button
                  key={cand.title}
                  type="button"
                  onClick={() => handleSelectTemplate(idx)}
                  className={`w-full text-left relative bg-white rounded-2xl overflow-hidden p-5 sm:p-6 transition cursor-pointer border-2 ${
                    isSelected
                      ? 'border-[#161616] shadow-md'
                      : 'border-transparent hover:border-[#161616]/40 shadow-xs'
                  }`}
                >
                  {/* Right Solid Color Edge Strip */}
                  <div
                    className="absolute inset-y-0 right-0 w-3"
                    style={{ backgroundColor: cand.hex }}
                    aria-hidden="true"
                  />

                  <div className="pr-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="text-xs sm:text-sm font-extrabold"
                        style={{ color: cand.hex }}
                      >
                        {cand.title}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#161616] bg-[#FDD116] px-2.5 py-0.5 rounded-full">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> 적용 중
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#161616] leading-relaxed mb-1.5">
                      “{cand.sentence}”
                    </p>
                    <p className="text-xs text-[#5E6572]">{cand.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. GRAPH-PAPER SLOT CUSTOMIZER + 30-DAY ROUTINE PLANNER
      ====================================================================== */}
      <section className="bg-grid-paper py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* 5-Slot Builder */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#DCE1E7]">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#161616] mb-1">
              02. 문장 구성 단어 내 스타일로 바꾸기
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6572] mb-6">
              직접 입력하거나 아래 추천 문구 버튼을 눌러 자유롭게 조합해보세요.
            </p>

            <div className="space-y-6">
              {/* Slot 1: Target */}
              <div>
                <label className="block text-sm font-extrabold text-[#F25235] mb-1.5">
                  01. 내가 돕고 싶은 사람 [대상]
                </label>
                <input
                  type="text"
                  value={statement.target}
                  onChange={(e) => handleComponentChange('target', e.target.value)}
                  className="w-full text-base font-medium px-4 py-3 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden bg-[#FAFAFB] mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {targetPresets.slice(0, 3).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleComponentChange('target', p)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F3F5F8] hover:bg-[#E5E9F0] text-[#333840] transition cursor-pointer"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot 2: Problem */}
              <div>
                <label className="block text-sm font-extrabold text-[#00994C] mb-1.5">
                  02. 해결하고 싶은 어려움 [문제]
                </label>
                <input
                  type="text"
                  value={statement.problem}
                  onChange={(e) => handleComponentChange('problem', e.target.value)}
                  className="w-full text-base font-medium px-4 py-3 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden bg-[#FAFAFB] mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {problemPresets.slice(0, 3).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleComponentChange('problem', p)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F3F5F8] hover:bg-[#E5E9F0] text-[#333840] transition cursor-pointer"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot 3: Strength */}
              <div>
                <label className="block text-sm font-extrabold text-[#0D4085] mb-1.5">
                  03. 나의 핵심 무기 [나의 강점]
                </label>
                <input
                  type="text"
                  value={statement.strength}
                  onChange={(e) => handleComponentChange('strength', e.target.value)}
                  className="w-full text-base font-medium px-4 py-3 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden bg-[#FAFAFB] mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {strengthPresets.slice(0, 3).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleComponentChange('strength', p)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F3F5F8] hover:bg-[#E5E9F0] text-[#333840] transition cursor-pointer"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot 4: Experience */}
              <div>
                <label className="block text-sm font-extrabold text-[#E04F5F] mb-1.5">
                  04. 나의 대표 경험 [대표 경험]
                </label>
                <input
                  type="text"
                  value={statement.experience}
                  onChange={(e) => handleComponentChange('experience', e.target.value)}
                  className="w-full text-base font-medium px-4 py-3 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden bg-[#FAFAFB]"
                />
              </div>

              {/* Slot 5: Value */}
              <div>
                <label className="block text-sm font-extrabold text-[#D97706] mb-1.5">
                  05. 전하고 싶은 변화 [제공하는 가치]
                </label>
                <input
                  type="text"
                  value={statement.value}
                  onChange={(e) => handleComponentChange('value', e.target.value)}
                  className="w-full text-base font-medium px-4 py-3 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden bg-[#FAFAFB] mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {valuePresets.slice(0, 3).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleComponentChange('value', p)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F3F5F8] hover:bg-[#E5E9F0] text-[#333840] transition cursor-pointer"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 30-Day Routine Action Planner */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#DCE1E7]">
            <p className="text-xs font-extrabold text-[#0D4085] mb-1">
              작심한달! 30일 브랜드 워커 도전
            </p>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#161616] mb-2">
              03. 앞으로 30일 동안 실천할 작은 행동 3가지
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6572] mb-6">
              1페이지 프로필 우측 하단 체크리스트에 인쇄될 나의 실천 목표입니다.
            </p>

            <div className="space-y-3.5">
              {profileDetails.actionPlans30Days.map((plan, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#0D4085] text-white font-display font-bold text-xs flex items-center justify-center shrink-0 tabular-nums">
                    0{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={plan}
                    onChange={(e) => {
                      const updated = [...profileDetails.actionPlans30Days];
                      updated[idx] = e.target.value;
                      setProfileDetails((prev) => ({
                        ...prev,
                        actionPlans30Days: updated
                      }));
                    }}
                    className="flex-1 text-sm sm:text-base font-medium px-4 py-3 rounded-xl border-2 border-[#D4DAE2] focus:border-[#161616] focus:outline-hidden bg-[#FAFAFB]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              id="statement-back-btn"
              type="button"
              onClick={onBackToDiagnosis}
              className="min-h-[52px] px-6 py-3 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-base hover:bg-[#FAFAFA] transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>강점 진단 보기</span>
            </button>

            <button
              id="statement-next-btn"
              type="button"
              onClick={onNext}
              className="min-h-[52px] px-8 py-3 rounded-full bg-[#161616] text-white font-bold text-base hover:bg-[#2B2B2B] shadow-md transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.99]"
            >
              <span className="text-[#FDD116]">1페이지 프로필</span>
              <span>완성하기</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
