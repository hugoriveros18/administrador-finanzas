"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { TrashItemIcon } from "../atoms/Icons";

import { CategoriaItemProps } from "./CategoriaItem";

import useEliminarRegistro from "@/hooks/useEliminarRegistro";
import { ELIMINAR_CATEGORIA } from "@/graphql/categorias/categorias.mutation";

export default function EliminarCategoriaModal({
  id,
  nombre,
  tipo,
}: CategoriaItemProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    eliminar: eliminarCategoria,
    errorMessage,
    handleErrorMessage,
  } = useEliminarRegistro({
    id,
    gqlMutation: ELIMINAR_CATEGORIA,
    pathToValidate: "/categorias",
  });

  return (
    <>
      <Button
        isIconOnly
        className="bg-transparent text-red-500 min-w-[auto] min-h-[auto] w-[auto] h-[auto]"
        radius="none"
        onPress={onOpen}
      >
        <TrashItemIcon />
      </Button>
      <Modal
        classNames={{
          base: "bg-white",
          header: "text-black",
        }}
        isOpen={isOpen}
        placement="center"
        size="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <h4 className="text-black">
                  ¿Estás seguro que deseas eliminar la categoría{" "}
                  <span className="font-semibold">{nombre}</span> de tipo{" "}
                  <span className="font-semibold capitalize">{tipo}</span>?
                </h4>
                {errorMessage && (
                  <p className="text-redVerminton font-semibold mt-1">
                    *{errorMessage}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  onPress={() => {
                    onClose();
                    handleErrorMessage("");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    const result = await eliminarCategoria();

                    if (result) {
                      onClose();
                    }
                  }}
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
