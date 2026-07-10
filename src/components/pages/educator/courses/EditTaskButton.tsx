'use client';

import React from 'react';
import { Edit2 } from 'lucide-react';
import { ActionButton } from './ActionButton';

interface EditTaskButtonProps {
  onClick?: () => void;
  className?: string;
}

export function EditTaskButton({ onClick, className }: EditTaskButtonProps) {
  return (
    <ActionButton
      label="Edit"
      icon={Edit2}
      variant="gray"
      onClick={onClick}
      className={className}
    />
  );
}
