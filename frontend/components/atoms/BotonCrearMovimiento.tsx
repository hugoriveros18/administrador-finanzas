"use client";

import { Button } from "@nextui-org/button";

import MovimientoModal from "../molecules/MovimientoModal";

import { CREAR_MOVIMIENTO } from "@/graphql/movimientos/movimientos.mutation";

interface Props {
  onSuccessfulMutation?: () => void;
}

export default function BotonCrearMovimiento({ onSuccessfulMutation }: Props) {
  return (
    <MovimientoModal
      botonConfirmacion="Crear"
      gqlMutation={CREAR_MOVIMIENTO}
      modalTrigger={(onOpen) => (
        <Button
          className="font-bold bg-black"
          color="primary"
          radius="none"
          onPress={onOpen}
        >
          Crear Movimiento
        </Button>
      )}
      tituloModal="Crear Movimiento"
      onSuccessfulMutation={onSuccessfulMutation}
    />
  );
}
