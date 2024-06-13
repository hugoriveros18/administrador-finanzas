"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

import { revalidatePathData } from "../actions";

import PasswordInput from "@/components/atoms/SignupPasswordInput";
import { CREAR_USUARIO } from "@/graphql/usuario/usuario.mutation";

interface FormValue {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  terminos: boolean;
}

const INITIAL_FORM_VALUES: FormValue = {
  nombre: "",
  apellidos: "",
  email: "",
  password: "",
  terminos: false,
};

export default function SingupForm() {
  const [crearUsuario] = useMutation(CREAR_USUARIO);
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValue>(INITIAL_FORM_VALUES);
  const [checkboxError, setCheckboxError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValues.terminos) {
      setCheckboxError(true);

      return;
    }
    setLoading(true);
    try {
      await crearUsuario({
        variables: formValues,
      });
      await revalidatePathData({ path: "/" });
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      setTimeout(() => {
        setErrorMessage(
          error.graphQLErrors?.[0]?.message || "Error al crear usuario",
        );
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 w-full mt-8"
      onSubmit={handleFormSubmit}
    >
      <div className="w-full flex gap-4">
        <Input
          isRequired
          classNames={{
            input: "group-data-[has-value=true]:text-black",
            inputWrapper:
              "bg-trasparent hover:bg-trasparent border-[#3f3f46] border-[0.5px] text-black data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            label: "group-data-[filled-within=true]:text-black",
          }}
          color="default"
          label="Nombre"
          labelPlacement="inside"
          size="sm"
          type="text"
          value={formValues.nombre}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              nombre: e.target.value,
            });
          }}
        />
        <Input
          isRequired
          classNames={{
            input: "group-data-[has-value=true]:text-black",
            inputWrapper:
              "bg-trasparent hover:bg-trasparent border-[#3f3f46] border-[0.5px] text-black data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            label: "group-data-[filled-within=true]:text-black",
          }}
          color="default"
          label="Apellidos"
          labelPlacement="inside"
          size="sm"
          type="text"
          value={formValues.apellidos}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              apellidos: e.target.value,
            });
          }}
        />
      </div>
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
        labelPlacement="inside"
        size="sm"
        type="email"
        value={formValues.email}
        onChange={(e) => {
          setFormValues({
            ...formValues,
            email: e.target.value,
          });
        }}
      />
      <PasswordInput
        value={formValues.password}
        onChange={(e) => {
          setFormValues({
            ...formValues,
            password: e.target.value,
          });
        }}
      />
      <div className="w-full flex flex-col">
        <Checkbox
          disableAnimation
          isRequired
          className="text-black"
          classNames={{
            label: "text-black",
            wrapper:
              "group-data-[hover=true]:before:bg-redVerminton group-data-[selected=true]:after:bg-redVerminton",
          }}
          isSelected={formValues.terminos}
          onValueChange={() => {
            setFormValues({
              ...formValues,
              terminos: !formValues.terminos,
            });
            if (checkboxError) setCheckboxError(false);
          }}
        >
          Acepto terminos y condiciones
        </Checkbox>
        {checkboxError && (
          <span className="text-[#f31260] text-xs p-1">
            Debes aceptar los términos y condiciones
          </span>
        )}
      </div>
      <Button
        className="mt-6 w-full font-bold bg-redVerminton"
        color="default"
        isLoading={loading}
        radius="none"
        type="submit"
      >
        Registrarse
      </Button>
      {errorMessage && (
        <span className="text-redVerminton text-base font-semibold">
          *{errorMessage}
        </span>
      )}
    </form>
  );
}
