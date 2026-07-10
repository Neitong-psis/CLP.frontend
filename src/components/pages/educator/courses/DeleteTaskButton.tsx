'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { ActionButton } from './ActionButton';

interface DeleteTaskButtonProps {
  onClick?: () => void;
  className?: string;
}

export function DeleteTaskButton({
  onClick,
  className,
}: DeleteTaskButtonProps) {
  return (
    <ActionButton
      label="Delete"
      icon={Trash2}
      variant="danger-text"
      onClick={onClick}
      className={className}
    />
  );
}
