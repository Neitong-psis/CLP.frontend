'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { Modal } from '@/components/modals/Modal';

interface LogoutModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export function LogoutModal({ onConfirm, onClose }: LogoutModalProps) {
  return (
    <Modal
      title="Logout Account?"
      onClose={onClose}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button
            variant="ghost"
            className="cursor-pointer rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer rounded-xl bg-[#BA0C2F] px-5 text-white hover:bg-[#BA0C2F]/90"
            onClick={onConfirm}
          >
            Logout
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-500">
          <LogOut className="h-6 w-6" />
        </div>
        <p className="max-w-[280px] text-sm leading-relaxed text-slate-500">
          Are you sure you want to logout from your account?
        </p>
      </div>
    </Modal>
  );
}
