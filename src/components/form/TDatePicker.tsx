import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@heroui/date-picker";

import { TFormElementProps } from "@//types";
const TDatePicker = ({ name, label, size = "lg" }: TFormElementProps) => {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            fullWidth
            dateInputClassNames={{ label: "!text-base !text-shark-800" }}
            errorMessage={error?.message}
            isInvalid={!!error}
            label={label}
            labelPlacement="outside"
            radius="sm"
            size={size}
            onChange={(
              newDate: { year?: number; month?: number; day?: number } | null,
            ) => {
              if (newDate) {
                const year = newDate.year ?? new Date().getFullYear();
                const month = (newDate.month ?? 1) - 1;
                const day = newDate.day ?? 1;

                const utcDate = new Date(Date.UTC(year, month, day));

                field.onChange(utcDate.toISOString());
              } else {
                field.onChange(null);
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default TDatePicker;
