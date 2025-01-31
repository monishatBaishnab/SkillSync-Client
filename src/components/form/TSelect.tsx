import { Select, SelectItem } from "@heroui/select";
import { Controller, useFormContext } from "react-hook-form";

import { TFormElementProps } from "@//types";

export const selectClasses = {
  base: "justify-start data-[has-label=true]:mt-[0px]",
  mainWrapper: "group-data-[has-label=true]:!mt-7",
  helperWrapper: "!mt-4",
  label: "!cursor-text !text-base font-medium !top-[20px]",
  // trigger: [
  //   "!transition !bg-white !border !border-solid_border hover:!border-primary",
  //   "data-[open=true]:!ring data-[open=true]:!ring-2 data-[open=true]:!ring-primary data-[open=true]:!ring-offset-2 data-[open=true]:!border-solid_border",
  // ],
  popoverContent: "!rounded-md p-0",
};

export const selectItemsClasses = {
  base: "py-2.5 px-3 !rounded-md data-[hover=true]:bg-[#F4F4F4] data-[focus-visible=true]:bg-[#F4F4F4] data-[selected=true]:bg-[#F4F4F4] data-[selectable=true]:focus:bg-[#F4F4F4]",
};

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
                classNames={selectClasses}
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
                  <SelectItem key={option.key} classNames={selectItemsClasses}>
                    {option.label}
                  </SelectItem>
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
