"use client";

import { Input } from "@mui/base";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface SimpleInputProps {
  name: string;
  placeholder?: string;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  type?: string;
  disabled?: boolean;
  defaultValue?: string | null;
  styles?: string;
  variant?: "rectangle" | "rounded";
  required?: boolean;
  value?: string;
  maxLength?: number;
}

export default function SimpleInput({
  name,
  placeholder,
  onBlur,
  onChange,
  error,
  disabled = false,
  defaultValue,
  required,
  value,
  type = "text",
  styles,
  variant = "rectangle",
  maxLength = undefined,
}: SimpleInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const isRectangleVariant = variant === "rectangle";
  return (
    <Input
      color="primary"
      placeholder={placeholder}
      id={name}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      error={error}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={value}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      endAdornment={
        type === "password" ? (
          <InputAdornment position="start" className="absolute right-4 top-12">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        ) : null
      }
      slotProps={{
        input: {
          maxLength: maxLength,
          className: `w-full rounded-${isRectangleVariant ? "lg" : "full"} p-${
            isRectangleVariant ? "2.5" : "4"
          } focus:outline-[#29ABE2] disabled:bg-[#E7E7E7] disabled:text-[#676D73] ${styles} ${
            isRectangleVariant ? "" : "border border-[#EAEAEF]"
          }`,
        },
      }}
    />
  );
}
