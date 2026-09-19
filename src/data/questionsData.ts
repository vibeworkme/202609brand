import { QuestionItem } from '../types';

export const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    areaNumber: 1,
    areaTitle: '1. 내가 오랫동안 해온 일',
    areaSubtitle: '직장 경력, 자영업, 살림, 프로젝트 등 내가 시간과 공을 가장 많이 들였던 영역',
    question: '지금까지 나의 삶에서 가장 길게 지속했거나, 깊이 있게 몰입했던 활동은 무엇인가요?',
    description: '공식적인 회사 경력뿐만 아니라 프리랜서, 가게 운영, 집안의 살림과 자산 관리, 동아리 활동 등도 모두 가치 있는 경력입니다.',
    isMultiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'q1_opt1',
        label: '체계적인 사무행정, 회계·문서 정리, 일정 및 프로젝트 관리',
        subLabel: '규칙을 세우고, 서류를 깔끔히 정리하며 일정을 차질 없이 운영함',
        scores: { planning: 4, execution: 1, growth: 1 },
        recommendedStrengthKeyword: '체계적정리'
      },
      {
        id: 'q1_opt2',
        label: '고객 응대, 영업, 사람들을 대면하고 마음을 여는 소통 업무',
        subLabel: '다양한 사람의 이야기를 듣고 친절하게 대안을 안내함',
        scores: { relationship: 4, care: 2 },
        recommendedStrengthKeyword: '소통과환대'
      },
      {
        id: 'q1_opt3',
        label: '가족 건강 돌봄, 식단·살림 운영, 아이 양육 및 가계 자산 관리',
        subLabel: '가족 구성원의 일상을 세심하게 지원하고 예산과 일정을 챙김',
        scores: { care: 4, planning: 2 },
        recommendedStrengthKeyword: '세심한돌봄'
      },
      {
        id: 'q1_opt4',
        label: '새로운 상품/서비스 기획, 홍보 콘텐츠 제작, 디자인 및 글쓰기',
        subLabel: '아이디어를 시각화하거나 감성적인 문장으로 표현함',
        scores: { creation: 4, growth: 1 },
        recommendedStrengthKeyword: '스토리텔링'
      },
      {
        id: 'q1_opt5',
        label: '현장 판매, 행사 진행, 물품 조달 등 직접 발로 뛰며 완성한 일',
        subLabel: '문제가 생겨도 빠르게 현장에서 대안을 찾아 완수함',
        scores: { execution: 4, planning: 1 },
        recommendedStrengthKeyword: '현장실행력'
      },
      {
        id: 'q1_opt6',
        label: '누군가를 가르치고 지도하거나, 연구 및 지식을 정리하는 일',
        subLabel: '배운 것을 체계화하고 다른 사람에게 쉽게 알려줌',
        scores: { growth: 4, planning: 2 },
        recommendedStrengthKeyword: '지식나눔'
      }
    ],
    textPrompt: '그 일에서 내가 주로 맡았던 역할이나 기억에 남는 성과는 무엇인가요?',
    textPlaceholder: '예: 8년간 중소기업에서 인사총무를 맡아 복잡한 서류 절차를 알기 쉽게 매뉴얼화했던 경험 / 10년간 학부모회와 살림을 챙기며 꼼꼼하게 일정을 조율한 경험',
    textHelperTip: '사소해 보이는 경험이라도 구체적으로 적으면 나만의 브랜드 색깔이 뚜렷해집니다.',
    defaultSampleAnswer: '7년간 직장에서 총무 및 회계 업무를 보며 복잡한 비용 정산과 행사 일정 관리를 체계화했습니다. 퇴직 후에도 5년간 아파트 입주자 소통 모임을 운영하며 매뉴얼을 만들었습니다.'
  },
  {
    id: 2,
    areaNumber: 2,
    areaTitle: '2. 주변 사람들이 나에게 자주 부탁하는 일',
    areaSubtitle: '남들이 먼저 알아본 나의 타고난 기질과 믿음직한 능력',
    question: '가족, 친구, 지인들이 나에게 "이것 좀 도와줘", "너한테 물어보길 잘했다"고 말하는 것은 무엇인가요?',
    description: '스스로에게는 너무 당연하고 쉬운 일이지만, 남들에게는 꼭 필요하고 고마운 일이 바로 나의 핵심 재능입니다.',
    isMultiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'q2_opt1',
        label: '"언니한테 말하고 나면 마음이 한결 가볍고 위로가 돼" (고민 경청 & 정서 지지)',
        subLabel: '판단하지 않고 묵묵히 들어주고 공감해주는 편안함',
        scores: { care: 4, relationship: 2 },
        recommendedStrengthKeyword: '깊은경청'
      },
      {
        id: 'q2_opt2',
        label: '"이 복잡한 걸 어떻게 이렇게 쏙쏙 뽑아 정리했어?" (자료 요약 & 일정 정리)',
        subLabel: '여행 계획, 서류 작성, 흩어진 정보를 보기 좋게 묶어줌',
        scores: { planning: 4, growth: 1 },
        recommendedStrengthKeyword: '핵심요약'
      },
      {
        id: 'q2_opt3',
        label: '"너는 모임 분위기를 금방 부드럽게 만들어" (사람 연결 & 어색함 해소)',
        subLabel: '처음 보는 사람들도 잘 섞이도록 자연스럽게 다리를 놓아줌',
        scores: { relationship: 4, execution: 1 },
        recommendedStrengthKeyword: '분위기조율'
      },
      {
        id: 'q2_opt4',
        label: '"너한테 물어보면 언제나 좋은 책, 유용한 정보, 배울 점이 나와" (정보 추천 & 조언)',
        subLabel: '일상에서 유익한 지식을 부지런히 찾아 남들에게 공유함',
        scores: { growth: 4, creation: 1 },
        recommendedStrengthKeyword: '정보큐레이션'
      },
      {
        id: 'q2_opt5',
        label: '"이거 안 풀리는데 네가 대신 한번 뚫어줘" (담대한 문제 해결 & 추진)',
        subLabel: '어려운 협상, 교환·환불, 낯선 곳에 문의하기를 척척 해냄',
        scores: { execution: 4, relationship: 1 },
        recommendedStrengthKeyword: '담대한추진'
      },
      {
        id: 'q2_opt6',
        label: '"너의 손을 거치면 평범한 것도 예쁘고 감각적이게 변해" (공예, 글, 데코, 표현)',
        subLabel: '선물 포장, 카드 작성, 공간 꾸미기, 감성 사진 등 남다른 눈썰미',
        scores: { creation: 4, care: 1 },
        recommendedStrengthKeyword: '감각적안목'
      }
    ],
    textPrompt: '지인들에게 자주 들었던 칭찬의 한마디나 에피소드가 있다면 적어주세요.',
    textPlaceholder: '예: "지은이 너랑 얘기하고 나면 엉킨 실타래가 술술 풀리는 것 같아", "여행 갈 때 네가 짜준 코스는 단 한 번도 실패가 없었어"',
    textHelperTip: '다른 사람이 내게 건넸던 따뜻한 말 한마디를 그대로 옮겨 적어보세요.',
    defaultSampleAnswer: '"너는 어떤 복잡한 이야기도 핵심을 쏙 뽑아 정리해주고, 차분하게 들어줘서 대화하고 나면 늘 안심이 된다"는 말을 가장 자주 듣습니다.'
  },
  {
    id: 3,
    areaNumber: 3,
    areaTitle: '3. 문제를 해결했던 경험',
    areaSubtitle: '예상치 못한 위기나 막막한 상황을 마주했을 때 내가 취했던 태도',
    question: '어려운 과제나 갈등 상황이 닥쳤을 때, 나는 주로 어떤 방식으로 돌파구를 찾았나요?',
    description: '크고 작은 역경을 헤쳐나온 방식 속에 나의 가장 단단한 무기가 숨어 있습니다.',
    isMultiSelect: false,
    options: [
      {
        id: 'q3_opt1',
        label: '일단 차분하게 문제의 원인을 단계별로 나누고 체크리스트를 만들어 해결했다',
        subLabel: '상황을 객관적으로 분석하고 우선순위에 따라 순차적으로 정리',
        scores: { planning: 4, growth: 1 },
        recommendedStrengthKeyword: '단계별해결'
      },
      {
        id: 'q3_opt2',
        label: '고민만 하기보다 당장 할 수 있는 가장 작은 행동부터 발로 뛰며 실천했다',
        subLabel: '직접 현장에 가보고, 관계자에게 전화하며 대안을 즉각 행동으로 옮김',
        scores: { execution: 4, creation: 1 },
        recommendedStrengthKeyword: '즉각대안실행'
      },
      {
        id: 'q3_opt3',
        label: '관련된 사람들을 한자리에 모아 솔직하게 대화하고 서로의 입장을 중재했다',
        subLabel: '감정적인 앙금을 풀고 상호 이익이 되는 타협점을 찾아냄',
        scores: { relationship: 4, care: 2 },
        recommendedStrengthKeyword: '대화와중재'
      },
      {
        id: 'q3_opt4',
        label: '지쳐 있는 사람의 마음을 먼저 보듬고, 안심할 수 있는 환경을 만들어주었다',
        subLabel: '결과보다 사람의 마음을 먼저 챙겨 관계의 신뢰를 지켜냄',
        scores: { care: 4, relationship: 1 },
        recommendedStrengthKeyword: '정서적안정'
      },
      {
        id: 'q3_opt5',
        label: '기존의 방식이 통하지 않아서 남들이 생각지 못한 새로운 아이디어를 시도했다',
        subLabel: '형식을 비틀어 유쾌하거나 참신한 방식으로 반전을 이끌어냄',
        scores: { creation: 4, execution: 1 },
        recommendedStrengthKeyword: '창의적발상'
      },
      {
        id: 'q3_opt6',
        label: '관련 서적, 자료, 전문가 강의를 철저하게 공부하여 해답을 찾아냈다',
        subLabel: '모르는 것을 두려워하지 않고 스스로 학습하여 전문성을 채움',
        scores: { growth: 4, planning: 2 },
        recommendedStrengthKeyword: '심층탐구'
      }
    ],
    textPrompt: '당시 위기를 넘기며 내가 배운 점이나 느꼈던 보람은 무엇인가요?',
    textPlaceholder: '예: 학교 행사 때 예산이 삭감되었지만, 마을 소상공인과 협력해 물품을 후원받아 성공적으로 마무리했던 경험',
    textHelperTip: '결과의 크기보다, 내가 주도적으로 무언가를 움직였다는 감각에 집중해보세요.',
    defaultSampleAnswer: '학부모회 바자회 준비 중 일정 차질이 생겼을 때, 당황하지 않고 3단계 비상 연락망과 체크리스트를 다시 짜서 참여율 120%로 성공적으로 마쳤습니다.'
  },
  {
    id: 4,
    areaNumber: 4,
    areaTitle: '4. 육아·돌봄·봉사·지역활동 경험',
    areaSubtitle: '가정, 이웃, 공동체 안에서 발휘해온 값진 생활 역량',
    question: '가족을 돌보거나 지역사회, 봉사, 소모임에서 내가 기여했던 모습은 어떤 것이었나요?',
    description: '돌봄과 자원봉사는 고도의 커뮤니케이션, 멀티태스킹, 위기관리, 공감 능력이 집약된 최고의 실전 경험입니다.',
    isMultiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'q4_opt1',
        label: '모임의 회계, 일정 공지, 기록, 준비물 챙기기 등 살림꾼 총무 역할',
        subLabel: '누락 없이 빈틈없이 챙겨 구성원 모두가 편안하게 참여하도록 함',
        scores: { planning: 3, care: 2 },
        recommendedStrengthKeyword: '안정적운영'
      },
      {
        id: 'q4_opt2',
        label: '아프거나 힘들어하는 가족·이웃 곁을 든든하게 지키며 일상 회복을 도움',
        subLabel: '환자와 아이의 사소한 상태 변화도 놓치지 않는 지극한 정성과 케어',
        scores: { care: 4, relationship: 1 },
        recommendedStrengthKeyword: '맞춤형돌봄'
      },
      {
        id: 'q4_opt3',
        label: '새로 들어온 이웃이나 소외된 분들을 따뜻하게 반기며 어울리도록 도움',
        subLabel: '외로운 사람에게 먼저 말을 걸고 안부를 물으며 관계를 형성함',
        scores: { relationship: 4, care: 1 },
        recommendedStrengthKeyword: '환대와포용'
      },
      {
        id: 'q4_opt4',
        label: '지역 바자회, 벼룩시장, 봉사 캠페인을 기획하고 사람들을 독려해 이끌어냄',
        subLabel: '공동의 목표를 위해 주도적으로 팀을 구성하고 이끌어냄',
        scores: { execution: 3, planning: 2 },
        recommendedStrengthKeyword: '공동체리더십'
      },
      {
        id: 'q4_opt5',
        label: '모임 홍보 포스터 만들기, SNS 소식지 작성, 사진 촬영 및 기록',
        subLabel: '활동의 의미를 예쁜 디자인과 따뜻한 글귀로 알림',
        scores: { creation: 4, growth: 1 },
        recommendedStrengthKeyword: '콘텐츠기록'
      },
      {
        id: 'q4_opt6',
        label: '동네 아이들 공부방 지도, 어르신 스마트폰 교육 등 배움 나누기',
        subLabel: '눈높이에 맞춰 인내심을 갖고 천천히 가르쳐줌',
        scores: { growth: 4, care: 2 },
        recommendedStrengthKeyword: '눈높이지도'
      }
    ],
    textPrompt: '이러한 돌봄/공동체 활동을 통해 내가 단단해졌다고 느끼는 역량은 무엇인가요?',
    textPlaceholder: '예: 10년간 두 아이를 키우며 기른 인내심과 상황 대처 능력, 마을 작은도서관 자원활동을 하며 익힌 회원 관리와 소통법',
    textHelperTip: '돌봄의 시간은 경력 단절이 아니라 "사람과 삶을 이해하는 전문성"이 축적된 시간입니다.',
    defaultSampleAnswer: '아이 둘을 키우며 돌발 상황을 다루는 침착함과 인내심을 길렀고, 아파트 부녀회 총무를 맡아 복잡한 공동체 민원을 경청하고 조율하는 소통 역량을 키웠습니다.'
  },
  {
    id: 5,
    areaNumber: 5,
    areaTitle: '5. 내가 좋아하거나 계속 배우는 분야',
    areaSubtitle: '누가 시키지 않아도 마음이 끌리고 자발적으로 에너지를 쏟는 관심사',
    question: '시간이 날 때 자꾸 찾아보게 되거나, 앞으로 더 깊이 파고들고 싶은 테마는 무엇인가요?',
    description: '나의 호기심과 열정이 머무는 곳에 미래 브랜드의 지속 가능한 엔진이 있습니다.',
    isMultiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'q5_opt1',
        label: '마음챙김, 심리학, 타로/사주, 대화법, 감정 코칭 등 내면 탐구',
        subLabel: '사람의 심리와 무의식, 치유와 회복의 메커니즘에 깊은 흥미',
        scores: { care: 3, growth: 2, relationship: 1 },
        recommendedStrengthKeyword: '내면치유'
      },
      {
        id: 'q5_opt2',
        label: '노션, 엑셀, 디지털 도구 활용법, 시간 관리 및 생산성 시스템 구축',
        subLabel: '새로운 툴을 익히고 삶의 루틴을 효율적으로 정리하는 기쁨',
        scores: { planning: 4, growth: 2 },
        recommendedStrengthKeyword: '디지털생산성'
      },
      {
        id: 'q5_opt3',
        label: '가드닝, 요리, 공예, 인테리어, 사진 등 손으로 직접 빚는 라이프스타일',
        subLabel: '일상에 아름다움을 더하고 나만의 취향과 색깔을 담는 활동',
        scores: { creation: 4, care: 1 },
        recommendedStrengthKeyword: '감각적라이프'
      },
      {
        id: 'q5_opt4',
        label: '인문학 독서, 역사, 사회 문제, 글쓰기, 비평 등 사유와 지식 탐구',
        subLabel: '깊이 있는 책을 읽고 생각을 글로 정리하여 토론하는 배움',
        scores: { growth: 4, planning: 1 },
        recommendedStrengthKeyword: '인문학적사유'
      },
      {
        id: 'q5_opt5',
        label: '마케팅, 1인 창업, 소셜 비즈니스, 브랜드 스토리, 브랜딩 실전',
        subLabel: '아이디어를 세상에 내놓고 실제 비즈니스로 연결하는 구조 학습',
        scores: { execution: 3, creation: 2, planning: 1 },
        recommendedStrengthKeyword: '비즈니스감각'
      },
      {
        id: 'q5_opt6',
        label: '커뮤니티 빌딩, 모임 기획, 다양한 사람들과의 네트워크 확장',
        subLabel: '서로 다른 사람들이 모여 시너지를 내는 장을 만드는 법',
        scores: { relationship: 4, execution: 1 },
        recommendedStrengthKeyword: '커뮤니티기획'
      }
    ],
    textPrompt: '요즘 관심 있게 읽고 있는 책이나, 수강 중인 강의/취미가 있다면 적어주세요.',
    textPlaceholder: '예: 최근 6개월간 정리수납 전문가 과정과 퍼스널 브랜딩 관련 책을 5권 정독했습니다.',
    textHelperTip: '사소한 관심사라도 꾸준히 이어온 것이라면 훌륭한 자산입니다.',
    defaultSampleAnswer: '정리수납 및 공간 컨설팅 관련 책과 디지털 노션 활용법 강의를 틈틈이 들으며, 일상의 복잡함을 덜어주는 라이프스타일 코칭에 관심이 많습니다.'
  },
  {
    id: 6,
    areaNumber: 6,
    areaTitle: '6. 앞으로 돕고 싶은 사람과 해결하고 싶은 문제',
    areaSubtitle: '나의 경험과 역량을 건네주고 싶은 대상과 사회적 가치',
    question: '나의 강점과 따뜻한 경험으로 가장 힘이 되어주고 싶은 대상과 해결하고 싶은 어려움은 무엇인가요?',
    description: '퍼스널 브랜드의 완성은 "나의 능력이 누구의 어떤 아픔을 덜어주는가"에 대한 대답에서 시작됩니다.',
    isMultiSelect: true,
    maxSelect: 2,
    options: [
      {
        id: 'q6_opt1',
        label: '경력 복귀나 새로운 시작 앞에서 막막함과 불안을 겪는 여성들',
        subLabel: '"나도 해낼 수 있을까?" 고민하는 분들에게 체계적인 길잡이가 되어줌',
        scores: { growth: 3, planning: 2, care: 1 },
        recommendedStrengthKeyword: '경력재설계'
      },
      {
        id: 'q6_opt2',
        label: '정리되지 않은 일과 살림, 복잡한 업무로 시간에 쫓기는 사람들',
        subLabel: '우선순위를 잡지 못해 번아웃이 온 사람들에게 질서와 여유를 선물함',
        scores: { planning: 4, care: 2 },
        recommendedStrengthKeyword: '일상질서회복'
      },
      {
        id: 'q6_opt3',
        label: '자녀 양육이나 가족 돌봄으로 지쳐 자신을 잃어버린 엄마들',
        subLabel: '따뜻한 공감과 지지로 나만의 온전한 시간을 되찾도록 도움',
        scores: { care: 4, relationship: 2 },
        recommendedStrengthKeyword: '자아회복지원'
      },
      {
        id: 'q6_opt4',
        label: '혼자서 모든 것을 감당해야 하는 1인 기업가 및 소상공인',
        subLabel: '실제적인 운영 실행과 현장 서포트로 든든한 파트너가 되어줌',
        scores: { execution: 4, planning: 1 },
        recommendedStrengthKeyword: '실전동행파트너'
      },
      {
        id: 'q6_opt5',
        label: '서로 소통하지 못해 단절되거나 외로움을 느끼는 지역 이웃들',
        subLabel: '따뜻한 모임과 연대를 통해 건강한 마을 관계망을 형성함',
        scores: { relationship: 4, care: 2 },
        recommendedStrengthKeyword: '따뜻한연대'
      },
      {
        id: 'q6_opt6',
        label: '나만의 이야기나 가치를 세상에 멋지게 알리고 싶은 창작자들',
        subLabel: '빛나는 매력을 발굴하여 매력적인 콘텐츠와 브랜드로 표현해줌',
        scores: { creation: 4, growth: 2 },
        recommendedStrengthKeyword: '스토리발굴'
      }
    ],
    textPrompt: '내가 그분들에게 전하고 싶은 핵심 가치나 응원의 메시지는 무엇인가요?',
    textPlaceholder: '예: "당신이 걸어온 시간은 결코 헛되지 않았습니다. 혼자 끙끙 앓지 않고 함께 차근차근 정리하면 반드시 길을 찾을 수 있어요."',
    textHelperTip: '진심 어린 한 문장이 브랜드의 가장 강력한 슬로건이 됩니다.',
    defaultSampleAnswer: '"경력의 공백으로 주저하는 분들이 자신의 숨은 역량을 재발견하고, 체계적인 작은 실행으로 일상의 자신감을 되찾도록 돕고 싶습니다."'
  }
];

export const LIFE_STAGES = [
  '재취업을 준비하는 여성',
  '경력전환을 고민하는 여성',
  '인생 2막을 준비하는 중장년 여성',
  '독립을 꿈꾸는 프리랜서·예비창업자',
  '시민활동·돌봄 경험을 브랜딩하고 싶은 여성',
  '나만의 강점과 가치를 명확히 찾고 싶은 여성'
];
