import type { ReactNode } from "react";

import { DynamicIcon } from "@/components/dynamic-icon";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type FormWrapperProps = {
  children: ReactNode;
  title: string;
  icon: any;
};

export default function FormWrapper({ children, title, icon }: FormWrapperProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <section className="grid grid-cols-1 lg:grid-cols-[20rem_1px_40rem] justify-center min-h-full lg:min-h-[60%] gap-5 lg:gap-10 w-full">
        <div className="space-x-2 lg:space-x-5 flex items-center h-fit">
          <DynamicIcon className="text-gray-300 xl:size-10" name={icon} />
          <h1 className="text-2xl xl:text-4xl font-bold">{title}</h1>
        </div>
        <Separator orientation="vertical" className="hidden lg:block" />
        <Card className="p-8 lg:aspect-auto min-h-fit">
          {children}
        </Card>
      </section>
    </div>
  );
}
