import type { ControllerRenderProps } from "react-hook-form";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";

type NumberInputProps = {
  field: ControllerRenderProps<any, any>;
  min?: number;
  max?: number;
  readOnly?: boolean;
};

export function NumberInput({ field, min = 0, max = Infinity, readOnly = false }: NumberInputProps) {
  const increment = () => {
    const newValue = Math.min(field.value + 1, max);
    field.onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(field.value - 1, min);
    field.onChange(newValue);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={decrement}
        disabled={field.value <= min || readOnly}
        className="rounded-r-none h-full hover:shadow-none"
        aria-label="Decrease value"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="text"
        {...field}
        value={field.value}
        readOnly
        className="h-10 w-20 cursor-default rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none focus:ring-none focus:ring-offset-0 focus:border-none border-r-0 border-l-0"
        aria-label="Number value"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={increment}
        disabled={field.value >= max || readOnly}
        className="rounded-l-none h-full hover:shadow-none"
        aria-label="Increase value"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
