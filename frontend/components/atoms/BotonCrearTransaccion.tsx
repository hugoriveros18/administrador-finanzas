"use client";

import { Button } from "@nextui-org/button";

import TransaccionModal from "../molecules/TransaccionModal";

import { CREAR_TRANSACCION } from "@/graphql/transacciones/transacciones.mutation";

interface Props {
  onSuccessfulMutation?: () => void;
}

export default function BotonCrearTransaccion({ onSuccessfulMutation }: Props) {
  return (
    <TransaccionModal
      botonConfirmacion="Crear"
      gqlMutation={CREAR_TRANSACCION}
      modalTrigger={(onOpen) => (
        <Button
          className="font-bold bg-black"
          color="primary"
          radius="none"
          onPress={onOpen}
        >
          Crear Transacción
        </Button>
      )}
      tituloModal="Crear Transacción"
      onSuccessfulMutation={onSuccessfulMutation}
    />
  );
}
