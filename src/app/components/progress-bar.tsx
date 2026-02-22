interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 px-5">
        <span className="text-sm text-[#596577]">
          Langkah {currentStep} dari {totalSteps}
        </span>
      </div>
      <div className="w-full h-1 bg-[#E8ECF3]">
        <div
          className="h-full bg-[#C44C55] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
