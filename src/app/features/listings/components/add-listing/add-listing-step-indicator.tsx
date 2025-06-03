import { DynamicIcon } from "@/components/dynamic-icon";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  icon: string;
  path: string;
};

const steps: Step[] = [
  { title: "General Info", icon: "pencil", path: "/add-listing/general-info" },
  { title: "Type", icon: "house", path: "/add-listing/type" },
  { title: "Bedrooms", icon: "bed", path: "/add-listing/bedrooms" },
  { title: "Guests", icon: "users", path: "/add-listing/guests" },
  { title: "Location", icon: "map-pin", path: "/add-listing/location" },
  { title: "Images", icon: "images", path: "/add-listing/images" },
];

type AddListingStepIndicatorProps = {
  currentStep: string;
  className?: string;
};

export default function AddListingStepIndicator({ currentStep, className }: AddListingStepIndicatorProps) {
  const currentStepIndex = steps.findIndex(step => step.path === currentStep);

  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isUpcoming = index > currentStepIndex;

        return (
          <div key={step.path} className="flex flex-col items-center gap-4 divide-gray-200">
            <div
              className={cn(
                "flex items-center justify-center size-7 rounded-full border-2",
                isCompleted && "bg-primary border-primary",
                isCurrent && "border-primary",
                isUpcoming && "border-gray-300",
              )}
            >
              <DynamicIcon
                name={step.icon}
                className={cn(
                  "size-4",
                  isCompleted && "text-white",
                  isCurrent && "text-primary",
                  isUpcoming && "text-gray-300",
                )}
              />
            </div>
            <span
              className={cn(
                "text-[0.6rem] xl:text-sm font-medium",
                isCompleted && "text-primary",
                isCurrent && "text-primary",
                isUpcoming && "text-gray-400",
              )}
            >
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
