"use client";
import { Input } from "@heroui/input";
import { Controller, useFormContext } from "react-hook-form";

import { TFormElementProps } from "@//types";

const TInput = ({
  name,
  isDisabled = false,
  label,
  placeholder,
  size = "lg",
  type = "string",
  variant,
  startContent,
}: TFormElementProps & {
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
}) => {
  const { control } = useFormContext();

  return (
    <div className="block w-full">
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => {
            const value = field?.value;

            return (
              <Input
                fullWidth
                errorMessage={error?.message as string}
                isDisabled={isDisabled}
                isInvalid={!!error}
                label={label}
                labelPlacement="outside"
                placeholder={placeholder}
                radius="sm"
                size={size}
                startContent={startContent}
                type={type}
                value={value}
                variant={variant}
                onChange={(e) => field.onChange(e)}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default TInput;
