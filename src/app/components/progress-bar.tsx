interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 px-5">
        <span className="text-sm text-[#6B7684]">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full h-1 bg-[#E9EEF5]">
        <div
          className="h-full bg-[#5C6F8F] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
