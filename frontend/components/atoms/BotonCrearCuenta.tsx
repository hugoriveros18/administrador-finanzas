"use client";

import { Button } from "@nextui-org/button";

import CuentaModal from "../molecules/CuentaModal";

import { CREAR_CUENTA } from "@/graphql/cuentas/cuentas.mutation";

interface Props {
  onSuccessfulMutation?: () => void;
}

export default function BotonCrearCuenta({ onSuccessfulMutation }: Props) {
  return (
    <CuentaModal
      botonConfirmacion="Crear"
      gqlMutation={CREAR_CUENTA}
      modalTrigger={(onOpen) => (
        <Button
          className="font-bold bg-black"
          color="primary"
          radius="none"
          onPress={onOpen}
        >
          Crear Cuenta
        </Button>
      )}
      tituloModal="Crear Cuenta"
      onSuccessfulMutation={onSuccessfulMutation}
    />
  );
}
