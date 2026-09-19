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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 border border-[#ded8cf] shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#fbf2f2] text-[#b32626] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#857b8a] hover:bg-[#f3f0ec] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-[#231d26] mb-2">
          작성된 내용을 모두 초기화할까요?
        </h3>
        <p className="text-sm text-[#6c6271] leading-relaxed mb-6">
          지금까지 작성하신 답변과 프로필 내용이 기기에서 삭제되며, 서비스 소개 화면으로 돌아갑니다.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#d6d0c6] text-[#4d4452] font-semibold text-sm hover:bg-[#faf9f8] transition cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#b32626] text-white font-bold text-sm hover:bg-[#971e1e] transition cursor-pointer shadow-xs"
          >
            초기화하고 다시하기
          </button>
        </div>
      </div>
    </div>
  );
};
