import React from 'react';
import { Plus } from 'lucide-react';
import { StrengthTypeKey } from '../types';

interface SpeechBubbleTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SpeechBubbleTitle: React.FC<SpeechBubbleTitleProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="bg-[#161616] text-white px-7 sm:px-9 py-3 sm:py-3.5 rounded-full font-display font-bold text-base sm:text-xl tracking-tight shadow-sm">
        {children}
      </div>
      <svg
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
        className="-mt-[1px] text-[#161616]"
        aria-hidden="true"
      >
        <path d="M9 10L0 0H18L9 10Z" fill="currentColor" />
      </svg>
    </div>
  );
};

/* Hero Trio Character Illustration (Flush bottom-aligned with yellow section) */
export const HeroCharactersIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[520px] mx-auto select-none">
      <svg
        viewBox="0 0 540 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        role="img"
        aria-label="나만의 경험과 강점 플래너를 들고 있는 세 명의 캐릭터 일러스트"
      >
        {/* Floating Stationery Confetti Shapes */}
        {/* Green 'P/B' Tab Shape top-left */}
        <g transform="translate(82, 16) rotate(-14)">
          <path
            d="M0 4C0 1.79 1.79 0 4 0H18C25.73 0 32 6.27 32 14C32 21.73 25.73 28 18 28H12V36C12 38.21 10.21 40 8 40H4C1.79 40 0 38.21 0 36V4Z"
            fill="#00994C"
          />
        </g>

        {/* Coral Tab Shape near left character's raised hand */}
        <g transform="translate(36, 98) rotate(16)">
          <rect x="0" y="0" width="24" height="30" rx="5" fill="#F25235" />
          <circle cx="0" cy="15" r="5" fill="#FFFFFF" />
        </g>

        {/* Sky Blue Clover Shape bottom-right */}
        <g transform="translate(476, 224) rotate(18)">
          <circle cx="10" cy="10" r="9" fill="#63B3ED" />
          <circle cx="24" cy="10" r="9" fill="#63B3ED" />
          <circle cx="10" cy="24" r="9" fill="#63B3ED" />
          <circle cx="24" cy="24" r="9" fill="#63B3ED" />
        </g>

        {/* Sunny Yellow Semicircle top-right */}
        <g transform="translate(458, 56) rotate(-28)">
          <path d="M0 22C0 9.85 9.85 0 22 0C34.15 0 44 9.85 44 22H0Z" fill="#FDD116" />
        </g>

        {/* ================= LEFT CHARACTER (Waving + Coral Notebook) ================= */}
        <g transform="translate(34, 102)">
          {/* Pants / Legs meeting bottom */}
          <path d="M62 212L52 278H86L95 232L104 278H136L128 212H62Z" fill="#2A2E35" />
          {/* Raising Left Arm */}
          <path
            d="M52 138C30 124 18 96 22 66L40 68C38 90 46 108 64 120L52 138Z"
            fill="#3B5998"
          />
          {/* Raised Hand */}
          <circle cx="31" cy="61" r="12" fill="#FFE3D8" />
          <path d="M23 55V45M28 53V42M34 53V43M39 56V48" stroke="#E6B8A6" strokeWidth="2.5" strokeLinecap="round" />

          {/* Navy Cardigan Torso */}
          <path
            d="M48 118C48 106 58 98 70 98H118C130 98 140 106 142 118L148 215H44L48 118Z"
            fill="#35538A"
          />
          {/* White Collar Shirt V-neck */}
          <path d="M78 98L95 126L112 98H78Z" fill="#FFFFFF" />
          <path d="M95 126V215" stroke="#253D6B" strokeWidth="2" />

          {/* Neck & Head */}
          <rect x="86" y="80" width="18" height="22" rx="6" fill="#FFE3D8" />
          <circle cx="95" cy="58" r="32" fill="#FFE3D8" />
          {/* Ears */}
          <circle cx="63" cy="60" r="7" fill="#FFD3C2" />
          <circle cx="127" cy="60" r="7" fill="#FFD3C2" />
          {/* Warm Brown Wavy Short Hair */}
          <path
            d="M61 52C59 30 76 16 97 16C118 16 132 30 130 52C123 42 112 38 98 40C84 42 72 36 61 52Z"
            fill="#8D493A"
          />
          <circle cx="72" cy="28" r="12" fill="#8D493A" />
          <circle cx="116" cy="28" r="11" fill="#8D493A" />
          {/* Rosy Cheeks & Smile */}
          <circle cx="77" cy="64" r="6" fill="#FF9E99" fillOpacity="0.6" />
          <circle cx="113" cy="64" r="6" fill="#FF9E99" fillOpacity="0.6" />
          <circle cx="84" cy="56" r="2.8" fill="#1E1E1E" />
          <circle cx="106" cy="56" r="2.8" fill="#1E1E1E" />
          <path d="M89 66C92 70 98 70 101 66" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" />

          {/* Coral Grid Notebook held in front */}
          <g transform="translate(84, 128) rotate(5)">
            <rect x="0" y="0" width="54" height="68" rx="4" fill="#F25235" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="10" y1="14" x2="44" y2="14" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.5" />
            <line x1="10" y1="26" x2="44" y2="26" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="10" y1="38" x2="44" y2="38" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="10" y1="50" x2="44" y2="50" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="22" y1="14" x2="22" y2="58" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="34" y1="14" x2="34" y2="58" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
          </g>
          {/* Right Hand holding Coral Notebook */}
          <circle cx="87" cy="166" r="10" fill="#FFE3D8" />
        </g>

        {/* ================= RIGHT CHARACTER (Gingham Shirt + Navy Checklist) ================= */}
        <g transform="translate(332, 110)">
          {/* Navy Skirt/Trousers */}
          <path d="M40 202H118L124 270H34L40 202Z" fill="#183A73" />
          <line x1="79" y1="216" x2="79" y2="270" stroke="#0F2752" strokeWidth="2" />

          {/* Mint-Green Gingham Shirt */}
          <path
            d="M34 114C34 102 44 92 56 92H102C114 92 124 102 124 114L130 204H28L34 114Z"
            fill="#68B99A"
          />
          {/* Subtle Grid Lines on Shirt */}
          <path
            d="M48 94V204M68 92V204M88 92V204M108 94V204M32 122H126M30 148H128M29 174H129"
            stroke="#FFFFFF"
            strokeOpacity="0.28"
            strokeWidth="1.5"
          />

          {/* Hair Bun + Dark Hair */}
          <circle cx="54" cy="20" r="14" fill="#1F2933" />
          <path d="M45 27C50 22 59 22 64 27" stroke="#F25235" strokeWidth="4" strokeLinecap="round" />
          <rect x="70" y="76" width="18" height="20" rx="6" fill="#FFE3D8" />
          <circle cx="79" cy="54" r="30" fill="#FFE3D8" />
          <path
            d="M49 52C48 30 62 18 82 18C101 18 112 31 110 52C102 42 90 38 77 40C65 42 56 45 49 52Z"
            fill="#1F2933"
          />
          {/* Face */}
          <circle cx="63" cy="60" r="5.5" fill="#FF9E99" fillOpacity="0.6" />
          <circle cx="95" cy="60" r="5.5" fill="#FF9E99" fillOpacity="0.6" />
          <circle cx="69" cy="52" r="2.6" fill="#1E1E1E" />
          <circle cx="89" cy="52" r="2.6" fill="#1E1E1E" />
          <path d="M75 62C77 65 81 65 84 62" stroke="#1E1E1E" strokeWidth="2.3" strokeLinecap="round" />

          {/* Tilted Navy Daily Checklist Planner */}
          <g transform="translate(88, 108) rotate(14)">
            <rect x="0" y="0" width="52" height="68" rx="4" fill="#0D4085" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="9" y1="13" x2="43" y2="13" stroke="#FDD116" strokeWidth="2.5" />
            <line x1="9" y1="24" x2="43" y2="24" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.3" />
            <line x1="9" y1="33" x2="43" y2="33" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.3" />
            <line x1="9" y1="42" x2="43" y2="42" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.3" />
            <line x1="9" y1="51" x2="43" y2="51" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.3" />
          </g>
          {/* Hands */}
          <circle cx="80" cy="146" r="9.5" fill="#FFE3D8" />
          <circle cx="126" cy="154" r="9.5" fill="#FFE3D8" />
        </g>

        {/* ================= CENTER CHARACTER (Long Dark Hair + Green Planner) ================= */}
        <g transform="translate(178, 72)">
          {/* Long Flowing Black Hair Behind */}
          <path
            d="M42 54C34 86 28 134 38 166C56 174 128 174 146 164C156 132 148 84 140 54C132 22 114 8 92 8C70 8 50 22 42 54Z"
            fill="#1A1D21"
          />

          {/* Warm Grey Wide Trousers */}
          <path d="M50 232H134L140 308H44L50 232Z" fill="#B5B7BA" />
          <line x1="92" y1="248" x2="92" y2="308" stroke="#96999E" strokeWidth="2" />

          {/* Crisp White Sweatshirt / Top */}
          <path
            d="M42 132C42 118 54 108 68 108H116C130 108 142 118 142 132L150 234H34L42 132Z"
            fill="#F7F8FA"
            stroke="#E4E7EC"
            strokeWidth="2"
          />
          {/* Subtle Collar */}
          <path d="M74 108C80 118 104 118 110 108" stroke="#CFD4DC" strokeWidth="3" strokeLinecap="round" />

          {/* Neck & Face */}
          <rect x="82" y="88" width="20" height="24" rx="8" fill="#FFE6DC" />
          <circle cx="92" cy="60" r="34" fill="#FFE6DC" />
          {/* Front Hair Parting */}
          <path
            d="M56 54C58 28 74 16 92 16C110 16 126 28 128 54C116 42 103 35 92 32C81 35 68 42 56 54Z"
            fill="#1A1D21"
          />
          {/* Cheeks, Eyes, Happy Smile */}
          <circle cx="73" cy="66" r="6.5" fill="#FF9892" fillOpacity="0.65" />
          <circle cx="111" cy="66" r="6.5" fill="#FF9892" fillOpacity="0.65" />
          <circle cx="80" cy="57" r="3" fill="#181818" />
          <circle cx="104" cy="57" r="3" fill="#181818" />
          <path d="M85 68C88 73 96 73 99 68" stroke="#181818" strokeWidth="2.6" strokeLinecap="round" />

          {/* Emerald Green Brand Planner Held Center */}
          <g transform="translate(56, 128) rotate(-4)">
            <rect x="0" y="0" width="66" height="86" rx="5" fill="#00994C" stroke="#FFFFFF" strokeWidth="2.5" />
            <rect x="10" y="12" width="26" height="6" rx="2" fill="#FFFFFF" fillOpacity="0.85" />
            <line x1="10" y1="28" x2="56" y2="28" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.5" />
            <line x1="10" y1="44" x2="56" y2="44" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
            <line x1="10" y1="60" x2="56" y2="60" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
            <line x1="10" y1="74" x2="56" y2="74" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
            <line x1="33" y1="28" x2="33" y2="74" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
          </g>

          {/* Left Hand Holding Green Planner */}
          <rect x="44" y="168" width="24" height="15" rx="7.5" fill="#FFE6DC" />

          {/* Right Hand Pointing Up (#1 Gesture!) */}
          <g transform="translate(126, 118)">
            <rect x="8" y="0" width="8" height="22" rx="4" fill="#FFE6DC" />
            <circle cx="12" cy="26" r="11" fill="#FFE6DC" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/* Card Character Bust Avatar (Matches each card / strength type) */
export const CardCharacterAvatar: React.FC<{
  variant: 'coral' | 'green' | 'navy' | StrengthTypeKey;
  className?: string;
}> = ({ variant, className = '' }) => {
  // Map StrengthTypeKey to one of the 3 expressive character archetypes with custom accent color
  let accent = '#F25235';
  let archetype: 'waving' | 'pointing' | 'reading' = 'waving';

  if (variant === 'coral' || variant === 'execution' || variant === 'care') {
    accent = variant === 'care' ? '#E04F5F' : '#F25235';
    archetype = 'waving';
  } else if (variant === 'green' || variant === 'planning' || variant === 'creation') {
    accent = variant === 'creation' ? '#D97706' : '#00994C';
    archetype = 'pointing';
  } else {
    accent = variant === 'relationship' ? '#1479C9' : '#0D4085';
    archetype = 'reading';
  }

  return (
    <div className={`w-24 h-28 sm:w-28 sm:h-32 shrink-0 select-none ${className}`}>
      {archetype === 'waving' && (
        <svg viewBox="0 0 120 132" fill="none" className="w-full h-full overflow-visible">
          {/* Raised Waving Arm */}
          <path d="M28 84C14 72 10 50 14 28L28 30C26 48 30 62 42 72L28 84Z" fill="#35538A" />
          <circle cx="21" cy="24" r="9" fill="#FFE3D8" />
          {/* Torso */}
          <path d="M26 78C26 68 34 62 44 62H82C92 62 100 68 102 78L106 128H22L26 78Z" fill="#35538A" />
          <path d="M52 62L64 82L76 62H52Z" fill="#FFFFFF" />
          {/* Head */}
          <circle cx="64" cy="36" r="24" fill="#FFE3D8" />
          <path d="M39 32C38 14 50 4 66 4C82 4 92 15 90 32C84 24 75 21 65 22C54 24 46 20 39 32Z" fill="#8D493A" />
          <circle cx="51" cy="40" r="4.5" fill="#FF9E99" fillOpacity="0.65" />
          <circle cx="77" cy="40" r="4.5" fill="#FF9E99" fillOpacity="0.65" />
          <circle cx="56" cy="34" r="2.2" fill="#181818" />
          <circle cx="72" cy="34" r="2.2" fill="#181818" />
          <path d="M60 42C62 45 66 45 68 42" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
          {/* Notebook */}
          <g transform="translate(54, 78) rotate(6)">
            <rect width="38" height="46" rx="3" fill={accent} stroke="#FFFFFF" strokeWidth="1.8" />
            <line x1="7" y1="12" x2="31" y2="12" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.5" />
            <line x1="7" y1="22" x2="31" y2="22" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
            <line x1="7" y1="32" x2="31" y2="32" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
          </g>
          <circle cx="55" cy="104" r="7.5" fill="#FFE3D8" />
        </svg>
      )}

      {archetype === 'pointing' && (
        <svg viewBox="0 0 120 132" fill="none" className="w-full h-full overflow-visible">
          {/* Long Dark Hair */}
          <path d="M28 38C22 62 20 96 28 116H94C102 96 100 62 94 38C88 14 76 4 61 4C46 4 34 14 28 38Z" fill="#1A1D21" />
          {/* White Top */}
          <path d="M24 80C24 70 32 64 42 64H80C90 64 98 70 100 80L104 128H20L24 80Z" fill="#F4F5F7" stroke="#E2E5EC" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="61" cy="38" r="24" fill="#FFE6DC" />
          <path d="M36 34C38 15 49 8 61 8C73 8 84 15 86 34C78 25 69 21 61 19C53 21 44 25 36 34Z" fill="#1A1D21" />
          <circle cx="48" cy="42" r="4.5" fill="#FF9892" fillOpacity="0.65" />
          <circle cx="74" cy="42" r="4.5" fill="#FF9892" fillOpacity="0.65" />
          <circle cx="53" cy="36" r="2.2" fill="#181818" />
          <circle cx="69" cy="36" r="2.2" fill="#181818" />
          <path d="M57 44C59 47 63 47 65 44" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
          {/* Planner */}
          <g transform="translate(34, 76) rotate(-4)">
            <rect width="42" height="50" rx="3.5" fill={accent} stroke="#FFFFFF" strokeWidth="1.8" />
            <rect x="7" y="8" width="18" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
            <line x1="7" y1="20" x2="35" y2="20" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.2" />
            <line x1="7" y1="30" x2="35" y2="30" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.2" />
            <line x1="7" y1="40" x2="35" y2="40" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.2" />
          </g>
          {/* Pointing Finger */}
          <rect x="88" y="68" width="6" height="16" rx="3" fill="#FFE6DC" />
          <circle cx="91" cy="87" r="8" fill="#FFE6DC" />
          <rect x="26" y="100" width="16" height="11" rx="5.5" fill="#FFE6DC" />
        </svg>
      )}

      {archetype === 'reading' && (
        <svg viewBox="0 0 120 132" fill="none" className="w-full h-full overflow-visible">
          {/* Hair Bun */}
          <circle cx="40" cy="12" r="11" fill="#1F2933" />
          <path d="M33 17C37 13 44 13 48 17" stroke="#F25235" strokeWidth="3" strokeLinecap="round" />
          {/* Gingham Mint Top */}
          <path d="M24 80C24 70 32 64 42 64H78C88 64 96 70 98 80L102 128H20L24 80Z" fill="#68B99A" />
          <path d="M40 64V128M60 64V128M80 64V128M22 86H100M21 108H101" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.3" />
          {/* Head */}
          <circle cx="60" cy="38" r="23" fill="#FFE3D8" />
          <path d="M37 36C36 19 47 10 62 10C77 10 86 20 84 36C77 28 68 25 58 27C49 28 42 31 37 36Z" fill="#1F2933" />
          <circle cx="48" cy="42" r="4.5" fill="#FF9E99" fillOpacity="0.6" />
          <circle cx="72" cy="42" r="4.5" fill="#FF9E99" fillOpacity="0.6" />
          <circle cx="52" cy="36" r="2.2" fill="#181818" />
          <circle cx="68" cy="36" r="2.2" fill="#181818" />
          <path d="M56 44C58 47 62 47 64 44" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
          {/* Navy Daily Pad */}
          <g transform="translate(62, 72) rotate(13)">
            <rect width="38" height="48" rx="3" fill={accent} stroke="#FFFFFF" strokeWidth="1.8" />
            <line x1="7" y1="10" x2="31" y2="10" stroke="#FDD116" strokeWidth="2" />
            <line x1="7" y1="19" x2="31" y2="19" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.2" />
            <line x1="7" y1="27" x2="31" y2="27" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.2" />
            <line x1="7" y1="35" x2="31" y2="35" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.2" />
          </g>
          <circle cx="56" cy="100" r="7" fill="#FFE3D8" />
        </svg>
      )}
    </div>
  );
};

/* Stationery Flat-Lay Showcase Visual (Right panel inside split color-block cards) */
export const StationeryFlatLay: React.FC<{
  variant: 'coral' | 'green' | 'navy';
  actionLabel: string;
}> = ({ variant, actionLabel }) => {
  return (
    <div
      className="relative w-full aspect-square max-w-[270px] mx-auto rounded-xs overflow-hidden shadow-md group-hover:scale-[1.015] transition-transform duration-200"
      aria-label={actionLabel}
    >
      {variant === 'coral' && (
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full block">
          {/* Warm Marigold Desk Background */}
          <rect width="260" height="260" fill="#F6AC1D" />
          {/* Top White Weekly Strip Pad */}
          <g transform="translate(88, 36) rotate(-14)">
            <rect width="108" height="36" rx="2" fill="#FAF7F0" stroke="#E25438" strokeWidth="2" />
            <rect width="108" height="7" fill="#E25438" />
            <line x1="27" y1="7" x2="27" y2="36" stroke="#E8CFC4" strokeWidth="1" />
            <line x1="54" y1="7" x2="54" y2="36" stroke="#E8CFC4" strokeWidth="1" />
            <line x1="81" y1="7" x2="81" y2="36" stroke="#E8CFC4" strokeWidth="1" />
          </g>
          {/* Red Stamp & Ink Cube */}
          <rect x="38" y="88" width="26" height="26" rx="4" fill="#D92B2B" />
          <circle cx="51" cy="101" r="6" stroke="#FCA5A5" strokeWidth="1.5" />
          <path d="M18 74L32 82L26 92L12 84L18 74Z" fill="#B91C1C" />
          {/* White Lined Memo Pad */}
          <g transform="translate(64, 128) rotate(-32)">
            <rect width="58" height="82" rx="2" fill="#F8F6F0" />
            <rect width="58" height="8" fill="#E25438" />
            <line x1="8" y1="22" x2="50" y2="22" stroke="#E5E0D5" strokeWidth="1.5" />
            <line x1="8" y1="34" x2="50" y2="34" stroke="#E5E0D5" strokeWidth="1.5" />
            <line x1="8" y1="46" x2="50" y2="46" stroke="#E5E0D5" strokeWidth="1.5" />
            <line x1="8" y1="58" x2="50" y2="58" stroke="#E5E0D5" strokeWidth="1.5" />
          </g>
          {/* Main Coral Monthly/Experience Grid Planner */}
          <g transform="translate(114, 108) rotate(-26)">
            <rect width="96" height="122" rx="3" fill="#EA5234" />
            <text x="10" y="16" fill="#FFFFFF" fontSize="7" fontWeight="700">
              [ EXPERIENCE ]
            </text>
            <rect x="8" y="22" width="80" height="90" stroke="#F89C88" strokeWidth="1" />
            <line x1="8" y1="44" x2="88" y2="44" stroke="#F89C88" strokeWidth="0.9" />
            <line x1="8" y1="66" x2="88" y2="66" stroke="#F89C88" strokeWidth="0.9" />
            <line x1="8" y1="88" x2="88" y2="88" stroke="#F89C88" strokeWidth="0.9" />
            <line x1="34" y1="22" x2="34" y2="112" stroke="#F89C88" strokeWidth="0.9" />
            <line x1="61" y1="22" x2="61" y2="112" stroke="#F89C88" strokeWidth="0.9" />
          </g>
          {/* Red Pencil */}
          <g transform="translate(58, 198) rotate(24)">
            <rect width="92" height="5" rx="2" fill="#B91C1C" />
            <polygon points="92,0 100,2.5 92,5" fill="#FDE68A" />
          </g>
        </svg>
      )}

      {variant === 'green' && (
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full block">
          {/* Soft Cream Stationery Desk */}
          <rect width="260" height="260" fill="#F3F1E8" />
          {/* Yellow Binder Clip top-left */}
          <g transform="translate(18, 18) rotate(-20)">
            <rect width="26" height="18" rx="3" fill="#EAB308" />
            <rect x="5" y="18" width="16" height="10" rx="2" stroke="#EAB308" strokeWidth="2.5" />
          </g>
          {/* Washi Tape Accent */}
          <g transform="translate(20, 68) rotate(-38)">
            <rect width="58" height="11" rx="2" fill="#FFFFFF" stroke="#D6D3C9" strokeWidth="1" />
            <circle cx="12" cy="5.5" r="2.5" fill="#00994C" />
            <circle cx="28" cy="5.5" r="2.5" fill="#F25235" />
            <circle cx="44" cy="5.5" r="2.5" fill="#0D4085" />
          </g>
          {/* Main Sunny Yellow Strength Structure Planner */}
          <g transform="translate(56, 62) rotate(-28)">
            <rect width="118" height="156" rx="3" fill="#F3CA20" />
            <text x="12" y="18" fill="#FFFFFF" fontSize="8" fontWeight="700">
              [ STRENGTH MAP ]
            </text>
            <line x1="12" y1="26" x2="106" y2="26" stroke="#F9E488" strokeWidth="1.2" />
            <line x1="12" y1="68" x2="106" y2="68" stroke="#F9E488" strokeWidth="1" />
            <line x1="12" y1="110" x2="106" y2="110" stroke="#F9E488" strokeWidth="1" />
            <line x1="43" y1="26" x2="43" y2="144" stroke="#F9E488" strokeWidth="1" />
            <line x1="75" y1="26" x2="75" y2="144" stroke="#F9E488" strokeWidth="1" />
          </g>
          {/* Side Checklist Note */}
          <g transform="translate(218, 96) rotate(-6)">
            <rect width="52" height="116" rx="2" fill="#FFFFFF" stroke="#E5E2D9" strokeWidth="1.5" />
            <rect x="4" y="6" width="44" height="6" fill="#F3CA20" />
          </g>
          {/* Yellow Pencil */}
          <g transform="translate(38, 162) rotate(50)">
            <rect width="108" height="5.5" rx="2" fill="#EAB308" />
            <polygon points="108,0 116,2.75 108,5.5" fill="#FEF08A" />
          </g>
        </svg>
      )}

      {variant === 'navy' && (
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full block">
          {/* Crisp Cool Desk Background */}
          <rect width="260" height="260" fill="#EAEEF3" />
          {/* Sticker Top Left */}
          <g transform="translate(24, 34) rotate(-16)">
            <rect width="58" height="20" rx="10" fill="#183A73" />
            <text x="10" y="13" fill="#FFFFFF" fontSize="8" fontWeight="800">
              PERFECT
            </text>
          </g>
          {/* Left Navy Checklist Pad */}
          <g transform="translate(52, 82) rotate(-12)">
            <rect width="74" height="136" rx="2.5" fill="#1A355B" />
            <text x="8" y="15" fill="#FFFFFF" fontSize="6.5" fontWeight="700">
              [ 30-DAY PLAN ]
            </text>
            {Array.from({ length: 8 }).map((_, idx) => (
              <line
                key={idx}
                x1="8"
                y1={26 + idx * 13}
                x2="66"
                y2={26 + idx * 13}
                stroke="#5A769E"
                strokeWidth="0.9"
              />
            ))}
          </g>
          {/* Overlapping Dark Charcoal/Navy 1-Page Profile Sheet */}
          <g transform="translate(116, 56) rotate(8)">
            <rect width="84" height="148" rx="2.5" fill="#1E2530" />
            <text x="9" y="16" fill="#FDD116" fontSize="7" fontWeight="800">
              [ 1P PROFILE ]
            </text>
            {Array.from({ length: 9 }).map((_, idx) => (
              <line
                key={idx}
                x1="9"
                y1={28 + idx * 13}
                x2="75"
                y2={28 + idx * 13}
                stroke="#4B5563"
                strokeWidth="0.9"
              />
            ))}
            <line x1="26" y1="22" x2="26" y2="138" stroke="#4B5563" strokeWidth="0.8" />
          </g>
          {/* Black Pen bottom-left */}
          <g transform="translate(8, 182) rotate(54)">
            <rect width="90" height="6" rx="3" fill="#181818" />
          </g>
        </svg>
      )}

      {/* Signature Crisp Black '+' Square Button bottom-right */}
      <div className="absolute bottom-3 right-3 w-9 h-9 bg-[#141414] text-white flex items-center justify-center rounded-xs shadow-sm group-hover:bg-[#2b2b2b] transition-colors">
        <Plus className="w-5 h-5 stroke-[2.2]" />
      </div>
    </div>
  );
};
