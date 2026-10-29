import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs no-print">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-[#161616] shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FDEEEB] text-[#F25235] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#68707C] hover:bg-[#F3F5F8] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-display font-bold text-xl text-[#161616] mb-2">
          작성된 내용을 모두 초기화할까요?
        </h3>
        <p className="text-sm text-[#4A505A] leading-relaxed mb-6">
          지금까지 기록하신 경험 답변과 브랜드 프로필이 브라우저에서 삭제되며, 처음 소개 화면으로 돌아갑니다.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border-2 border-[#161616] text-[#161616] font-bold text-sm hover:bg-[#FAFAFA] transition cursor-pointer whitespace-nowrap shrink-0"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-[#F25235] text-white font-bold text-sm hover:bg-[#D94126] transition cursor-pointer whitespace-nowrap shrink-0"
          >
            초기화하고 다시하기
          </button>
        </div>
      </div>
    </div>
  );
};
