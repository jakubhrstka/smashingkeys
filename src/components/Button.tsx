import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary";
}

export const getClassNames = (variant: string): string => {
  const defaultClassNames = "text-text font-semibold px-6 py-2 rounded-md";

  switch (variant) {
    case "primary":
      return cn(
        defaultClassNames,
        "bg-tertiary transition-colors hover:bg-text hover:text-tertiary"
      );

    default:
      return defaultClassNames;
  }
};

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(className, getClassNames(variant))} {...props}>
      {children}
    </button>
  );
};
