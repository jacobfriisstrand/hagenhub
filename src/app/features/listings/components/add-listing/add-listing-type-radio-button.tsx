import { DynamicIcon } from "@/components/dynamic-icon";
import { FormLabel } from "@/components/ui/form/form";
import { RadioGroupItem } from "@/components/ui/radio-group";

type AddListingTypeRadioButtonProps = {
  value: string;
  formLabel: string;
  icon: any;
  isChecked: boolean;
};

export default function AddListingTypeRadioButton({ value, formLabel, icon, isChecked }: AddListingTypeRadioButtonProps) {
  const id = `radio-${value}`;

  return (
    <div className="group flex flex-col relative justify-between rounded-md w-full aspect-[20/5] xl:aspect-square border border-gray-200 hover:border-gray-300 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-[border,ring] duration-200 xl:w-42">
      <RadioGroupItem
        id={id}
        value={value}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus:outline-none"
        aria-label={formLabel}
      />
      <DynamicIcon
        name={icon}
        className={`m-4 transition-colors duration-200 ${isChecked ? "text-primary" : ""}`}
      />
      <FormLabel htmlFor={id} className="font-normal text-md absolute bottom-0 size-full left-0 right-0 p-4 cursor-pointer items-end">
        {formLabel}
      </FormLabel>
    </div>
  );
}
