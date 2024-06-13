"use client";

import { Button } from "@nextui-org/button";

import CategoriaModal from "../molecules/CategoriaModal";
import { CategoriaItemProps } from "../molecules/CategoriaItem";

import { EditItemIcon } from "./Icons";

import { EDITAR_CATEGORIA } from "@/graphql/categorias/categorias.mutation";

export default function BotonEditarCategoria({
  ...categoria
}: CategoriaItemProps) {
  return (
    <CategoriaModal
      botonConfirmacion="Guardar cambios"
      categoria={categoria}
      gqlMutation={EDITAR_CATEGORIA}
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
      tituloModal="Editar Categoría"
    />
  );
}
