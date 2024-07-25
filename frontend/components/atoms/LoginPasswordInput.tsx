"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";

import { EyeIcon, EyeSlashIcon, LockIcon } from "./Icons";

type Size = "sm" | "md" | "lg";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: Size;
}

export default function LoginPasswordInput({
  value,
  onChange,
  size = "sm",
}: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      isRequired
      classNames={{
        input: "group-data-[has-value=true]:text-black",
        inputWrapper:
          "bg-trasparent hover:bg-trasparent border-[#3f3f46] border-[0.5px] text-black data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
        label: "group-data-[filled-within=true]:text-black",
      }}
      color="default"
      endContent={
        <button
          className="focus:outline-none p-0"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <span className="opacity-30">
              <EyeIcon height="22" width="22" />
            </span>
          ) : (
            <span className="opacity-30">
              <EyeSlashIcon height="22" width="22" />
            </span>
          )}
        </button>
      }
      label="Contraseña"
      labelPlacement="outside"
      placeholder="••••••••••••"
      size={size}
      startContent={
        <span className="opacity-30">
          <LockIcon />
        </span>
      }
      type={isVisible ? "text" : "password"}
      value={value}
      onChange={onChange}
    />
  );
}
