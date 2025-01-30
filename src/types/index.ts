import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import { ReactNode } from "react";

export type TLayout = { children: ReactNode };

export type TFormElementProps = {
  name: string;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  fullWidth?: boolean;
  type?: string;
  startContent?: ReactNode;
  endContent?:ReactNode
};

export type TQueryParams = { name: string; value: string }[] | undefined;
