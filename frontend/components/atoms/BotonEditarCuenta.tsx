"use client";

import { Button } from "@nextui-org/button";

import CuentaModal from "../molecules/CuentaModal";
import { CuentaItemProps } from "../molecules/CuentaItem";

import { EditItemIcon } from "./Icons";

import { EDITAR_CUENTA } from "@/graphql/cuentas/cuentas.mutation";

export default function BotonEditarCuenta({ ...cuenta }: CuentaItemProps) {
  return (
    <CuentaModal
      botonConfirmacion="Guardar cambios"
      cuenta={cuenta}
      gqlMutation={EDITAR_CUENTA}
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
      tituloModal="Editar Cuenta"
    />
  );
}
