import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/modals/Modal';

interface UnsavedWarningProps {
  onDiscard: () => void;
  onKeep: () => void;
}

export function UnsavedWarning({ onDiscard, onKeep }: UnsavedWarningProps) {
  return (
    <Modal
      title="Unsaved changes"
      onClose={onKeep}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            onClick={onKeep}
          >
            Keep editing
          </Button>
          <Button
            variant="destructive"
            className="flex-1 cursor-pointer"
            onClick={onDiscard}
          >
            Discard
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
        </div>
        <p className="text-sm leading-relaxed text-slate-500">
          You have unsaved changes. Are you sure you want to close without
          saving?
        </p>
      </div>
    </Modal>
  );
}
