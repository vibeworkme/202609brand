import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  AppState,
  DiagnosisResult,
  UserAnswers,
  UserBasicInfo,
  BrandStatementComponents,
  ProfileDetails
} from './types';
import { QUESTIONS } from './data/questionsData';
import {
  calculateDiagnosis,
  getDefaultComponentsForDiagnosis,
  getDefaultProfileDetails,
  getSamplePresetState
} from './utils/brandGenerator';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { QuestionnaireView } from './components/QuestionnaireView';
import { DiagnosisResultView } from './components/DiagnosisResultView';
import { BrandStatementBuilderView } from './components/BrandStatementBuilderView';
import { ProfilePageView } from './components/ProfilePageView';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { CardCharacterAvatar, SpeechBubbleTitle } from './components/StationeryIllustrations';

const STORAGE_KEY = 'my_brand_discovery_data_v2';

const INITIAL_BASIC_INFO: UserBasicInfo = {
  name: '',
  lifeStage: '경력전환을 고민하는 여성',
  contactOrSns: '',
  photoUrl: ''
};

const INITIAL_STATEMENT: BrandStatementComponents = {
  target: '경력 복귀를 고민하는 여성',
  problem: '시작의 두려움과 막막함',
  experience: '살림과 소통으로 축적된 경험',
  strength: '체계적인 기획력과 세심한 지원력',
  value: '새로운 자신감과 질서',
  fullSentence:
    '나는 경력 복귀를 고민하는 여성이 시작의 두려움과 막막함을 해결할 수 있도록, 체계적인 기획력과 세심한 지원력을 활용해 새로운 자신감과 질서를 만드는 사람입니다.',
  selectedTemplateIdx: 0
};

const INITIAL_PROFILE_DETAILS: ProfileDetails = {
  goodAtList: [
    '복잡한 상황을 차근차근 순서대로 정리하기',
    '상대방의 불편함을 세심하게 살피고 돕기',
    '예산과 일정을 낭비 없이 꼼꼼하게 운영하기'
  ],
  representativeExperience:
    '가정 살림과 자원봉사, 다양한 일상의 프로젝트를 주도하며 실전 역량을 키웠습니다.',
  targetAudience: '새로운 시작을 주저하는 여성 이웃들',
  activitiesOrServices: [
    '라이프스타일 및 공간 정리수납 컨설팅',
    '경력 재설계 1:1 라이프 플래닝'
  ],
  actionPlans30Days: [
    '나의 경험과 강점을 정리한 1페이지 프로필을 지인에게 공유하기',
    '타깃 대상 1~2명과 커피챗을 하며 진짜 고민 인터뷰하기',
    '내가 도울 수 있는 작은 미니 서비스를 무료 파일럿으로 시범 진행하기'
  ]
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppState['currentScreen']>('landing');
  const [basicInfo, setBasicInfo] = useState<UserBasicInfo>(INITIAL_BASIC_INFO);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [statement, setStatement] = useState<BrandStatementComponents>(INITIAL_STATEMENT);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>(INITIAL_PROFILE_DETAILS);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.basicInfo) setBasicInfo(parsed.basicInfo);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.diagnosis) setDiagnosis(parsed.diagnosis);
        if (parsed.statement) setStatement(parsed.statement);
        if (parsed.profileDetails) setProfileDetails(parsed.profileDetails);
        if (parsed.currentScreen) setCurrentScreen(parsed.currentScreen);
      }
    } catch (e) {
      console.warn('Failed to parse saved state from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever critical state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const stateToSave = {
        currentScreen,
        basicInfo,
        answers,
        diagnosis,
        statement,
        profileDetails
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }, [currentScreen, basicInfo, answers, diagnosis, statement, profileDetails, isLoaded]);

  const hasSavedData = Boolean(
    basicInfo.name || Object.keys(answers).length > 0 || diagnosis !== null
  );

  // Handlers
  const handleStart = () => {
    setCurrentScreen('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartWithLifeStage = (stage: string) => {
    setBasicInfo((prev) => ({ ...prev, lifeStage: stage }));
    setCurrentScreen('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinue = () => {
    if (diagnosis) {
      setCurrentScreen('profile');
    } else {
      setCurrentScreen('questionnaire');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSample = () => {
    const sample = getSamplePresetState();
    setBasicInfo(sample.basicInfo);
    setAnswers(sample.answers);
    setDiagnosis(sample.diagnosis);
    setStatement(sample.statement);
    setProfileDetails(sample.profileDetails);
    setCurrentScreen('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviewDiagnosisSample = () => {
    if (!diagnosis) {
      const sample = getSamplePresetState();
      setBasicInfo(sample.basicInfo);
      setAnswers(sample.answers);
      setDiagnosis(sample.diagnosis);
      setStatement(sample.statement);
      setProfileDetails(sample.profileDetails);
    }
    setCurrentScreen('diagnosis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFillCurrentSample = (questionId: number) => {
    const q = QUESTIONS.find((item) => item.id === questionId);
    if (!q) return;

    const defaultOptionIds = q.options.slice(0, q.maxSelect || 1).map((o) => o.id);
    const defaultText = q.defaultSampleAnswer || '';

    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedOptionIds: defaultOptionIds,
        customText: defaultText
      }
    }));
  };

  const handleQuestionnaireComplete = () => {
    const diag = calculateDiagnosis(answers);
    setDiagnosis(diag);

    const defaultStmt = getDefaultComponentsForDiagnosis(diag, basicInfo, answers);
    setStatement(defaultStmt);

    const defaultProf = getDefaultProfileDetails(diag, defaultStmt, answers);
    setProfileDetails(defaultProf);

    setCurrentScreen('diagnosis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateKeywords = (selectedKeywords: string[]) => {
    if (!diagnosis) return;
    setDiagnosis({
      ...diagnosis,
      selectedKeywords
    });
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setBasicInfo(INITIAL_BASIC_INFO);
    setAnswers({});
    setDiagnosis(null);
    setStatement(INITIAL_STATEMENT);
    setProfileDetails(INITIAL_PROFILE_DETAILS);
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const needsDiagnosisScreen =
    (currentScreen === 'diagnosis' ||
      currentScreen === 'statement' ||
      currentScreen === 'profile') &&
    !diagnosis;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#181818]">
      {/* Sticky Header Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLoadSample={handleLoadSample}
        onReset={() => setIsResetModalOpen(true)}
        hasSavedData={hasSavedData}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentScreen === 'landing' && (
          <LandingView
            onStart={handleStart}
            onStartWithLifeStage={handleStartWithLifeStage}
            onLoadSample={handleLoadSample}
            onPreviewDiagnosisSample={handlePreviewDiagnosisSample}
            onReset={() => setIsResetModalOpen(true)}
            hasSavedData={hasSavedData}
            onContinue={handleContinue}
          />
        )}

        {currentScreen === 'questionnaire' && (
          <QuestionnaireView
            basicInfo={basicInfo}
            setBasicInfo={setBasicInfo}
            answers={answers}
            setAnswers={setAnswers}
            onComplete={handleQuestionnaireComplete}
            onBackToLanding={() => {
              setCurrentScreen('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onFillCurrentSample={handleFillCurrentSample}
            onReset={() => setIsResetModalOpen(true)}
            hasSavedData={hasSavedData}
          />
        )}

        {needsDiagnosisScreen && (
          <section className="bg-[#FDD116] py-16 px-4 sm:px-6 min-h-[70vh] flex items-center">
            <div className="max-w-xl mx-auto w-full text-center">
              <SpeechBubbleTitle className="mb-8">
                먼저 <span className="text-[#FDD116]">경험 질문</span>을 채워볼까요?
              </SpeechBubbleTitle>
              <div className="bg-white rounded-[26px] p-8 sm:p-10 shadow-md">
                <div className="flex justify-center mb-4">
                  <CardCharacterAvatar variant="coral" />
                </div>
                <h2 className="font-display font-bold text-2xl text-[#161616] mb-2">
                  아직 진단된 강점 데이터가 없어요
                </h2>
                <p className="text-sm sm:text-base text-[#4A505A] leading-relaxed mb-7">
                  6가지 경험 질문에 답하면 나만의 대표 강점 타입과 브랜드 문장, 1페이지 프로필이 자동으로 완성됩니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleStart}
                    className="w-full sm:w-auto min-h-[50px] px-7 py-3 rounded-full bg-[#161616] text-white font-bold text-sm sm:text-base hover:bg-[#2B2B2B] transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span className="text-[#FDD116]">경험 질문</span>
                    <span>시작하기</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="w-full sm:w-auto min-h-[50px] px-6 py-3 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-sm sm:text-base hover:bg-[#FDD116]/20 transition cursor-pointer whitespace-nowrap"
                  >
                    예시 결과 바로 보기
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentScreen === 'diagnosis' && diagnosis && (
          <DiagnosisResultView
            basicInfo={basicInfo}
            diagnosis={diagnosis}
            onUpdateKeywords={handleUpdateKeywords}
            onNext={() => {
              setCurrentScreen('statement');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToQuestions={() => {
              setCurrentScreen('questionnaire');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'statement' && diagnosis && (
          <BrandStatementBuilderView
            basicInfo={basicInfo}
            diagnosis={diagnosis}
            statement={statement}
            setStatement={setStatement}
            profileDetails={profileDetails}
            setProfileDetails={setProfileDetails}
            onNext={() => {
              setCurrentScreen('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToDiagnosis={() => {
              setCurrentScreen('diagnosis');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'profile' && diagnosis && (
          <ProfilePageView
            basicInfo={basicInfo}
            setBasicInfo={setBasicInfo}
            diagnosis={diagnosis}
            statement={statement}
            profileDetails={profileDetails}
            setProfileDetails={setProfileDetails}
            onEdit={() => {
              setCurrentScreen('statement');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReset={() => setIsResetModalOpen(true)}
          />
        )}
      </main>

      {/* Quiet Stationery Footer (No-Print) */}
      <footer className="no-print bg-white border-t border-[#E5E8EC] py-9 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs sm:text-sm text-[#5E6572]">
          <div>
            <p className="font-display font-bold text-[#161616] text-base mb-1">
              나의 브랜드 발견소
            </p>
            <p>“경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다.”</p>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p className="font-semibold text-[#333840]">
              개인정보 비저장 안심 서비스 · 브라우저 로컬 보관
            </p>
            <p className="text-[#7A828E]">
              여성 시민의 숨은 경험 발굴과 나다운 도전을 응원합니다.
            </p>
          </div>
        </div>
      </footer>

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}
