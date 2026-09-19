import { QUESTIONS } from '../data/questionsData';
import { STRENGTH_TYPES } from '../data/strengthTypes';
import {
  BrandStatementComponents,
  DiagnosisResult,
  ProfileDetails,
  StrengthTypeKey,
  UserAnswers,
  UserBasicInfo
} from '../types';

export function calculateDiagnosis(answers: UserAnswers): DiagnosisResult {
  const scores: Record<StrengthTypeKey, number> = {
    planning: 0,
    execution: 0,
    relationship: 0,
    care: 0,
    creation: 0,
    growth: 0
  };

  const collectedKeywords: string[] = [];

  QUESTIONS.forEach((q) => {
    const userAnswer = answers[q.id];
    if (!userAnswer) return;

    userAnswer.selectedOptionIds.forEach((optId) => {
      const option = q.options.find((o) => o.id === optId);
      if (option) {
        // Add scores
        Object.entries(option.scores).forEach(([k, val]) => {
          scores[k as StrengthTypeKey] += val || 0;
        });

        // Add recommended keyword
        if (option.recommendedStrengthKeyword) {
          collectedKeywords.push(option.recommendedStrengthKeyword);
        }
      }
    });
  });

  // Sort strength types by score descending
  const sortedKeys = (Object.keys(scores) as StrengthTypeKey[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const primaryType = sortedKeys[0] || 'planning';
  const secondaryTypes: [StrengthTypeKey, StrengthTypeKey] = [
    sortedKeys[1] || 'care',
    sortedKeys[2] || 'growth'
  ];

  // Combine keywords: primary type keywords + matched keywords from answers
  const primaryTypeKeywords = STRENGTH_TYPES[primaryType]?.keywords || [];
  const secondaryTypeKeywords = [
    ...(STRENGTH_TYPES[secondaryTypes[0]]?.keywords.slice(0, 2) || []),
    ...(STRENGTH_TYPES[secondaryTypes[1]]?.keywords.slice(0, 2) || [])
  ];

  const uniqueKeywords = Array.from(
    new Set([...primaryTypeKeywords, ...collectedKeywords, ...secondaryTypeKeywords])
  ).slice(0, 5);

  return {
    scores,
    primaryType,
    secondaryTypes,
    recommendedKeywords: uniqueKeywords,
    selectedKeywords: uniqueKeywords.slice(0, 3)
  };
}

export function generateSentenceByTemplate(
  idx: number,
  components: {
    target: string;
    problem: string;
    experience: string;
    strength: string;
    value: string;
  }
): string {
  const { target, problem, experience, strength, value } = components;

  switch (idx) {
    case 0:
      // Required base formula: “나는 [대상]이 [문제]를 해결할 수 있도록 [나의 강점]을 활용해 [제공하는 가치]를 만드는 사람입니다.”
      return `나는 ${target}이(가) ${problem} 문제를 해결할 수 있도록, ${strength}을(를) 활용해 ${value}을(를) 만드는 사람입니다.`;
    case 1:
      // Warm accompaniment & empathy variation
      return `나는 ${target}이(가) 겪는 ${problem}의 무게를 덜어주고, ${experience}과(와) ${strength}으로 ${value}을(를) 함께 꽃피우는 사람입니다.`;
    case 2:
      // Action & leadership variation
      return `나는 ${target}이(가) ${problem}을(를) 딛고 한 단계 도약하도록, ${strength}을(를) 나침반 삼아 단단한 ${value}을(를) 실천하는 사람입니다.`;
    default:
      return `나는 ${target}이(가) ${problem} 문제를 해결할 수 있도록, ${strength}을(를) 활용해 ${value}을(를) 만드는 사람입니다.`;
  }
}

export function getDefaultComponentsForDiagnosis(
  diagnosis: DiagnosisResult,
  basicInfo: UserBasicInfo,
  answers: UserAnswers
): BrandStatementComponents {
  const pType = STRENGTH_TYPES[diagnosis.primaryType];
  const sType1 = STRENGTH_TYPES[diagnosis.secondaryTypes[0]];

  // Target candidate
  const q6Answer = answers[6]?.selectedOptionIds[0];
  let target = '경력 복귀를 고민하는 여성';
  if (q6Answer === 'q6_opt1') target = '경력 복귀와 새로운 시작을 준비하는 여성';
  else if (q6Answer === 'q6_opt2') target = '복잡한 일과 살림으로 번아웃된 사람';
  else if (q6Answer === 'q6_opt3') target = '가족 돌봄으로 지쳐 자신을 잃어버린 엄마';
  else if (q6Answer === 'q6_opt4') target = '혼자서 모든 것을 감당하는 1인 기업가';
  else if (q6Answer === 'q6_opt5') target = '따뜻한 연결이 필요한 지역 이웃';
  else if (q6Answer === 'q6_opt6') target = '나만의 색깔을 알리고 싶은 창작자';

  // Problem candidate
  let problem = '경력의 막막함과 시작의 두려움';
  if (diagnosis.primaryType === 'planning') problem = '정리되지 않은 복잡한 일과 불확실성';
  else if (diagnosis.primaryType === 'execution') problem = '생각만 많아 첫걸음을 떼지 못하는 망설임';
  else if (diagnosis.primaryType === 'relationship') problem = '관계의 단절과 혼자 겪는 외로움';
  else if (diagnosis.primaryType === 'care') problem = '반복되는 일상에서의 피로와 심리적 소진';
  else if (diagnosis.primaryType === 'creation') problem = '틀에 박힌 일상과 나만의 색깔 부재';
  else if (diagnosis.primaryType === 'growth') problem = '배움과 성장의 방향을 찾지 못하는 답답함';

  // Experience candidate from Q1 or Q4
  const q1Text = answers[1]?.customText?.trim();
  const q4Text = answers[4]?.customText?.trim();
  const experience = q1Text
    ? q1Text.slice(0, 35)
    : q4Text
    ? q4Text.slice(0, 35)
    : '10년의 살림과 행정·돌봄으로 다져진 현장 경험';

  // Strength candidate
  const strength = `${pType.name}의 ${pType.badge}`;

  // Value candidate
  let value = '지속 가능한 삶의 질서와 자신감';
  if (diagnosis.primaryType === 'planning') value = '명쾌한 로드맵과 체계적인 실행력';
  else if (diagnosis.primaryType === 'execution') value = '망설임 없는 돌파구와 구체적인 결과';
  else if (diagnosis.primaryType === 'relationship') value = '서로를 살리는 따뜻한 연대와 소통';
  else if (diagnosis.primaryType === 'care') value = '안도감을 주는 회복과 든든한 일상 안전지대';
  else if (diagnosis.primaryType === 'creation') value = '세상에 단 하나뿐인 매력과 영감';
  else if (diagnosis.primaryType === 'growth') value = '스스로 답을 찾아가는 배움의 나침반';

  const defaultSentence = generateSentenceByTemplate(0, {
    target,
    problem,
    experience,
    strength,
    value
  });

  return {
    target,
    problem,
    experience,
    strength,
    value,
    fullSentence: defaultSentence,
    selectedTemplateIdx: 0
  };
}

export function getDefaultProfileDetails(
  diagnosis: DiagnosisResult,
  statement: BrandStatementComponents,
  answers: UserAnswers
): ProfileDetails {
  const pType = STRENGTH_TYPES[diagnosis.primaryType];
  const sType1 = STRENGTH_TYPES[diagnosis.secondaryTypes[0]];

  // Good at (Core Competencies)
  const goodAtList = [
    pType.behaviors[0] || '복잡한 상황을 체계적으로 구조화하기',
    pType.behaviors[1] || '효율적인 일정과 우선순위 관리',
    sType1?.behaviors[0] || '상대방의 필요를 세심하게 파악하고 지원하기',
    '오랜 경험을 바탕으로 한 침착한 위기 대처'
  ];

  // Activities or Services
  const activitiesOrServices = [
    ...pType.recommendedJobs.slice(0, 2),
    ...sType1.recommendedJobs.slice(0, 2)
  ];

  // Action Plans for next 30 days
  const actionPlans30Days = [
    '나의 지난 경험과 강점을 정리한 1페이지 프로필을 주변 지인 2명에게 공유하고 피드백 받기',
    `${statement.target} 1~2명과 편안한 커피챗을 나누며 실제 겪는 구체적인 어려움 경청하기`,
    `내가 제공할 수 있는 작은 미니 프로그램/컨설팅(또는 소모임)을 1회 무료 시범 진행해보기`
  ];

  // Representative experience summary
  const q1Text = answers[1]?.customText?.trim();
  const q3Text = answers[3]?.customText?.trim();
  const q4Text = answers[4]?.customText?.trim();

  let repExp = '';
  if (q1Text) repExp += q1Text;
  if (q4Text && (!repExp || repExp.length < 50)) {
    repExp += (repExp ? ' | ' : '') + q4Text;
  }
  if (!repExp) {
    repExp =
      '직장 행정 총무 7년 및 10년간의 가족 돌봄·공동체 자원활동을 통해 체계적인 살림 운영과 세심한 소통 역량을 축적했습니다.';
  }

  return {
    goodAtList,
    representativeExperience: repExp,
    targetAudience: statement.target,
    activitiesOrServices,
    actionPlans30Days
  };
}

// Sample Preset for 1-click testing
export function getSamplePresetState() {
  const basicInfo: UserBasicInfo = {
    name: '김지은',
    lifeStage: '경력전환을 고민하는 여성',
    contactOrSns: 'jieun.kim@email.com / instagram @jieun_brand',
    photoUrl: '' // will use avatar placeholder or uploaded image
  };

  const answers: UserAnswers = {
    1: {
      selectedOptionIds: ['q1_opt1', 'q1_opt3'],
      customText:
        '7년간 직장에서 총무 및 회계 업무를 보며 복잡한 비용 정산과 행사 일정을 체계화했습니다. 퇴직 후에도 5년간 아파트 입주자 소통 모임과 살림을 맡아 꼼꼼히 운영했습니다.'
    },
    2: {
      selectedOptionIds: ['q2_opt2', 'q2_opt1'],
      customText:
        '"너랑 대화하고 나면 머릿속 엉킨 실타래가 술술 풀리고 마음이 편안해진다"는 말을 자주 들으며, 여행이나 모임 계획표를 도맡아 작성해왔습니다.'
    },
    3: {
      selectedOptionIds: ['q3_opt1'],
      customText:
        '마을 바자회 준비 중 일정 차질이 생겼을 때, 당황하지 않고 3단계 비상 체크리스트와 일정표를 다시 짜서 목표 달성률 120%로 성공리에 마쳤습니다.'
    },
    4: {
      selectedOptionIds: ['q4_opt1', 'q4_opt2'],
      customText:
        '두 아이를 키우며 돌발 상황을 다루는 침착함과 인내심을 길렀고, 아파트 부녀회 총무를 맡아 복잡한 공동체 민원을 세심하게 경청하고 조율했습니다.'
    },
    5: {
      selectedOptionIds: ['q5_opt2', 'q5_opt1'],
      customText:
        '노션과 디지털 도구를 활용한 일상 루틴 정리, 그리고 마음챙김 대화법 책을 틈틈이 읽으며 라이프스타일 코칭에 깊은 관심을 쏟고 있습니다.'
    },
    6: {
      selectedOptionIds: ['q6_opt1', 'q6_opt2'],
      customText:
        '"경력 공백으로 주저하는 분들이 자신의 숨은 역량을 재발견하고, 체계적인 작은 실행으로 일상의 자신감을 되찾도록 돕고 싶습니다."'
    }
  };

  const diagnosis = calculateDiagnosis(answers);

  const statement: BrandStatementComponents = {
    target: '경력 복귀와 새로운 시작을 준비하는 여성',
    problem: '정리되지 않은 막막함과 시작의 두려움',
    experience: '10년의 살림과 행정·돌봄으로 다져진 현장 경험',
    strength: '체계적인 기획력과 세심한 돌봄 지원력',
    value: '지속 가능한 삶의 질서와 자신감',
    fullSentence:
      '나는 경력 복귀와 새로운 시작을 준비하는 여성이 정리되지 않은 막막함과 시작의 두려움을 해결할 수 있도록, 체계적인 기획력과 세심한 돌봄 지원력을 활용해 지속 가능한 삶의 질서와 자신감을 만드는 사람입니다.',
    selectedTemplateIdx: 0
  };

  const profileDetails: ProfileDetails = {
    goodAtList: [
      '산만한 프로젝트나 살림 업무를 매뉴얼과 체크리스트로 명확히 구조화하기',
      '상대방의 말하지 않은 필요까지 기민하게 감지하고 세심하게 지원하기',
      '예산과 자원, 일정을 효율적으로 관리하여 낭비를 줄이기',
      '오랜 육아와 돌봄으로 다져진 침착한 위기 대처 및 경청'
    ],
    representativeExperience:
      '직장 행정 총무 7년 및 10년간의 가족 돌봄·공동체 자원활동을 통해 체계적인 살림 운영과 세심한 소통 역량을 축적했습니다.',
    targetAudience: '경력 복귀와 새로운 시작을 준비하는 여성',
    activitiesOrServices: [
      '공간 및 라이프스타일 정리수납 컨설팅',
      '경력 재설계 1:1 라이프 플래닝 워크숍',
      '커뮤니티 및 소모임 기획·운영 코디네이터',
      '일상의 루틴과 시간 관리를 돕는 멘토링'
    ],
    actionPlans30Days: [
      '나의 지난 경험과 강점을 정리한 1페이지 프로필을 주변 지인 2명에게 공유하고 피드백 받기',
      '경력 복귀를 고민하는 여성 2명과 편안한 커피챗을 나누며 실제 겪는 구체적인 어려움 경청하기',
      '내가 제공할 수 있는 작은 미니 정리/플래닝 무료 파일럿 세션을 1회 진행해보기'
    ]
  };

  return {
    basicInfo,
    answers,
    diagnosis,
    statement,
    profileDetails
  };
}
