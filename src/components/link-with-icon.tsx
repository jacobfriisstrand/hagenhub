import Link from "next/link";

import { DynamicIcon } from "@/components/dynamic-icon";
import { cn } from "@/lib/utils";

type LinkWithIconProps = {
  href: string;
  icon: string;
  className?: string;
  children: React.ReactNode;
};

export default function LinkWithIcon({ href, icon, className, children }: LinkWithIconProps) {
  return (
    <Link href={href} className={cn("w-full flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900", className)}>
      <DynamicIcon name={icon} />
      {children}
    </Link>
  );
}
