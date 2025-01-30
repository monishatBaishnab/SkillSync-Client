import { Textarea } from "@heroui/input";
import { useFormContext } from "react-hook-form";

import { TFormElementProps } from "@//types";

const TTextarea = ({
  name,
  label,
  placeholder,
  size = "lg",
  isDisabled = false,
  endContent,
}: TFormElementProps) => {
  const { register } = useFormContext();

  return (
    <div className="w-full">
      <div>
        <Textarea
          {...register(name)}
          fullWidth
          classNames={{ label: "!text-base !text-shark-800" }}
          endContent={endContent}
          isDisabled={isDisabled}
          label={label}
          labelPlacement="outside"
          name={name}
          placeholder={placeholder}
          radius="sm"
          size={size}
        />
      </div>
    </div>
  );
};

export default TTextarea;
