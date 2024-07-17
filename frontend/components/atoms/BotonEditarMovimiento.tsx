"use client";

import { Button } from "@nextui-org/button";

import MovimientoModal from "../molecules/MovimientoModal";

import { EditItemIcon } from "./Icons";

import { EDITAR_MOVIMIENTO } from "@/graphql/movimientos/movimientos.mutation";

interface Movimiento {
  id: number;
  cuentaOrigen: number;
  cuentaDestino: number;
  valor: number;
  descripcion: string;
  fecha: string;
}

interface Props {
  movimiento: Movimiento;
  onSuccessfulMutation?: () => void;
}

export default function BotonEditarMovimiento({
  movimiento,
  onSuccessfulMutation,
}: Props) {
  return (
    <MovimientoModal
      botonConfirmacion="Guardar"
      gqlMutation={EDITAR_MOVIMIENTO}
      modalTrigger={(onOpen) => (
        <Button
          isIconOnly
          className="bg-transparent text-blueCharcoal min-w-[auto] min-h-[auto] w-[auto] h-[auto]"
          radius="none"
          onPress={onOpen}
        >
          <EditItemIcon />
        </Button>
      )}
      movimiento={movimiento}
      tituloModal="Editar Movimiento"
      onSuccessfulMutation={onSuccessfulMutation}
    />
  );
}
