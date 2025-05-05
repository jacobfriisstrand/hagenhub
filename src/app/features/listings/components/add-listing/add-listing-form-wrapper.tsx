import type { ReactNode } from "react";

import AddListingStepIndicator from "@/app/features/listings/components/add-listing/add-listing-step-indicator";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type FormWrapperProps = {
  children: ReactNode;
  title: string;
  icon: any;
  currentStep: string;
};

export default function FormWrapper({ children, title, icon, currentStep }: FormWrapperProps) {
  return (
    <div className="flex items-center justify-center xl:h-full">
      <section className="grid grid-cols-1 xl:grid-cols-[20rem_1px_30rem] justify-center min-h-full xl:min-h-[60%] gap-5 xl:gap-10 w-full">

        <div className="space-x-2 xl:space-x-5 flex items-center h-fit">
          <DynamicIcon className="text-gray-300 xl:size-10" name={icon} />
          <h1 className="text-2xl xl:text-4xl font-bold">{title}</h1>

        </div>
        <Separator orientation="vertical" className="hidden xl:block" />
        <Card className="p-8 min-h-[20rem] xl:h-[35rem]">
          {children}
        </Card>
        <AddListingStepIndicator className="col-span-1 xl:col-span-3" currentStep={currentStep} />
      </section>
    </div>
  );
}
