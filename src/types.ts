export type StrengthTypeKey =
  | 'planning'      // 기획형
  | 'execution'     // 실행형
  | 'relationship'  // 관계형
  | 'care'          // 돌봄형
  | 'creation'      // 창작형
  | 'growth';       // 성장형

export interface StrengthTypeInfo {
  key: StrengthTypeKey;
  name: string;             // e.g. "기획형"
  englishTitle: string;     // e.g. "Planner & Structurer"
  oneLiner: string;         // "복잡한 일을 순서와 구조로 정리하는 사람"
  description: string;
  badge: string;            // e.g. "체계와 구조의 설계자"
  behaviors: string[];      // 강점을 보여주는 행동 특징
  recommendedJobs: string[]; // 활용할 수 있는 활동 및 직무 분야
  cautions: string;         // 주의해야 할 약점 및 보완 팁
  keywords: string[];       // 추천 브랜드 키워드
  iconName: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    lightBg: string;
  };
}

export interface QuestionOption {
  id: string;
  label: string;
  subLabel?: string;
  scores: Partial<Record<StrengthTypeKey, number>>;
  recommendedStrengthKeyword?: string;
}

export interface QuestionItem {
  id: number;
  areaNumber: number;
  areaTitle: string;         // 영역 제목 (1. 내가 오랫동안 해온 일 등)
  areaSubtitle: string;
  question: string;
  description: string;
  isMultiSelect?: boolean;
  maxSelect?: number;
  options: QuestionOption[];
  textPrompt: string;        // 주관식 질문 프롬프트
  textPlaceholder: string;
  textHelperTip: string;
  defaultSampleAnswer?: string;
}

export interface UserBasicInfo {
  name: string;
  lifeStage: string;         // 재취업 준비, 경력전환, 중장년, 프리랜서, 시민활동/돌봄 등
  contactOrSns: string;
  photoUrl: string;          // base64 data url for browser local preview only
}

export interface UserAnswers {
  [questionId: number]: {
    selectedOptionIds: string[];
    customText: string;
  };
}

export interface DiagnosisResult {
  scores: Record<StrengthTypeKey, number>;
  primaryType: StrengthTypeKey;
  secondaryTypes: [StrengthTypeKey, StrengthTypeKey];
  recommendedKeywords: string[];
  selectedKeywords: string[];
}

export interface BrandStatementComponents {
  target: string;          // 내가 돕고 싶은 사람
  problem: string;         // 해결하고 싶은 문제
  experience: string;      // 나의 대표 경험
  strength: string;        // 나의 핵심 강점
  value: string;           // 제공하고 싶은 가치
  fullSentence: string;    // 완성된 브랜드 문장
  selectedTemplateIdx: number;
}

export interface ActionPlan {
  id: string;
  text: string;
  completed?: boolean;
}

export interface ProfileDetails {
  goodAtList: string[];            // 내가 잘하는 일 (핵심 역량 3~4개)
  representativeExperience: string; // 대표 경험 요약문
  targetAudience: string;          // 돕고 싶은 사람
  activitiesOrServices: string[];  // 제공할 수 있는 활동 또는 서비스
  actionPlans30Days: string[];     // 앞으로 30일 동안 실행할 일 3개
}

export interface AppState {
  currentScreen: 'landing' | 'questionnaire' | 'diagnosis' | 'statement' | 'profile';
  currentQuestionIndex: number;
  basicInfo: UserBasicInfo;
  answers: UserAnswers;
  diagnosis: DiagnosisResult | null;
  statement: BrandStatementComponents;
  profileDetails: ProfileDetails;
  isCompleted: boolean;
}
