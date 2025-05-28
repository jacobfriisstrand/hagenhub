import { DynamicIcon } from "@/components/dynamic-icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BagdeProps = {
  text: string | number;
  icon: string;
  className?: string;
  size?: string;
};

export default function ListingBadge({ text, icon, className, size }: BagdeProps) {
  return (
    <Badge asChild variant="outline" className={cn(className, size)}>
      <li>
        <DynamicIcon name={icon} />
        {text}
      </li>
    </Badge>
  );
}
