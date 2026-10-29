import React from 'react';
import { ChevronRight, ShieldCheck, RotateCcw } from 'lucide-react';
import { LIFE_STAGES } from '../data/questionsData';
import {
  HeroCharactersIllustration,
  SpeechBubbleTitle,
  CardCharacterAvatar,
  StationeryFlatLay
} from './StationeryIllustrations';

interface LandingViewProps {
  onStart: () => void;
  onStartWithLifeStage: (stage: string) => void;
  onLoadSample: () => void;
  onPreviewDiagnosisSample: () => void;
  onReset: () => void;
  hasSavedData: boolean;
  onContinue: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStart,
  onStartWithLifeStage,
  onLoadSample,
  onPreviewDiagnosisSample,
  onReset,
  hasSavedData,
  onContinue
}) => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* =====================================================================
          1. GRAPH-PAPER HERO SECTION (Direct Stationery Poster Style)
      ====================================================================== */}
      <section className="relative bg-grid-paper border-b border-[#EAECEF] pt-10 sm:pt-16 pb-0 px-4 sm:px-6 overflow-hidden">
        {/* Soft Subtle Corner Tints matching reference grid canvas */}
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-35 blur-3xl"
          style={{ background: '#FFDAD3' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-35 blur-3xl"
          style={{ background: '#D4F3E9' }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Typography Block */}
          <div className="lg:col-span-5 pb-10 sm:pb-14 text-center lg:text-left">
            {/* Multi-Color Block Wordmark (Coral / Green / Navy / Yellow) */}
            <div
              className="font-display font-bold text-5xl sm:text-6xl lg:text-[4.25rem] leading-none tracking-tight select-none mb-2"
              aria-label="나다움!"
            >
              <span className="text-[#F25235]">나</span>
              <span className="text-[#00994C]">다</span>
              <span className="text-[#0D4085]">움</span>
              <span className="text-[#F4C000]">!</span>
            </div>

            {/* Bold Poster Headline */}
            <h1 className="font-display font-bold text-[#161616] tracking-tight text-balance">
              <span className="block text-2xl sm:text-3xl mb-1 font-bold">
                숨은 경험을 깨우는
              </span>
              <span className="block text-4xl sm:text-6xl leading-[1.08] font-bold">
                브랜드 플래너
              </span>
            </h1>

            {/* Subtitle & Official Slogan */}
            <p className="mt-5 text-sm sm:text-base text-[#3A3F47] leading-relaxed max-w-md mx-auto lg:mx-0">
              나의 브랜드 발견소가 준비한{' '}
              <strong className="text-[#F25235] font-bold">
                여성 퍼스널 브랜드 진단 세트
              </strong>
              를 소개합니다. 경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다.
            </p>

            {/* Primary CTA + Quiet Secondary Link */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {hasSavedData ? (
                <button
                  id="landing-continue-btn"
                  type="button"
                  onClick={onContinue}
                  className="min-h-[52px] px-7 py-3.5 rounded-full bg-[#161616] text-white font-bold text-base hover:bg-[#2B2B2B] active:scale-[0.99] transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
                >
                  <span className="text-[#FDD116]">이어서</span>
                  <span>내 브랜드 완성하기</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  id="landing-start-btn"
                  type="button"
                  onClick={onStart}
                  className="min-h-[52px] px-7 py-3.5 rounded-full bg-[#161616] text-white font-bold text-base hover:bg-[#2B2B2B] active:scale-[0.99] transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
                >
                  <span className="text-[#FDD116]">내 브랜드</span>
                  <span>찾기 시작하기</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              <button
                id="landing-sample-btn"
                type="button"
                onClick={onLoadSample}
                className="min-h-[52px] px-5 py-3.5 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-sm sm:text-base hover:bg-[#FDD116]/20 transition cursor-pointer whitespace-nowrap shrink-0"
              >
                샘플 프로필 보기
              </button>
            </div>
          </div>

          {/* Right Trio Character Illustration Flush on Horizon */}
          <div className="lg:col-span-7 flex items-end justify-center">
            <HeroCharactersIllustration />
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SUNNY YELLOW SHOWCASE SECTION (3 Split Color-Block Cards)
      ====================================================================== */}
      <section className="relative bg-[#FDD116] py-14 sm:py-20 px-4 sm:px-6">
        {/* Subtle Desktop Margin Stationery Accents */}
        <div
          className="hidden xl:block pointer-events-none select-none absolute top-44 right-10 rotate-12"
          aria-hidden="true"
        >
          <div className="bg-[#161616] text-white font-display font-bold text-xl px-4 py-1.5 rounded-xl border-2 border-white shadow-sm">
            okay!
          </div>
        </div>
        <div
          className="hidden xl:block pointer-events-none select-none absolute top-[52%] left-10 -rotate-12"
          aria-hidden="true"
        >
          <div className="bg-[#0D4085] text-white font-display font-bold text-base px-4 py-1.5 rounded-xl border-2 border-white shadow-sm">
            Always PERFECT
          </div>
        </div>
        <div
          className="hidden xl:block pointer-events-none select-none absolute bottom-36 right-12 rotate-12"
          aria-hidden="true"
        >
          <div className="bg-[#F25235] text-white font-display font-bold text-xl px-4 py-1.5 rounded-lg border-2 border-white shadow-sm">
            NICE
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Speech Bubble Header */}
          <div className="text-center mb-10 sm:mb-14">
            <SpeechBubbleTitle>
              이런 분께 <span className="text-[#FDD116]">추천</span>해요!
            </SpeechBubbleTitle>
          </div>

          {/* 3 Stacked Split Color-Block Cards */}
          <div className="space-y-10 sm:space-y-12">
            {/* ---------------- CARD 1: CORAL [경험 재발견] ---------------- */}
            <article
              onClick={onStart}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onStart();
                }
              }}
              className="group relative bg-white rounded-[26px] overflow-hidden shadow-md hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#161616]"
            >
              {/* Solid Right Color Block (~32% width on desktop) */}
              <div
                className="hidden md:block absolute inset-y-0 right-0 w-[32%] bg-[#F25235]"
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-8 md:p-9 gap-6">
                {/* Left Content (7 cols) */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div className="flex items-end gap-4 pb-4 border-b border-[#F25235]/50">
                    <CardCharacterAvatar variant="coral" className="-mt-4" />
                    <div className="pb-1">
                      <p className="text-xs sm:text-sm font-bold text-[#F25235] mb-1">
                        경력이 멈춘 것 같아도 다 있는
                      </p>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F25235] tracking-tight">
                        파워 [ 경험 ] 타입
                      </h2>
                    </div>
                  </div>

                  <div className="pt-5">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#161616] mb-3">
                      01. 나의 브랜드 발견소 [일상·돌봄 경험] 질문 노트
                    </h3>
                    <p className="text-sm font-bold text-[#F25235] leading-relaxed mb-1.5">
                      일, 육아, 살림, 봉사도 모두 진짜 경력으로!
                      <br />
                      당연했던 일상을 자산으로 기록하는 [ 경험 ] 타입
                    </p>
                    <p className="text-sm text-[#333840] leading-relaxed">
                      거창한 이력서 대신 6개 영역의 친근한 객관식·짧은 메모 질문에 답하며,
                      흩어진 삶의 경험을 쉽고 간편하게 정리하고 싶은 분께 추천드릴게요.
                    </p>
                  </div>
                </div>

                {/* Right Flat-Lay Preview (5 cols) */}
                <div className="md:col-span-5 bg-[#F25235] md:bg-transparent rounded-2xl p-4 md:p-0">
                  <StationeryFlatLay
                    variant="coral"
                    actionLabel="경험 질문 노트 시작하기"
                  />
                </div>
              </div>
            </article>

            {/* ---------------- CARD 2: GREEN [강점 & 문장] ---------------- */}
            <article
              onClick={onPreviewDiagnosisSample}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPreviewDiagnosisSample();
                }
              }}
              className="group relative bg-white rounded-[26px] overflow-hidden shadow-md hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#161616]"
            >
              {/* Solid Right Color Block */}
              <div
                className="hidden md:block absolute inset-y-0 right-0 w-[32%] bg-[#00994C]"
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-8 md:p-9 gap-6">
                {/* Left Content */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div className="flex items-end gap-4 pb-4 border-b border-[#00994C]/50">
                    <CardCharacterAvatar variant="green" className="-mt-4" />
                    <div className="pb-1">
                      <p className="text-xs sm:text-sm font-bold text-[#00994C] mb-1">
                        강점의! 강점에 의한! 강점을 위한!
                      </p>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#00994C] tracking-tight">
                        파워 [ 강점 ] 타입
                      </h2>
                    </div>
                  </div>

                  <div className="pt-5">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#161616] mb-3">
                      02. 나의 브랜드 발견소 [6대 강점 & 슬로건] 조립 세트
                    </h3>
                    <p className="text-sm font-bold text-[#00994C] leading-relaxed mb-1.5">
                      나의 경험을 6가지 강점 유형으로 분류한 뒤 정리하는 [ 강점 ] 타입
                    </p>
                    <p className="text-sm text-[#333840] leading-relaxed">
                      기획·실행·관계·돌봄·창작·성장 중 대표 강점을 꼼꼼하게 확인하고,
                      나를 한 문장으로 소개하는 브랜드 슬로건을 완성하고 싶은 분께 추천해요.
                    </p>
                  </div>
                </div>

                {/* Right Flat-Lay Preview */}
                <div className="md:col-span-5 bg-[#00994C] md:bg-transparent rounded-2xl p-4 md:p-0">
                  <StationeryFlatLay
                    variant="green"
                    actionLabel="강점 진단 예시 미리보기"
                  />
                </div>
              </div>
            </article>

            {/* ---------------- CARD 3: NAVY [30일 실전 & 1페이지 프로필] ---------------- */}
            <article
              onClick={onLoadSample}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onLoadSample();
                }
              }}
              className="group relative bg-white rounded-[26px] overflow-hidden shadow-md hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#161616]"
            >
              {/* Solid Right Color Block */}
              <div
                className="hidden md:block absolute inset-y-0 right-0 w-[32%] bg-[#0D4085]"
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-8 md:p-9 gap-6">
                {/* Left Content */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div className="flex items-end gap-4 pb-4 border-b border-[#0D4085]/50">
                    <CardCharacterAvatar variant="navy" className="-mt-4" />
                    <div className="pb-1">
                      <p className="text-xs sm:text-sm font-bold text-[#0D4085] mb-1">
                        작심한달!
                      </p>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0D4085] tracking-tight">
                        30일 브랜드 워커 도전!
                      </h2>
                    </div>
                  </div>

                  <div className="pt-5">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#161616] mb-3">
                      03. 나의 브랜드 발견소 [1페이지 프로필 & 30일 플랜] 시트
                    </h3>
                    <p className="text-sm font-bold text-[#0D4085] leading-relaxed mb-1.5">
                      딱, 30일만 나다운 커리어 루틴 도전!
                    </p>
                    <p className="text-sm text-[#333840] leading-relaxed">
                      재취업·창업·프리랜서·시민활동가로 첫걸음을 떼고 싶은 분, A4 1페이지
                      프로필과 30일 실천 과제를 인쇄해 행동하는 힘을 기르고 싶은 분께 추천드립니다.
                    </p>
                  </div>
                </div>

                {/* Right Flat-Lay Preview */}
                <div className="md:col-span-5 bg-[#0D4085] md:bg-transparent rounded-2xl p-4 md:p-0">
                  <StationeryFlatLay
                    variant="navy"
                    actionLabel="완성된 1페이지 프로필 샘플 보기"
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Bottom Black Capsule CTA (Direct match to reference bottom CTA) */}
          <div className="mt-14 text-center">
            <button
              id="landing-bottom-cta-btn"
              type="button"
              onClick={hasSavedData ? onContinue : onStart}
              className="inline-flex items-center justify-center gap-2 min-h-[56px] px-9 py-4 rounded-full bg-[#161616] text-white font-bold text-base sm:text-lg shadow-lg hover:bg-[#2a2a2a] hover:-translate-y-0.5 active:scale-[0.99] transition cursor-pointer whitespace-nowrap"
            >
              <span>
                <strong className="text-[#FDD116]">나만의 브랜드</strong>를 꿈꾸는 분들을 위한{' '}
                {hasSavedData ? '이어하기' : '시작하기'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. QUICK SITUATION SELECTOR & LOCAL PRIVACY ASSURANCE
      ====================================================================== */}
      <section className="bg-grid-paper-subtle py-14 sm:py-16 px-4 sm:px-6 border-t border-[#E6E9EE]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs sm:text-sm font-bold text-[#00994C] mb-1">
              지금 나의 상황에서 바로 출발하기
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#161616] text-balance">
              어떤 내일을 준비하고 계신가요?
            </h2>
            <p className="text-sm text-[#555B65] mt-2">
              항목을 클릭하면 내 상황에 맞춰 질문지가 바로 열립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LIFE_STAGES.map((stage, idx) => {
              const accents = [
                'hover:border-[#F25235] group-hover:text-[#F25235]',
                'hover:border-[#00994C] group-hover:text-[#00994C]',
                'hover:border-[#0D4085] group-hover:text-[#0D4085]'
              ];
              const numberColors = ['text-[#F25235]', 'text-[#00994C]', 'text-[#0D4085]'];
              return (
                <button
                  key={stage}
                  type="button"
                  onClick={() => onStartWithLifeStage(stage)}
                  className={`group flex items-center justify-between gap-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#DCE1E7] ${accents[idx % 3]} transition text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display font-bold text-base tabular-nums ${numberColors[idx % 3]}`}
                    >
                      0{idx + 1}.
                    </span>
                    <span className="font-bold text-sm sm:text-base text-[#1A1D21]">
                      {stage}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8C939E] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Privacy Assurance & Optional Saved Data Reset */}
          <div className="mt-10 pt-6 border-t border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#555B65]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00994C] shrink-0" />
              <span>
                입력하신 모든 답변과 사진은 외부 서버로 전송되지 않으며, 현재 기기 브라우저에만 안전하게 보관됩니다.
              </span>
            </div>

            {hasSavedData && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#68707C] hover:text-[#F25235] transition cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>저장된 내용 초기화</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
