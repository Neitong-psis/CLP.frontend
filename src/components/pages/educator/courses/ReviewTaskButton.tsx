'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import { ActionButton } from './ActionButton';

interface ReviewTaskButtonProps {
  onClick?: () => void;
  className?: string;
}

export function ReviewTaskButton({
  onClick,
  className,
}: ReviewTaskButtonProps) {
  return (
    <ActionButton
      label="Review"
      icon={Eye}
      variant="navy"
      onClick={onClick}
      className={className}
    />
  );
}
