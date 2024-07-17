"use client";

import { Button } from "@nextui-org/button";

import TransaccionModal from "../molecules/TransaccionModal";

import { EditItemIcon } from "./Icons";

import { EDITAR_TRANSACCION } from "@/graphql/transacciones/transacciones.mutation";
import { Tipo } from "@/hooks/useHandleCategoria";

interface Transaccion {
  id: number;
  valor: number;
  descripcion: string;
  tipo: Tipo;
  fecha: string;
  cuentaId: number;
  categoriaId: number;
}

interface Props {
  transaccion: Transaccion;
  onSuccessfulMutation?: () => void;
}

export default function BotonEditarTransaccion({
  transaccion,
  onSuccessfulMutation,
}: Props) {
  return (
    <TransaccionModal
      botonConfirmacion="Guardar"
      gqlMutation={EDITAR_TRANSACCION}
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
      tituloModal="Editar Transacción"
      transaccion={transaccion}
      onSuccessfulMutation={onSuccessfulMutation}
    />
  );
}
