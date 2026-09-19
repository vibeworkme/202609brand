import React, { useRef } from 'react';
import {
  Printer,
  Edit,
  RotateCcw,
  Upload,
  Camera,
  CheckCircle,
  Copy,
  Check,
  Share2,
  Mail,
  User,
  Heart,
  Target,
  Sparkles,
  Calendar,
  Compass
} from 'lucide-react';
import {
  AppState,
  BrandStatementComponents,
  DiagnosisResult,
  ProfileDetails,
  UserBasicInfo
} from '../types';
import { STRENGTH_TYPES } from '../data/strengthTypes';

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
  setProfileDetails,
  onEdit,
  onReset
}) => {
  const [copied, setCopied] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const primaryInfo = STRENGTH_TYPES[diagnosis.primaryType];
  const secondary1Info = STRENGTH_TYPES[diagnosis.secondaryTypes[0]];
  const secondary2Info = STRENGTH_TYPES[diagnosis.secondaryTypes[1]];

  // Profile image upload (browser local preview only, no server upload)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image size (e.g. < 4MB)
      if (file.size > 4 * 1024 * 1024) {
        alert('이미지 파일 크기는 4MB 이하여야 합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setBasicInfo((prev) => ({
          ...prev,
          photoUrl: base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
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
    <div className="w-full py-8 sm:py-12 px-4 sm:px-6">
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 no-print bg-white p-4 sm:p-5 rounded-2xl border border-[#e4ded5] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#261f2a]">
            1페이지 퍼스널 브랜드 프로필
          </h2>
          <p className="text-xs sm:text-sm text-[#736877]">
            인쇄하거나 PDF로 저장하여 서류, 포트폴리오, SNS 프로필로 활용해보세요.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="profile-edit-btn"
            onClick={onEdit}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#d2cbc2] text-[#423947] font-bold text-sm hover:bg-[#f6f4f1] transition cursor-pointer"
          >
            <Edit className="w-4 h-4 text-[#542344]" />
            <span>프로필 수정</span>
          </button>

          <button
            id="profile-copy-btn"
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#d2cbc2] text-[#423947] font-bold text-sm hover:bg-[#f6f4f1] transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#2d7a38]" />
                <span className="text-[#2d7a38]">복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#542344]" />
                <span>텍스트 복사</span>
              </>
            )}
          </button>

          <button
            id="profile-print-btn"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#542344] text-white font-bold text-sm hover:bg-[#431936] shadow-xs transition cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>인쇄 · PDF 저장</span>
          </button>

          <button
            id="profile-reset-btn"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[#786e7c] hover:text-[#542344] hover:bg-[#f7f4f1] transition cursor-pointer text-sm font-medium"
            title="처음부터 다시하기"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">다시하기</span>
          </button>
        </div>
      </div>

      {/* 
        A4 Profile Sheet Card 
        Carefully tuned for A4 proportions & Print CSS
      */}
      <div className="profile-a4-sheet max-w-4xl mx-auto bg-white rounded-3xl p-7 sm:p-12 border border-[#dcd7cd] shadow-md relative">
        {/* Subtle Watermark/Header on top */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-[#542344] mb-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#542344] text-white flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm sm:text-base text-[#241c26] tracking-tight">
              나의 브랜드 발견소
            </span>
            <span className="text-xs text-[#7e7383] hidden sm:inline">
              | 퍼스널 브랜드 프로필
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-[#542344] bg-[#f8eff8] px-2.5 py-1 rounded-md border border-[#edd7ec]">
              {basicInfo.lifeStage || '여성 시민 역량 프로필'}
            </span>
          </div>
        </div>

        {/* Header Block: Photo + Name + Brand Sentence + Keywords */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pb-8 border-b border-[#eeeae2]">
          {/* Profile Photo (Local Browser Preview) */}
          <div className="relative group shrink-0 self-center sm:self-auto">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#542344] bg-[#f7f5f2] flex items-center justify-center shadow-xs">
              {basicInfo.photoUrl ? (
                <img
                  src={basicInfo.photoUrl}
                  alt={basicInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-3 text-[#958a99]">
                  <User className="w-12 h-12 mx-auto mb-1 text-[#b5abb8]" />
                  <span className="text-[11px] font-bold block text-[#6d6172]">사진 등록</span>
                </div>
              )}
            </div>

            {/* Photo change overlay trigger (no-print) */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="no-print absolute bottom-1 right-1 p-2 rounded-full bg-[#542344] text-white shadow-md hover:bg-[#3f1632] transition cursor-pointer"
              title="사진 업로드 / 변경"
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

          {/* Name & Headline & Badges */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#221c25] tracking-tight">
                {basicInfo.name || '이름 없음'}
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#542344] text-white text-xs font-bold tracking-wide">
                {primaryInfo.badge}
              </span>
              <span className="text-xs font-semibold text-[#665a6b] bg-[#f5f2ee] px-2.5 py-1 rounded-full border border-[#e4ded6]">
                대표 강점: {primaryInfo.name}
              </span>
            </div>

            {/* Brand One-Liner Slogan */}
            <div className="my-3 p-3.5 rounded-xl bg-[#faf7f9] border border-[#f0e3ee]">
              <p className="text-base sm:text-lg font-extrabold text-[#471939] leading-snug">
                “{statement.fullSentence}”
              </p>
            </div>

            {/* Brand Keywords (3 items) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-2">
              {diagnosis.selectedKeywords.slice(0, 3).map((kw) => (
                <span
                  key={kw}
                  className="px-2.5 py-1 rounded-md bg-[#f0ebe3] text-[#473e4b] text-xs font-bold border border-[#dfd7cc]"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Content Body: 2-Column Grid */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-7 border-b border-[#eeeae2]">
          {/* Left Column: Experience & Competencies */}
          <div className="space-y-6">
            {/* 1. Representative Experience */}
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#542344] uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <h3>대표 경험</h3>
              </div>
              <div className="p-4 rounded-xl bg-[#faf9f7] border border-[#e6e2da] text-sm sm:text-base text-[#39313d] leading-relaxed font-medium">
                {profileDetails.representativeExperience}
              </div>
            </div>

            {/* 2. What I Do Well (Core Competencies) */}
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#542344] uppercase tracking-wider mb-2">
                <CheckCircle className="w-4 h-4" />
                <h3>내가 잘하는 일 (핵심 역량)</h3>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-[#3e3542]">
                {profileDetails.goodAtList.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-[#faf9f8] border border-[#e8e4db]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#542344] mt-2 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Audience, Services, Action Plans */}
          <div className="space-y-6">
            {/* 3. Target Audience & Services */}
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#542344] uppercase tracking-wider mb-2">
                <Target className="w-4 h-4" />
                <h3>돕고 싶은 사람 & 제공할 수 있는 활동</h3>
              </div>
              <div className="p-4 rounded-xl bg-[#faf9f7] border border-[#e6e2da] space-y-3">
                <div>
                  <span className="text-xs font-bold text-[#7a6f7e] block">
                    주요 도움 대상
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#2e2632]">
                    {profileDetails.targetAudience}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#eeeae2]">
                  <span className="text-xs font-bold text-[#7a6f7e] block mb-1.5">
                    제공 가능한 활동 및 서비스
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profileDetails.activitiesOrServices.map((act, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white border border-[#ded9cf] text-xs font-semibold text-[#443b48]"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Action Plans for 30 Days */}
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#542344] uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4" />
                <h3>앞으로 30일 동안 실행할 일 3개</h3>
              </div>
              <div className="space-y-2">
                {profileDetails.actionPlans30Days.map((plan, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#faf9f8] border border-[#e8e4dc] text-xs sm:text-sm font-medium text-[#3b323f]"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#542344] text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{plan}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Block: Contact / SNS + Official Bottom Slogan */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#6a606f]">
          <div className="flex items-center gap-2 font-medium">
            <Mail className="w-4 h-4 text-[#542344]" />
            <span>
              <strong>연락처 / SNS:</strong>{' '}
              {basicInfo.contactOrSns || '추후 기재 예정'}
            </span>
          </div>

          <div className="text-center sm:text-right font-semibold text-[#542344]">
            “경력의 공백이 아니라, 아직 이름 붙이지 않은 경험입니다.”
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation for Quick actions (no-print) */}
      <div className="max-w-4xl mx-auto mt-8 flex items-center justify-between no-print">
        <button
          id="profile-back-statement-btn"
          onClick={onEdit}
          className="min-h-[48px] px-6 py-2.5 rounded-xl border border-[#d2ccc3] text-[#4d4452] font-bold text-sm sm:text-base hover:bg-white transition flex items-center gap-2 cursor-pointer"
        >
          <span>브랜드 문장 다시 수정하기</span>
        </button>

        <button
          id="profile-bottom-print-btn"
          onClick={handlePrint}
          className="min-h-[48px] px-8 py-2.5 rounded-xl bg-[#542344] text-white font-bold text-sm sm:text-base hover:bg-[#431936] transition flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>인쇄 · PDF로 저장</span>
        </button>
      </div>
    </div>
  );
};
