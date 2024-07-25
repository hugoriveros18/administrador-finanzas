"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { EmailIcon, RigthArrowIcon } from "@/components/atoms/Icons";
import LoginPasswordInput from "@/components/atoms/LoginPasswordInput";
import { LOGIN_USUARIO } from "@/graphql/usuario/usuario.mutation";

interface FormValue {
  email: string;
  password: string;
}

const INITIAL_FORM_VALUES: FormValue = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [loginUsuario] = useMutation(LOGIN_USUARIO);
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValue>(INITIAL_FORM_VALUES);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUsuario({
        variables: formValues,
      });
      setTimeout(() => {
        router.refresh();
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);
        setErrorMessages(
          error.graphQLErrors?.[0]?.message || "Error al iniciar sesión",
        );
      }, 2000);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 w-full max-w-[350px] mx-auto"
      onSubmit={handleFormSubmit}
    >
      <Input
        isRequired
        classNames={{
          input: "group-data-[has-value=true]:text-black",
          inputWrapper:
            "bg-trasparent hover:bg-trasparent border-[#3f3f46] border-[0.5px] text-black data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
          label: "group-data-[filled-within=true]:text-black",
        }}
        color="default"
        label="Correo electrónico"
        labelPlacement="outside"
        placeholder="correo@ejemplo.com"
        size="md"
        startContent={
          <span className="opacity-30">
            <EmailIcon />
          </span>
        }
        type="email"
        value={formValues.email}
        onChange={(e) => {
          setFormValues({
            ...formValues,
            email: e.target.value,
          });
        }}
      />
      <LoginPasswordInput
        size="md"
        value={formValues.password}
        onChange={(e) => {
          setFormValues({
            ...formValues,
            password: e.target.value,
          });
        }}
      />
      <Button
        className="mt-6 w-full font-bold text-white bg-redVerminton"
        color="default"
        endContent={
          <span className="text-white">
            <RigthArrowIcon />
          </span>
        }
        isLoading={loading}
        type="submit"
      >
        Iniciar sesión
      </Button>
      {errorMessages && (
        <span className="text-redVerminton text-base font-semibold">
          *{errorMessages}
        </span>
      )}
    </form>
  );
}
