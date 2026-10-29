import React, { useRef, useState } from 'react';
import {
  Printer,
  Edit,
  RotateCcw,
  Camera,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  BrandStatementComponents,
  DiagnosisResult,
  ProfileDetails,
  UserBasicInfo
} from '../types';
import { STRENGTH_TYPES } from '../data/strengthTypes';
import { SpeechBubbleTitle, CardCharacterAvatar } from './StationeryIllustrations';

interface ProfilePageViewProps {
  basicInfo: UserBasicInfo;
  setBasicInfo: React.Dispatch<React.SetStateAction<UserBasicInfo>>;
  diagnosis: DiagnosisResult;
  statement: BrandStatementComponents;
  profileDetails: ProfileDetails;
  setProfileDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
  onEdit: () => void;
  onReset: () => void;
}

export const ProfilePageView: React.FC<ProfilePageViewProps> = ({
  basicInfo,
  setBasicInfo,
  diagnosis,
  statement,
  profileDetails,
  onEdit,
  onReset
}) => {
  const [copied, setCopied] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [checkedPlans, setCheckedPlans] = useState<Record<number, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const primaryInfo = STRENGTH_TYPES[diagnosis.primaryType];
  const secondary1Info = STRENGTH_TYPES[diagnosis.secondaryTypes[0]];
  const secondary2Info = STRENGTH_TYPES[diagnosis.secondaryTypes[1]];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setPhotoError('사진 파일 크기는 4MB 이하만 등록할 수 있습니다.');
      return;
    }

    setPhotoError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setBasicInfo((prev) => ({
        ...prev,
        photoUrl: base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const handlePrint = () => {
    window.print();
  };

  const togglePlanCheck = (idx: number) => {
    setCheckedPlans((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopyText = () => {
    const profileText = `
[나의 퍼스널 브랜드 프로필]
이름: ${basicInfo.name}
슬로건: "${statement.fullSentence}"
대표 강점: ${primaryInfo.name} (${primaryInfo.badge})
보조 강점: ${secondary1Info.name}, ${secondary2Info.name}
핵심 키워드: ${diagnosis.selectedKeywords.map((k) => '#' + k).join(' ')}

■ 대표 경험:
${profileDetails.representativeExperience}

■ 내가 잘하는 일 (핵심 역량):
${profileDetails.goodAtList.map((item) => '- ' + item).join('\n')}

■ 돕고 싶은 사람:
${profileDetails.targetAudience}

■ 제공할 수 있는 활동 및 서비스:
${profileDetails.activitiesOrServices.map((act) => '- ' + act).join('\n')}

■ 앞으로 30일 동안 실행할 일:
${profileDetails.actionPlans30Days.map((plan, i) => `${i + 1}. ${plan}`).join('\n')}

■ 연락처/SNS:
${basicInfo.contactOrSns || '미입력'}

- 나의 브랜드 발견소 (경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다) -
    `.trim();

    navigator.clipboard.writeText(profileText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="w-full">
      {/* Top Graph-Paper Action Toolbar (Hidden in Print) */}
      <section className="no-print bg-grid-paper border-b border-[#E5E8EC] py-7 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <SpeechBubbleTitle className="scale-90 origin-left mb-1">
              완성된 <span className="text-[#FDD116]">1페이지 프로필</span> 시트!
            </SpeechBubbleTitle>
            <p className="text-xs sm:text-sm text-[#4A505A]">
              A4 용지 1장에 딱 맞게 인쇄하거나 PDF로 저장해 포트폴리오·자기소개에 활용해보세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="profile-edit-btn"
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-xs sm:text-sm hover:bg-[#FAFAFA] transition cursor-pointer whitespace-nowrap shrink-0"
            >
              <Edit className="w-4 h-4" />
              <span>내용 수정</span>
            </button>

            <button
              id="profile-copy-btn"
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-xs sm:text-sm hover:bg-[#FAFAFA] transition cursor-pointer whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#00994C] stroke-[3]" />
                  <span className="text-[#00994C]">복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>텍스트 복사</span>
                </>
              )}
            </button>

            <button
              id="profile-print-btn"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#161616] text-white font-bold text-xs sm:text-sm hover:bg-[#2B2B2B] shadow-sm transition cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.99]"
            >
              <Printer className="w-4 h-4 text-[#FDD116]" />
              <span>인쇄 · PDF 저장</span>
            </button>

            <button
              id="profile-reset-btn"
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-full text-xs font-bold text-[#5E6572] hover:text-[#F25235] transition cursor-pointer whitespace-nowrap shrink-0"
              title="처음부터 다시하기"
            >
              <RotateCcw className="w-4 h-4" />
              <span>초기화</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Sunny Yellow Desk Backdrop (Screen) -> Crisp White Sheet (Print) */}
      <section className="bg-[#FDD116] py-10 sm:py-14 px-4 sm:px-6 print:bg-white print:p-0">
        {photoError && (
          <div className="no-print max-w-4xl mx-auto mb-4 p-3.5 rounded-xl bg-white border-2 border-[#F25235] text-xs sm:text-sm font-bold text-[#F25235] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{photoError}</span>
          </div>
        )}

        {/* A4 Stationery Profile Sheet */}
        <div className="profile-a4-sheet max-w-4xl mx-auto bg-white rounded-[26px] overflow-hidden shadow-lg border-2 border-[#161616]">
          {/* Top Color Strip matching user's Primary Strength Type */}
          <div
            className="h-3.5 w-full"
            style={{ backgroundColor: primaryInfo.themeColor.hex }}
            aria-hidden="true"
          />

          <div className="p-6 sm:p-11">
            {/* Sheet Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-7 border-b-2 border-[#161616]">
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight">
                  <span className="text-[#F25235]">나</span>
                  <span className="text-[#00994C]">다</span>
                  <span className="text-[#0D4085]">움</span>
                  <span className="text-[#E5AD00]">!</span>
                </span>
                <span className="font-display font-bold text-sm sm:text-base text-[#161616]">
                  나의 브랜드 발견소
                </span>
              </div>

              <div className="text-xs font-bold text-[#555B65]">
                <span>{basicInfo.lifeStage || '여성 시민 역량 프로필'}</span>
                <span aria-hidden="true"> · </span>
                <span>1P BRAND SHEET</span>
              </div>
            </div>

            {/* Profile Identity Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-[#DCE1E7]">
              {/* Photo or Character Illustration Frame */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#161616] bg-grid-paper-subtle flex items-center justify-center">
                  {basicInfo.photoUrl ? (
                    <img
                      src={basicInfo.photoUrl}
                      alt={`${basicInfo.name || '사용자'} 프로필 사진`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CardCharacterAvatar
                      variant={diagnosis.primaryType}
                      className="w-24 h-28 mt-3"
                    />
                  )}
                </div>

                {/* Upload Photo Button (Hidden in Print) */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="no-print absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#161616] text-[#FDD116] border-2 border-white shadow-md hover:bg-[#2B2B2B] flex items-center justify-center transition cursor-pointer"
                  title="내 사진 등록하기 (브라우저 미리보기 전용)"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* Name, Type Headline, Slogan, Keywords */}
              <div className="flex-1 text-center sm:text-left">
                <p
                  className="text-xs sm:text-sm font-extrabold mb-1"
                  style={{ color: primaryInfo.themeColor.hex }}
                >
                  {primaryInfo.typeLabel} · {primaryInfo.badge}
                </p>

                <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#161616] tracking-tight mb-3">
                  {basicInfo.name || '이름 미입력'}
                </h1>

                {/* Brand Slogan Callout */}
                <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#DCE1E7] mb-3">
                  <p className="text-base sm:text-lg font-extrabold text-[#161616] leading-snug">
                    “{statement.fullSentence}”
                  </p>
                </div>

                {/* Unboxed Keyword Line */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs sm:text-sm font-extrabold text-[#333840]">
                  {diagnosis.selectedKeywords.slice(0, 3).map((kw, idx) => (
                    <React.Fragment key={kw}>
                      {idx > 0 && (
                        <span className="text-[#B8C0CC]" aria-hidden="true">
                          ·
                        </span>
                      )}
                      <span style={{ color: primaryInfo.themeColor.hex }}>#{kw}</span>
                    </React.Fragment>
                  ))}
                  <span className="text-[#B8C0CC]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#5E6572] font-semibold">
                    보조 강점: {secondary1Info.name}, {secondary2Info.name}
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Column Stationery Body Grid */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#DCE1E7]">
              {/* Left Column */}
              <div className="space-y-7">
                {/* 01. Representative Experience */}
                <div>
                  <h2
                    className="font-display font-bold text-sm sm:text-base pb-2 mb-3 border-b"
                    style={{
                      color: primaryInfo.themeColor.hex,
                      borderColor: `${primaryInfo.themeColor.hex}55`
                    }}
                  >
                    01. 나의 대표 경험
                  </h2>
                  <p className="text-sm sm:text-base text-[#252A32] leading-relaxed font-medium">
                    {profileDetails.representativeExperience}
                  </p>
                </div>

                {/* 02. Core Competencies */}
                <div>
                  <h2
                    className="font-display font-bold text-sm sm:text-base pb-2 mb-3 border-b"
                    style={{
                      color: primaryInfo.themeColor.hex,
                      borderColor: `${primaryInfo.themeColor.hex}55`
                    }}
                  >
                    02. 내가 잘하는 일 (핵심 역량)
                  </h2>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#252A32]">
                    {profileDetails.goodAtList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-snug">
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0 stroke-[3]"
                          style={{ color: primaryInfo.themeColor.hex }}
                        />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-7">
                {/* 03. Target Audience & Services */}
                <div>
                  <h2 className="font-display font-bold text-sm sm:text-base text-[#0D4085] pb-2 mb-3 border-b border-[#0D4085]/35">
                    03. 돕고 싶은 사람 & 활동 분야
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold text-[#68707C] block mb-0.5">
                        주요 도움 대상
                      </span>
                      <p className="text-sm sm:text-base font-extrabold text-[#161616]">
                        {profileDetails.targetAudience}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#68707C] block mb-1.5">
                        제공 가능한 활동 및 서비스
                      </span>
                      <p className="text-sm text-[#2E333B] leading-relaxed font-medium">
                        {profileDetails.activitiesOrServices.join(' · ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 04. 30-Day Routine Checklist */}
                <div>
                  <h2 className="font-display font-bold text-sm sm:text-base text-[#F25235] pb-2 mb-3 border-b border-[#F25235]/35">
                    04. [작심한달] 30일 실행 루틴 3가지
                  </h2>
                  <div className="space-y-2.5">
                    {profileDetails.actionPlans30Days.map((plan, idx) => {
                      const isDone = Boolean(checkedPlans[idx]);
                      return (
                        <div
                          key={idx}
                          onClick={() => togglePlanCheck(idx)}
                          role="checkbox"
                          aria-checked={isDone}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              togglePlanCheck(idx);
                            }
                          }}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-grid-paper-subtle border border-[#DCE1E7] text-xs sm:text-sm font-medium text-[#1E232A] cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
                              isDone
                                ? 'bg-[#161616] border-[#161616] text-[#FDD116]'
                                : 'bg-white border-[#161616]'
                            }`}
                          >
                            {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </span>
                          <span className={`leading-snug ${isDone ? 'line-through text-[#7A828E]' : ''}`}>
                            {plan}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#4A505A]">
              <div className="font-semibold">
                <strong className="text-[#161616]">연락처 · SNS:</strong>{' '}
                {basicInfo.contactOrSns || '추후 기재 예정'}
              </div>

              <div className="font-bold text-[#161616]">
                “경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다.”
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Screen CTA (Hidden in Print) */}
        <div className="no-print max-w-4xl mx-auto mt-8 flex items-center justify-between gap-4">
          <button
            id="profile-back-statement-btn"
            type="button"
            onClick={onEdit}
            className="min-h-[50px] px-6 py-2.5 rounded-full bg-white border-2 border-[#161616] text-[#161616] font-bold text-sm sm:text-base hover:bg-[#FAFAFA] transition cursor-pointer whitespace-nowrap shrink-0"
          >
            슬로건 다시 다듬기
          </button>

          <button
            id="profile-bottom-print-btn"
            type="button"
            onClick={handlePrint}
            className="min-h-[50px] px-8 py-2.5 rounded-full bg-[#161616] text-white font-bold text-sm sm:text-base hover:bg-[#2B2B2B] shadow-md transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.99]"
          >
            <Printer className="w-4 h-4 text-[#FDD116]" />
            <span>인쇄 · PDF로 저장하기</span>
          </button>
        </div>
      </section>
    </div>
  );
};
