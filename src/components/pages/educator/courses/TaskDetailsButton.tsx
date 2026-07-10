'use client';

import React from 'react';
import { Edit2 } from 'lucide-react';
import { ActionButton } from './ActionButton';

interface TaskDetailsButtonProps {
  onClick?: () => void;
  className?: string;
}

export function TaskDetailsButton({
  onClick,
  className,
}: TaskDetailsButtonProps) {
  return (
    <ActionButton
      label="Task Details"
      icon={Edit2}
      variant="navy"
      onClick={onClick}
      className={className}
    />
  );
}
