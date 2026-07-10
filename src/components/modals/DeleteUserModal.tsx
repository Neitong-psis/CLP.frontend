'use client';

import React from 'react';
import { Button } from '@/components/ui/button/Button';
import { Modal } from './Modal';

interface DeleteUserModalProps {
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteUserModal({
  name,
  onConfirm,
  onClose,
}: DeleteUserModalProps) {
  return (
    <Modal
      title="Delete user?"
      onClose={onClose}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button
            variant="ghost"
            className="rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            className="rounded-xl bg-rose-500 px-5 text-white hover:bg-rose-600"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate-500">
        <span className="font-semibold text-slate-800">
          &ldquo;{name}&rdquo;
        </span>{' '}
        will be permanently removed. This action cannot be undone.
      </p>
    </Modal>
  );
}
