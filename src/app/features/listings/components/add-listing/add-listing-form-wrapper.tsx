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
    <section className="grid grid-cols-1 lg:grid-cols-[20rem_1fr_40rem] lg:grid-rows-[20rem] gap-10">
      <div className="space-x-2 flex items-center h-fit">
        <DynamicIcon className="text-gray-300 xl:size-10" name={icon} />
        <h1 className="text-2xl xl:text-4xl font-bold">{title}</h1>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <Card className="p-8">
        {children}
      </Card>
    </section>
  );
}
