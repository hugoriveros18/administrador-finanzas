"use client";

import { Button } from "@nextui-org/button";

import CategoriaModal from "../molecules/CategoriaModal";

import { CREAR_CATEGORIA } from "@/graphql/categorias/categorias.mutation";

export default function BotonCrearCategoria() {
  return (
    <CategoriaModal
      botonConfirmacion="Crear"
      gqlMutation={CREAR_CATEGORIA}
      modalTrigger={(onOpen) => (
        <Button
          className="font-bold bg-black"
          color="primary"
          radius="none"
          onPress={onOpen}
        >
          Crear Categoría
        </Button>
      )}
      tituloModal="Crear Categoría"
    />
  );
}
