import { cva } from "class-variance-authority";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  title: string;
  type?: "primary" | "secondary";
  fullWidth?: boolean;
};

const buttonStyle = cva(
  "inline-flex items-center justify-center h-12 px-4 py-2 rounded-2xl text-lg font-medium",
  {
    variants: {
      type: {
        primary: "bg-sky-500 text-white",
        secondary: "bg-white border border-sky-500 text-sky-500",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit-content",
      },
    },
    defaultVariants: {
      type: "primary",
      fullWidth: false,
    },
  }
);

const textStyles = cva("text-lg font-medium", {
  variants: {
    type: {
      primary: "text-white",
      secondary: "text-sky-500",
    },
  },
  defaultVariants: {
    type: "primary",
  },
});

export const Button: React.FC<ButtonProps> = ({ title, type, fullWidth }) => {
  return (
    <TouchableOpacity className={buttonStyle({ type, fullWidth })}>
      <Text className={textStyles({ type })}>{title}</Text>
    </TouchableOpacity>
  );
};