import { useState, useCallback, useEffect } from "react";
import { Input } from "./input";
import { z } from "zod";
import { InputHTMLAttributes } from "react";

interface ValidatedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  name: string;
  wasSubmitted: boolean;
  fieldSchema: z.ZodTypeAny;
  defaultValue?: string | number;
  onValidationChange?: (isValid: boolean) => void;
}

const ValidatedInput = ({ name, wasSubmitted, fieldSchema, defaultValue, onChange, onBlur, onValidationChange, ...props }: ValidatedInputProps) => {
  const [value, setValue] = useState(defaultValue?.toString() || "");
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue.toString());
    }
  }, [defaultValue]);

  const validate = useCallback(() => {
    const validationResult = fieldSchema.safeParse(value);
    const valid = validationResult.success;
    setIsValid(valid);
    return valid;
  }, [fieldSchema, value]);

  useEffect(() => {
    const validationResult = validate();
    onValidationChange?.(validationResult);
  }, [value, validate, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setTouched(false);
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    validate();
    onBlur?.(e);
  };

  const showError = (wasSubmitted || touched) && value.length > 0 && !isValid;

  return (
    <div className="relative">
      <Input id={name} name={name} value={value} onChange={handleChange} onBlur={handleBlur} className={showError ? "border-destructive" : ""} aria-invalid={showError} {...props} />
    </div>
  );
};

export { ValidatedInput };
