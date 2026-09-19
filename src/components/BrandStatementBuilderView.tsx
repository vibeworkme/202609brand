import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Edit3,
  Check,
  RotateCcw,
  CalendarCheck,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import {
  BrandStatementComponents,
  DiagnosisResult,
  ProfileDetails,
  UserBasicInfo
} from '../types';
import { generateSentenceByTemplate } from '../utils/brandGenerator';
import { STRENGTH_TYPES } from '../data/strengthTypes';

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
  basicInfo,
  diagnosis,
  statement,
  setStatement,
  profileDetails,
  setProfileDetails,
  onNext,
  onBackToDiagnosis
}) => {
  const [isEditingFullSentence, setIsEditingFullSentence] = useState<boolean>(false);

  // Suggested chips for quick selection if the user wants to swap values
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

  // Recalculate sentence whenever components change
  const handleComponentChange = (field: keyof BrandStatementComponents, value: string) => {
    setStatement((prev) => {
      const updated = {
        ...prev,
        [field]: value
      };
      // Regenerate full sentence using current template
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

  // Select 1 of 3 candidate templates
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

  // 3 Template candidate previews
  const candidate1 = generateSentenceByTemplate(0, statement);
  const candidate2 = generateSentenceByTemplate(1, statement);
  const candidate3 = generateSentenceByTemplate(2, statement);

  const candidates = [
    {
      title: '후보 1: 신뢰와 문제해결 중심 (표준 공식)',
      desc: '기본 공식에 충실하여 나의 전문성과 가치를 가장 명료하게 전달합니다.',
      sentence: candidate1
    },
    {
      title: '후보 2: 따뜻한 동행과 공감 중심',
      desc: '대상에 대한 깊은 애정과 함께 걸어가는 태도를 강조합니다.',
      sentence: candidate2
    },
    {
      title: '후보 3: 실행과 성장 도약 중심',
      desc: '새로운 가능성과 단단한 실천 의지를 당차게 드러냅니다.',
      sentence: candidate3
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#f3edf4] text-[#542344] text-xs sm:text-sm font-bold mb-3">
          4단계: 브랜드 문장 조립소
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#231c26] tracking-tight mb-3">
          나를 표현하는 한 문장 만들기
        </h1>
        <p className="text-sm sm:text-base text-[#615766] max-w-xl mx-auto">
          아래의 5가지 핵심 요소를 조합하여, 세상에 나를 가장 잘 소개하는 브랜드 슬로건을 완성해보세요.
        </p>
      </div>

      {/* Main Formula Preview Banner */}
      <div className="bg-[#542344] rounded-3xl p-6 sm:p-9 text-white shadow-md mb-10 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-bold text-white/80 bg-white/15 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd9ec]" />
            현재 완성된 브랜드 문장
          </span>
          <button
            type="button"
            onClick={() => setIsEditingFullSentence(!isEditingFullSentence)}
            className="text-xs font-semibold text-white/90 hover:text-white underline flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingFullSentence ? '직접 수정 완료' : '문장 직접 다듬기'}</span>
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
              className="w-full text-base sm:text-lg p-3.5 rounded-xl bg-white text-[#251f28] border-2 border-white focus:outline-hidden font-medium leading-relaxed"
            />
            <p className="text-xs text-white/70 mt-2">
              직접 입력한 문장은 최종 프로필의 메인 슬로건으로 그대로 반영됩니다.
            </p>
          </div>
        ) : (
          <p className="text-lg sm:text-2xl font-bold leading-relaxed tracking-tight text-[#faf7f9]">
            “{statement.fullSentence}”
          </p>
        )}
      </div>

      {/* 3 Candidate Templates Carousel/Cards */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-[#231c26] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#542344]" />
            <span>3가지 브랜드 문장 템플릿 후보</span>
          </h3>
          <span className="text-xs text-[#736877]">클릭하면 즉시 적용됩니다</span>
        </div>

        <div className="space-y-3.5">
          {candidates.map((cand, idx) => {
            const isSelected = statement.selectedTemplateIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelectTemplate(idx)}
                className={`p-5 rounded-2xl border-2 transition cursor-pointer ${
                  isSelected
                    ? 'border-[#542344] bg-[#f9f4f9] shadow-xs'
                    : 'border-[#e7e3da] bg-white hover:border-[#cbbfcd] hover:bg-[#faf9f8]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-bold text-[#542344]">
                    {cand.title}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-white bg-[#542344] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> 선택됨
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-semibold text-[#28212c] leading-relaxed mb-1">
                  “{cand.sentence}”
                </p>
                <p className="text-xs text-[#786e7c]">{cand.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Component Elements Customizer */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#e5e1d8] shadow-xs mb-10">
        <h3 className="text-xl font-bold text-[#231c26] mb-1">
          문장 구성 요소 직접 수정하기
        </h3>
        <p className="text-xs sm:text-sm text-[#6f6574] mb-6">
          각 항목을 직접 타이핑하거나 추천 예시를 클릭하여 바꿔보세요.
        </p>

        <div className="space-y-6">
          {/* 1. Target (대상) */}
          <div>
            <label className="block text-sm font-bold text-[#27212b] mb-1">
              1. 내가 돕고 싶은 사람 [대상]
            </label>
            <input
              type="text"
              value={statement.target}
              onChange={(e) => handleComponentChange('target', e.target.value)}
              className="w-full text-base px-4 py-2.5 rounded-xl border border-[#d6d0c6] focus:border-[#542344] focus:outline-hidden bg-[#faf9f8] mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {targetPresets.slice(0, 3).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleComponentChange('target', p)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#f4f0ec] hover:bg-[#ede5e0] text-[#554a59] transition cursor-pointer"
                >
                  +{p}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Problem (문제) */}
          <div>
            <label className="block text-sm font-bold text-[#27212b] mb-1">
              2. 해결하고 싶은 문제 [문제]
            </label>
            <input
              type="text"
              value={statement.problem}
              onChange={(e) => handleComponentChange('problem', e.target.value)}
              className="w-full text-base px-4 py-2.5 rounded-xl border border-[#d6d0c6] focus:border-[#542344] focus:outline-hidden bg-[#faf9f8] mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {problemPresets.slice(0, 3).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleComponentChange('problem', p)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#f4f0ec] hover:bg-[#ede5e0] text-[#554a59] transition cursor-pointer"
                >
                  +{p}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Strength (핵심 강점) */}
          <div>
            <label className="block text-sm font-bold text-[#27212b] mb-1">
              3. 나의 핵심 강점 [나의 강점]
            </label>
            <input
              type="text"
              value={statement.strength}
              onChange={(e) => handleComponentChange('strength', e.target.value)}
              className="w-full text-base px-4 py-2.5 rounded-xl border border-[#d6d0c6] focus:border-[#542344] focus:outline-hidden bg-[#faf9f8] mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {strengthPresets.slice(0, 3).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleComponentChange('strength', p)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#f4f0ec] hover:bg-[#ede5e0] text-[#554a59] transition cursor-pointer"
                >
                  +{p}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Experience (대표 경험) */}
          <div>
            <label className="block text-sm font-bold text-[#27212b] mb-1">
              4. 나의 대표 경험 [대표 경험]
            </label>
            <input
              type="text"
              value={statement.experience}
              onChange={(e) => handleComponentChange('experience', e.target.value)}
              className="w-full text-base px-4 py-2.5 rounded-xl border border-[#d6d0c6] focus:border-[#542344] focus:outline-hidden bg-[#faf9f8]"
            />
          </div>

          {/* 5. Value (제공하는 가치) */}
          <div>
            <label className="block text-sm font-bold text-[#27212b] mb-1">
              5. 제공하고 싶은 가치 [제공하는 가치]
            </label>
            <input
              type="text"
              value={statement.value}
              onChange={(e) => handleComponentChange('value', e.target.value)}
              className="w-full text-base px-4 py-2.5 rounded-xl border border-[#d6d0c6] focus:border-[#542344] focus:outline-hidden bg-[#faf9f8] mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {valuePresets.slice(0, 3).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleComponentChange('value', p)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#f4f0ec] hover:bg-[#ede5e0] text-[#554a59] transition cursor-pointer"
                >
                  +{p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 30-Day Action Plans Preview & Edit */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#e5e1d8] shadow-xs mb-10">
        <div className="flex items-center gap-2 mb-2">
          <CalendarCheck className="w-5 h-5 text-[#542344]" />
          <h3 className="text-xl font-bold text-[#231c26]">
            앞으로 30일 동안 실행할 일 3개
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#6c6271] mb-6">
          퍼스널 브랜드는 거창한 선언보다 작고 구체적인 첫 실행에서 완성됩니다. 프로필에 들어갈 실행 계획을 점검해보세요.
        </p>

        <div className="space-y-3.5">
          {profileDetails.actionPlans30Days.map((plan, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#efe9f0] text-[#542344] text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
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
                className="flex-1 text-sm sm:text-base px-3.5 py-2.5 rounded-xl border border-[#d6d0c6] focus:border-[#542344] focus:outline-hidden bg-[#faf9f8]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          id="statement-back-btn"
          type="button"
          onClick={onBackToDiagnosis}
          className="min-h-[52px] px-6 py-3 rounded-xl border border-[#d2ccc3] text-[#4d4452] font-bold text-base hover:bg-white transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>강점 진단 다시보기</span>
        </button>

        <button
          id="statement-next-btn"
          type="button"
          onClick={onNext}
          className="min-h-[52px] px-8 py-3 rounded-xl bg-[#542344] text-white font-bold text-base hover:bg-[#431936] transition flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <span>1페이지 프로필 완성하기</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
