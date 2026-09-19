import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  FileSpreadsheet,
  Briefcase,
  Users,
  Compass,
  Lightbulb
} from 'lucide-react';
import { LIFE_STAGES } from '../data/questionsData';

interface LandingViewProps {
  onStart: () => void;
  onLoadSample: () => void;
  hasSavedData: boolean;
  onContinue: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStart,
  onLoadSample,
  hasSavedData,
  onContinue
}) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Slogan Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f3edf4] text-[#542344] text-sm sm:text-base font-semibold mb-6 border border-[#e3d3e5]">
            <HeartHandshake className="w-4 h-4 text-[#542344]" />
            <span>“경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다.”</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#221c25] tracking-tight leading-[1.25] sm:leading-[1.2] mb-6">
            당신의 경험에는
            <br />
            <span className="text-[#542344] underline decoration-[#d9a8c7] decoration-4 underline-offset-8">
              이미 브랜드가 있습니다.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#58515c] max-w-2xl mx-auto leading-relaxed mb-10">
            일, 육아, 돌봄, 봉사, 취미, 배움의 경험에서
            <br className="hidden sm:inline" /> 나만의 숨은 강점과 새로운 가능성을 발견해보세요.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            {hasSavedData ? (
              <button
                id="landing-continue-btn"
                onClick={onContinue}
                className="w-full sm:w-auto flex-1 min-h-[56px] px-8 py-4 rounded-xl bg-[#542344] text-white text-lg font-bold shadow-md hover:bg-[#431936] transition flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
              >
                <span>이어서 작성하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                id="landing-start-btn"
                onClick={onStart}
                className="w-full sm:w-auto flex-1 min-h-[56px] px-8 py-4 rounded-xl bg-[#542344] text-white text-lg font-bold shadow-md hover:bg-[#431936] transition flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
              >
                <span>내 브랜드 찾기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <button
              id="landing-sample-btn"
              onClick={onLoadSample}
              className="w-full sm:w-auto min-h-[56px] px-6 py-4 rounded-xl bg-white border-2 border-[#d5ced9] text-[#413845] text-base font-bold hover:bg-[#f8f5f9] hover:border-[#542344] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#542344]" />
              <span>샘플로 먼저 둘러보기</span>
            </button>
          </div>

          {/* Privacy Security Note */}
          <div className="mt-8 inline-flex items-center gap-2 text-xs sm:text-sm text-[#736a78] bg-[#f4f2ee] px-4 py-2 rounded-lg border border-[#e8e4dc]">
            <ShieldCheck className="w-4 h-4 text-[#4f772d] shrink-0" />
            <span>
              <strong>안심 안내:</strong> 입력하신 내용은 외부 서버나 AI 모델로 전송되지 않으며, 사용자 기기 브라우저에만 안전하게 보관됩니다.
            </span>
          </div>
        </div>
      </section>

      {/* 3-Step Process Guide */}
      <section className="py-12 bg-white border-y border-[#ece8e1] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#542344] uppercase block mb-1">
              간단한 3단계 진행 과정
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#231d26]">
              경험 정리부터 1페이지 프로필 완성까지
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#faf9f7] rounded-2xl p-6 sm:p-7 border border-[#e6e2da] relative">
              <div className="w-10 h-10 rounded-xl bg-[#efe9f0] text-[#542344] flex items-center justify-center font-bold text-lg mb-4">
                01
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#241d27] mb-2 flex items-center gap-2">
                경험 입력
              </h3>
              <p className="text-sm sm:text-base text-[#5e5663] leading-relaxed">
                6개 영역의 친근한 질문에 답하며 그동안 당연하게 여겼던 일상과 돌봄의 순간들을 기록합니다.
              </p>
              <div className="mt-4 pt-4 border-t border-[#eee9e0] text-xs text-[#7e7483] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#542344]" />
                객관식 + 짧은 주관식 문답
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#faf9f7] rounded-2xl p-6 sm:p-7 border border-[#e6e2da] relative">
              <div className="w-10 h-10 rounded-xl bg-[#efe9f0] text-[#542344] flex items-center justify-center font-bold text-lg mb-4">
                02
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#241d27] mb-2 flex items-center gap-2">
                강점 발견
              </h3>
              <p className="text-sm sm:text-base text-[#5e5663] leading-relaxed">
                나의 응답을 바탕으로 6대 강점 유형(기획·실행·관계·돌봄·창작·성장) 중 대표 강점과 보조 강점을 계산합니다.
              </p>
              <div className="mt-4 pt-4 border-t border-[#eee9e0] text-xs text-[#7e7483] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#542344]" />
                행동 특징 & 맞춤 활동 분야 제시
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#faf9f7] rounded-2xl p-6 sm:p-7 border border-[#e6e2da] relative">
              <div className="w-10 h-10 rounded-xl bg-[#efe9f0] text-[#542344] flex items-center justify-center font-bold text-lg mb-4">
                03
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#241d27] mb-2 flex items-center gap-2">
                브랜드 완성
              </h3>
              <p className="text-sm sm:text-base text-[#5e5663] leading-relaxed">
                검증된 브랜드 공식으로 나를 표현하는 한 문장을 완성하고, 30일 실행 계획이 담긴 1페이지 프로필을 인쇄합니다.
              </p>
              <div className="mt-4 pt-4 border-t border-[#eee9e0] text-xs text-[#7e7483] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#542344]" />
                A4 PDF 인쇄 최적화 지원
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#221c25] mb-2">
              이런 분들을 위해 준비했습니다
            </h2>
            <p className="text-sm sm:text-base text-[#655d6b]">
              어떤 수식어도 붙지 않았던 소중한 시간들이 나만의 브랜드가 되는 순간을 경험해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {LIFE_STAGES.map((stage, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#e8e4dc] hover:border-[#bfa2bd] transition"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f3edf4] text-[#542344] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-base font-semibold text-[#322a36]">{stage}</span>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-12 p-8 rounded-2xl bg-[#542344] text-white text-center shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              지금, 당신의 경험에 새로운 이름을 붙여보세요.
            </h3>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-lg mx-auto">
              약 5~10분이면 충분합니다. 회원가입 없이 바로 시작할 수 있습니다.
            </p>
            <button
              id="landing-bottom-cta-btn"
              onClick={onStart}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#542344] font-bold text-lg hover:bg-[#faf7fa] transition shadow-md cursor-pointer active:scale-95"
            >
              <span>내 브랜드 찾기 시작하기</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
