import React, { useState, useEffect } from 'react';
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
  fullSentence: '나는 경력 복귀를 고민하는 여성이 시작의 두려움과 막막함을 해결할 수 있도록, 체계적인 기획력과 세심한 지원력을 활용해 새로운 자신감과 질서를 만드는 사람입니다.',
  selectedTemplateIdx: 0
};

const INITIAL_PROFILE_DETAILS: ProfileDetails = {
  goodAtList: [
    '복잡한 상황을 차근차근 순서대로 정리하기',
    '상대방의 불편함을 세심하게 살피고 돕기',
    '예산과 일정을 낭비 없이 꼼꼼하게 운영하기'
  ],
  representativeExperience: '가정 살림과 자원봉사, 다양한 일상의 프로젝트를 주도하며 실전 역량을 키웠습니다.',
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

  const handleFillCurrentSample = (questionId: number) => {
    const q = QUESTIONS.find((item) => item.id === questionId);
    if (!q) return;

    // Pick top 2 options
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

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7] text-[#28212c]">
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
            onLoadSample={handleLoadSample}
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
          />
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

      {/* Footer (No-Print) */}
      <footer className="no-print bg-[#f3efe9] border-t border-[#e3ded5] py-8 sm:py-10 px-4 sm:px-6 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs sm:text-sm text-[#736777]">
          <div>
            <p className="font-bold text-[#352b39] text-base mb-1">
              나의 브랜드 발견소
            </p>
            <p className="leading-relaxed">
              “경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다.”
            </p>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p className="font-medium text-[#5c5061]">
              개인정보 비저장 안심 서비스 (브라우저 로컬 저장)
            </p>
            <p className="text-[#8e8192]">
              여성 시민의 강점 발굴과 지속 가능한 사회적 참여를 응원합니다.
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
