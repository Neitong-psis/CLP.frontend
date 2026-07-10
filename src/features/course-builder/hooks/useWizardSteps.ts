import { useState } from 'react';
import type { UseFormTrigger } from 'react-hook-form';
import type { WizardCourseFormValues } from '../schemas/course.schema';

export function useWizardSteps(
  trigger: UseFormTrigger<WizardCourseFormValues>,
) {
  const [step, setStep] = useState(1);

  const handleNext = async () => {
    if (step === 1) {
      // Validate all required step 1 fields before allowing navigation to step 2
      const valid = await trigger([
        'title',
        'slug',
        'description',
        'category',
        'level',
        'price',
        'duration',
      ]);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  return {
    step,
    setStep,
    handleNext,
    handleBack,
  };
}
