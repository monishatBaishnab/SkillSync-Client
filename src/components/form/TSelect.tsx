import { Select, SelectItem } from "@heroui/select";
import { Controller, useFormContext } from "react-hook-form";

import { TFormElementProps } from "@//types";

const TSelect = ({
  name,
  label,
  placeholder,
  fullWidth = true,
  isDisabled,
  size = "lg",
  selectionMode = "single",
  options,
}: TFormElementProps & {
  selectionMode?: "single" | "multiple";
  options: { key: string; label: string }[];
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
            let selectedKeys = [];

            if (selectionMode == "multiple") {
              selectedKeys = value;
            }
            if (value) {
              if (typeof value === "string") {
                selectedKeys = [value];
              } else {
                selectedKeys = value;
              }
            }

            return (
              <Select
                aria-label={name}
                classNames={{
                  label: "!text-base !text-shark-800",
                  mainWrapper: "group-data-[has-label=true]:!mt-5",
                }}
                errorMessage={error?.message as string}
                fullWidth={fullWidth}
                isDisabled={isDisabled}
                isInvalid={!!error}
                label={label}
                labelPlacement="outside"
                placeholder={placeholder}
                radius="sm"
                selectedKeys={selectedKeys}
                selectionMode={selectionMode}
                size={size}
                onSelectionChange={field.onChange}
              >
                {options.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            );
          }}
        />
      </div>
    </div>
  );
};

export default TSelect;
